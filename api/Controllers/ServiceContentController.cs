using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Karima.Api.Data;
using Karima.Api.Models;
using System.Security.Claims;

namespace Karima.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class ServiceContentController : ControllerBase
{
    private readonly AppDbContext _context;

    public ServiceContentController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ServiceContent>>> GetServiceContents()
    {
        return await _context.ServiceContents
            .OrderBy(sc => sc.Key)
            .ToListAsync();
    }

    [HttpGet("{key}")]
    public async Task<ActionResult<ServiceContent>> GetServiceContent(string key)
    {
        var content = await _context.ServiceContents
            .FirstOrDefaultAsync(sc => sc.Key == key);

        if (content == null)
        {
            return NotFound();
        }

        return content;
    }

    [HttpPost]
    public async Task<ActionResult<ServiceContent>> CreateServiceContent([FromBody] ServiceContentRequest request)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var existingContent = await _context.ServiceContents
            .FirstOrDefaultAsync(sc => sc.Key == request.Key);

        if (existingContent != null)
        {
            return Conflict(new { message = "Une entrée avec cette clé existe déjà" });
        }

        var content = new ServiceContent
        {
            Key = request.Key,
            Content = request.Content,
            Description = request.Description,
            UpdatedByUserId = userId
        };

        _context.ServiceContents.Add(content);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetServiceContent), new { key = content.Key }, content);
    }

    [HttpPut("{key}")]
    public async Task<IActionResult> UpdateServiceContent(string key, [FromBody] ServiceContentUpdateRequest request)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var content = await _context.ServiceContents
            .FirstOrDefaultAsync(sc => sc.Key == key);

        if (content == null)
        {
            return NotFound();
        }

        content.Content = request.Content;
        content.Description = request.Description;
        content.UpdatedByUserId = userId;
        content.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{key}")]
    public async Task<IActionResult> DeleteServiceContent(string key)
    {
        var content = await _context.ServiceContents
            .FirstOrDefaultAsync(sc => sc.Key == key);

        if (content == null)
        {
            return NotFound();
        }

        _context.ServiceContents.Remove(content);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private int? GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return int.TryParse(userIdClaim, out int userId) ? userId : null;
    }
}
