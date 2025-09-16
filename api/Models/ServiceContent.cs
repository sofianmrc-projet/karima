using System.ComponentModel.DataAnnotations;

namespace Karima.Api.Models;

public class ServiceContent
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string Key { get; set; } = string.Empty; // Ex: "hero_title", "hero_description", "service_1_title", etc.
    
    [Required]
    public string Content { get; set; } = string.Empty;
    
    [MaxLength(500)]
    public string? Description { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    public int? UpdatedByUserId { get; set; }
    public User? UpdatedByUser { get; set; }
}
