using Analytics.Application.Interfaces;
using Analytics.Domain.Entities;
using Analytics.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Analytics.Infrastructure.Repositories;

public class AnalyticsRepository : IAnalyticsRepository
{
    private readonly AnalyticsDbContext _context;

    public AnalyticsRepository(AnalyticsDbContext context)
    {
        _context = context;
    }

    public async Task IncrementCreatedTaskAsync(DateTime date)
    {
        var metric = await _context.DailyTaskMetrics
            .FirstOrDefaultAsync(x => x.Date.Date == date.Date);

        if (metric == null)
        {
            metric = new DailyTaskMetric
            {
                Id = Guid.NewGuid(),
                Date = date.Date,
                CreatedTasks = 1
            };

            _context.DailyTaskMetrics.Add(metric);
        }
        else
        {
            metric.CreatedTasks++;
        }

        await _context.SaveChangesAsync();
    }

    public async Task<int> GetCreatedTasksAsync(DateTime date)
    {
        var metric = await _context.DailyTaskMetrics
            .FirstOrDefaultAsync(x => x.Date.Date == date.Date);

        return metric?.CreatedTasks ?? 0;
    }
}