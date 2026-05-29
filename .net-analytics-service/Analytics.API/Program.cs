using Analytics.Application.Interfaces;
using Analytics.Infrastructure.Persistence;
using Analytics.Infrastructure.Repositories;
using Analytics.Infrastructure.Messaging;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

var jwtSecret = builder.Configuration["JWT_SECRET"]
    ?? throw new Exception("JWT_SECRET is missing");

var redisHost = builder.Configuration["REDIS_HOST"]
    ?? throw new Exception("Redis:Host is missing");

var key = Encoding.UTF8.GetBytes(jwtSecret);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AnalyticsDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Postgres"))
);

builder.Services.AddScoped<IAnalyticsRepository, AnalyticsRepository>();
builder.Services.AddHostedService<KafkaConsumerService>();

// Redis DI (NO FALLBACK, STRICT CONFIG)
builder.Services.AddSingleton<IConnectionMultiplexer>(_ =>
{
    return ConnectionMultiplexer.Connect(redisHost);
});

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero,
            ValidAlgorithms = new[] { SecurityAlgorithms.HmacSha512 }
        };

        options.Events = new JwtBearerEvents
        {
            OnTokenValidated = async context =>
            {
                var redis = context.HttpContext.RequestServices
                    .GetRequiredService<IConnectionMultiplexer>()
                    .GetDatabase();

                var authHeader = context.HttpContext.Request.Headers["Authorization"].ToString();

                var token = authHeader.StartsWith("Bearer ")
                    ? authHeader.Substring(7)
                    : null;

                if (token == null)
                {
                    context.Fail("Missing token");
                    return;
                }

                var exists = await redis.KeyExistsAsync($"blacklist:{token}");

                if (exists)
                {
                    context.Fail("Token is blacklisted");
                }
            }
        };
    });

builder.Services.AddAuthorization();

builder.Services.Configure<HostOptions>(options =>
{
    options.BackgroundServiceExceptionBehavior =
        BackgroundServiceExceptionBehavior.Ignore;
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Auto migration
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AnalyticsDbContext>();

    db.Database.Migrate();
    Console.WriteLine("Database migrated successfully.");
}

app.Run();