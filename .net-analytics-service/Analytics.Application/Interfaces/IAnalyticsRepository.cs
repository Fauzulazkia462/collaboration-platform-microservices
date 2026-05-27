namespace Analytics.Application.Interfaces;

public interface IAnalyticsRepository
{
    Task IncrementCreatedTaskAsync(DateTime date);

    Task<int> GetCreatedTasksAsync(DateTime date);
}