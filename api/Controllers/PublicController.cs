using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Karima.Api.Data;

namespace Karima.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PublicController : ControllerBase
{
    private readonly AppDbContext _context;

    public PublicController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("service-content")]
    public async Task<ActionResult<Dictionary<string, string>>> GetServiceContent()
    {
        var contents = await _context.ServiceContents
            .ToDictionaryAsync(sc => sc.Key, sc => sc.Content);

        return contents;
    }

    [HttpGet("media")]
    public async Task<ActionResult<IEnumerable<object>>> GetMediaFiles([FromQuery] string? category = null)
    {
        var query = _context.MediaFiles.AsQueryable();

        if (!string.IsNullOrEmpty(category))
        {
            query = query.Where(mf => mf.Category == category);
        }

        var mediaFiles = await query
            .OrderByDescending(mf => mf.CreatedAt)
            .Select(mf => new
            {
                mf.Id,
                mf.FileName,
                mf.FilePath,
                mf.AltText,
                mf.Description,
                mf.Category,
                mf.CreatedAt
            })
            .ToListAsync();

        return mediaFiles;
    }
}
