using System.ComponentModel.DataAnnotations;

namespace Karima.Api.Models;

public class MediaFile
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(500)]
    public string FileName { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(1000)]
    public string FilePath { get; set; } = string.Empty;
    
    [MaxLength(100)]
    public string? MimeType { get; set; }
    
    public long FileSizeBytes { get; set; }
    
    [MaxLength(200)]
    public string? AltText { get; set; }
    
    [MaxLength(500)]
    public string? Description { get; set; }
    
    [MaxLength(100)]
    public string? Category { get; set; } // Ex: "services", "hero", "gallery"
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public int CreatedByUserId { get; set; }
    public User? CreatedByUser { get; set; }
}
