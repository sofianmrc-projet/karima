using Microsoft.AspNetCore.Mvc;
using Karima.Api.Data;
using Karima.Api.Models;

namespace Karima.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<ContactController> _logger;

    public ContactController(AppDbContext context, ILogger<ContactController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult<ContactRequest>> SubmitContact(ContactRequest contactRequest)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        contactRequest.CreatedAt = DateTime.UtcNow;
        _context.ContactRequests.Add(contactRequest);
        await _context.SaveChangesAsync();

        // Log pour simulation d'envoi d'email
        _logger.LogInformation("Nouvelle demande de contact reçue: {Name} ({Email}) - {Message}", 
            contactRequest.Name, contactRequest.Email, contactRequest.Message);

        return Ok(new { message = "Votre message a été envoyé avec succès !" });
    }
}
