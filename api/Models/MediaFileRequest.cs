using System.ComponentModel.DataAnnotations;

namespace Karima.Api.Models;

public class MediaFileRequest
{
    [MaxLength(200)]
    public string? AltText { get; set; }
    
    [MaxLength(500)]
    public string? Description { get; set; }
    
    [MaxLength(100)]
    public string? Category { get; set; }
}

public class MediaFileUpdateRequest
{
    [MaxLength(200)]
    public string? AltText { get; set; }
    
    [MaxLength(500)]
    public string? Description { get; set; }
    
    [MaxLength(100)]
    public string? Category { get; set; }
}
