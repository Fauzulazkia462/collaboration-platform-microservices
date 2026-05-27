using Analytics.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Analytics.API.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/analytics")]
public class AnalyticsController : ControllerBase
{
    private readonly IAnalyticsRepository _repository;

    public AnalyticsController(IAnalyticsRepository repository)
    {
        _repository = repository;
    }

    [HttpGet("tasks/created/today")]
    public async Task<IActionResult> GetTasksCreatedToday()
    {
        var count = await _repository
            .GetCreatedTasksAsync(DateTime.UtcNow);

        return Ok(new
        {
            createdTasks = count
        });
    }
}