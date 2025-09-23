using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Karima.Api.Data;
using Karima.Api.Models;
using System.Security.Claims;

namespace Karima.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SectionsController : ControllerBase
{
    private readonly AppDbContext _context;

    public SectionsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/sections (public - pour affichage du site)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Section>>> GetSections()
    {
        return await _context.Sections
            .Where(s => s.IsActive)
            .OrderBy(s => s.Category)
            .ThenBy(s => s.SortOrder)
            .ToListAsync();
    }

    // GET: api/sections/by-category/{category}
    [HttpGet("by-category/{category}")]
    public async Task<ActionResult<IEnumerable<Section>>> GetSectionsByCategory(string category)
    {
        return await _context.Sections
            .Where(s => s.IsActive && s.Category == category)
            .OrderBy(s => s.SortOrder)
            .ToListAsync();
    }

    // GET: api/sections/{key}
    [HttpGet("{key}")]
    public async Task<ActionResult<Section>> GetSection(string key)
    {
        var section = await _context.Sections
            .FirstOrDefaultAsync(s => s.Key == key && s.IsActive);

        if (section == null)
        {
            return NotFound();
        }

        return section;
    }

    // GET: api/sections/admin (admin only - pour le tableau de bord)
    [HttpGet("admin")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<Section>>> GetSectionsForAdmin()
    {
        return await _context.Sections
            .OrderBy(s => s.Category)
            .ThenBy(s => s.SortOrder)
            .ToListAsync();
    }

    // GET: api/sections/admin/{id}
    [HttpGet("admin/{id}")]
    [Authorize]
    public async Task<ActionResult<Section>> GetSectionForAdmin(int id)
    {
        var section = await _context.Sections.FindAsync(id);

        if (section == null)
        {
            return NotFound();
        }

        return section;
    }

    // POST: api/sections/admin
    [HttpPost("admin")]
    [Authorize]
    public async Task<ActionResult<Section>> CreateSection(SectionRequest request)
    {
        var userId = GetCurrentUserId();
        
        var section = new Section
        {
            Key = request.Key,
            Title = request.Title,
            Content = request.Content,
            Description = request.Description,
            ImageUrl = request.ImageUrl,
            AltText = request.AltText,
            Category = request.Category,
            SortOrder = request.SortOrder,
            IsActive = request.IsActive,
            UpdatedByUserId = userId
        };

        _context.Sections.Add(section);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSectionForAdmin), new { id = section.Id }, section);
    }

    // PUT: api/sections/admin/{id}
    [HttpPut("admin/{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateSection(int id, SectionRequest request)
    {
        var section = await _context.Sections.FindAsync(id);
        if (section == null)
        {
            return NotFound();
        }

        var userId = GetCurrentUserId();

        section.Key = request.Key;
        section.Title = request.Title;
        section.Content = request.Content;
        section.Description = request.Description;
        section.ImageUrl = request.ImageUrl;
        section.AltText = request.AltText;
        section.Category = request.Category;
        section.SortOrder = request.SortOrder;
        section.IsActive = request.IsActive;
        section.UpdatedAt = DateTime.UtcNow;
        section.UpdatedByUserId = userId;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!SectionExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    // DELETE: api/sections/admin/{id}
    [HttpDelete("admin/{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteSection(int id)
    {
        var section = await _context.Sections.FindAsync(id);
        if (section == null)
        {
            return NotFound();
        }

        _context.Sections.Remove(section);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool SectionExists(int id)
    {
        return _context.Sections.Any(e => e.Id == id);
    }

    private int? GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return int.TryParse(userIdClaim, out int userId) ? userId : null;
    }
}
