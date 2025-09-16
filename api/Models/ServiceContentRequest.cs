using System.ComponentModel.DataAnnotations;

namespace Karima.Api.Models;

public class ServiceContentRequest
{
    [Required]
    [MaxLength(100)]
    public string Key { get; set; } = string.Empty;
    
    [Required]
    public string Content { get; set; } = string.Empty;
    
    [MaxLength(500)]
    public string? Description { get; set; }
}

public class ServiceContentUpdateRequest
{
    [Required]
    public string Content { get; set; } = string.Empty;
    
    [MaxLength(500)]
    public string? Description { get; set; }
}
