using System.ComponentModel.DataAnnotations;

namespace Karima.Api.Models;

public class Section
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string Key { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;
    
    public string Content { get; set; } = string.Empty;
    
    [MaxLength(500)]
    public string? Description { get; set; }
    
    [MaxLength(200)]
    public string? ImageUrl { get; set; }
    
    [MaxLength(200)]
    public string? AltText { get; set; }
    
    [MaxLength(100)]
    public string? Category { get; set; }
    
    public int SortOrder { get; set; } = 0;
    
    public bool IsActive { get; set; } = true;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    public int? UpdatedByUserId { get; set; }
    public User? UpdatedByUser { get; set; }
}

public class SectionRequest
{
    [Required]
    [MaxLength(100)]
    public string Key { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;
    
    public string Content { get; set; } = string.Empty;
    
    [MaxLength(500)]
    public string? Description { get; set; }
    
    [MaxLength(200)]
    public string? ImageUrl { get; set; }
    
    [MaxLength(200)]
    public string? AltText { get; set; }
    
    [MaxLength(100)]
    public string? Category { get; set; }
    
    public int SortOrder { get; set; } = 0;
    
    public bool IsActive { get; set; } = true;
}
