using Confluent.Kafka;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Analytics.Application.Interfaces;

namespace Analytics.Infrastructure.Messaging;

public class KafkaConsumerService : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public KafkaConsumerService(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var config = new ConsumerConfig
        {
            BootstrapServers = "kafka:9092",
            GroupId = "analytics-group",
            AutoOffsetReset = AutoOffsetReset.Earliest,

            SocketTimeoutMs = 10000,
            SessionTimeoutMs = 6000,
            ReconnectBackoffMs = 1000,
            ReconnectBackoffMaxMs = 10000
        };

        using var consumer = new ConsumerBuilder<Ignore, string>(config)
            .Build();

        consumer.Subscribe("task.created");

        while (!stoppingToken.IsCancellationRequested)
        {
            var result = consumer.Consume(stoppingToken);

            using var scope = _scopeFactory.CreateScope();

            var repository = scope.ServiceProvider
                .GetRequiredService<IAnalyticsRepository>();

            await repository.IncrementCreatedTaskAsync(DateTime.UtcNow);
        }
    }
}