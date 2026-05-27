using Microsoft.EntityFrameworkCore;
using Analytics.Domain.Entities;

namespace Analytics.Infrastructure.Persistence;

public class AnalyticsDbContext : DbContext
{
    public AnalyticsDbContext(DbContextOptions<AnalyticsDbContext> options)
        : base(options)
    {
    }

    public DbSet<DailyTaskMetric> DailyTaskMetrics
        => Set<DailyTaskMetric>();
}