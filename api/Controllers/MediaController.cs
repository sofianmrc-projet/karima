using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Karima.Api.Data;
using Karima.Api.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Karima.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class MediaController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _environment;
    private readonly IConfiguration _configuration;

    public MediaController(AppDbContext context, IWebHostEnvironment environment, IConfiguration configuration)
    {
        _context = context;
        _environment = environment;
        _configuration = configuration;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MediaFile>>> GetMediaFiles([FromQuery] string? category = null)
    {
        var query = _context.MediaFiles.AsQueryable();

        if (!string.IsNullOrEmpty(category))
        {
            query = query.Where(mf => mf.Category == category);
        }

        return await query
            .OrderByDescending(mf => mf.CreatedAt)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<MediaFile>> GetMediaFile(int id)
    {
        var mediaFile = await _context.MediaFiles
            .FirstOrDefaultAsync(mf => mf.Id == id);

        if (mediaFile == null)
        {
            return NotFound();
        }

        return mediaFile;
    }

    [HttpPost("upload")]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult<MediaFile>> UploadMediaFile([FromForm] FileUploadDto dto)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        if (dto.File == null || dto.File.Length == 0)
        {
            return BadRequest(new { message = "Aucun fichier fourni" });
        }

        // Vérifier le type de fichier
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg" };
        var fileExtension = Path.GetExtension(dto.File.FileName).ToLowerInvariant();
        
        if (!allowedExtensions.Contains(fileExtension))
        {
            return BadRequest(new { message = "Type de fichier non autorisé. Extensions autorisées: " + string.Join(", ", allowedExtensions) });
        }

        // Vérifier la taille du fichier (max 10MB)
        if (dto.File.Length > 10 * 1024 * 1024)
        {
            return BadRequest(new { message = "Le fichier est trop volumineux. Taille maximale: 10MB" });
        }

        // Créer le dossier de destination s'il n'existe pas
        var uploadsPath = Path.Combine(_environment.WebRootPath, "uploads", "media");
        if (!Directory.Exists(uploadsPath))
        {
            Directory.CreateDirectory(uploadsPath);
        }

        // Générer un nom de fichier unique
        var fileName = $"{Guid.NewGuid()}{fileExtension}";
        var filePath = Path.Combine(uploadsPath, fileName);

        // Sauvegarder le fichier
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await dto.File.CopyToAsync(stream);
        }

        // Créer l'entrée en base de données
        var mediaFile = new MediaFile
        {
            FileName = dto.File.FileName,
            FilePath = $"/uploads/media/{fileName}",
            MimeType = dto.File.ContentType,
            FileSizeBytes = dto.File.Length,
            AltText = dto.AltText,
            Description = dto.Description,
            Category = dto.Category ?? "general",
            CreatedByUserId = userId.Value
        };

        _context.MediaFiles.Add(mediaFile);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMediaFile), new { id = mediaFile.Id }, mediaFile);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMediaFile(int id, [FromBody] MediaFileUpdateRequest request)
    {
        var mediaFile = await _context.MediaFiles
            .FirstOrDefaultAsync(mf => mf.Id == id);

        if (mediaFile == null)
        {
            return NotFound();
        }

        mediaFile.AltText = request.AltText;
        mediaFile.Description = request.Description;
        mediaFile.Category = request.Category;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMediaFile(int id)
    {
        var mediaFile = await _context.MediaFiles
            .FirstOrDefaultAsync(mf => mf.Id == id);

        if (mediaFile == null)
        {
            return NotFound();
        }

        // Supprimer le fichier physique
        var fullPath = Path.Combine(_environment.WebRootPath, mediaFile.FilePath.TrimStart('/'));
        if (System.IO.File.Exists(fullPath))
        {
            System.IO.File.Delete(fullPath);
        }

        // Supprimer l'entrée en base de données
        _context.MediaFiles.Remove(mediaFile);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpGet("categories")]
    public async Task<ActionResult<IEnumerable<string>>> GetCategories()
    {
        var categories = await _context.MediaFiles
            .Where(mf => !string.IsNullOrEmpty(mf.Category))
            .Select(mf => mf.Category!)
            .Distinct()
            .OrderBy(c => c)
            .ToListAsync();

        return categories;
    }

    private int? GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return int.TryParse(userIdClaim, out int userId) ? userId : null;
    }
}
