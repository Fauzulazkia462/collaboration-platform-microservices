namespace Analytics.Domain.Entities;

public class DailyTaskMetric
{
    public Guid Id { get; set; }

    public DateTime Date { get; set; }

    public int CreatedTasks { get; set; }
}