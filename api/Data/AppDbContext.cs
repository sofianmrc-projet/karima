using Microsoft.EntityFrameworkCore;
using Karima.Api.Models;

namespace Karima.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Todo> Todos { get; set; }
    public DbSet<ContactRequest> ContactRequests { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuration des entités
        modelBuilder.Entity<Todo>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
        });

        modelBuilder.Entity<ContactRequest>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Message).IsRequired().HasMaxLength(1000);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
        });

        // Données de démonstration
        modelBuilder.Entity<Todo>().HasData(
            new Todo { Id = 1, Title = "Créer la maquette du site Karima", Done = true },
            new Todo { Id = 2, Title = "Développer l'API backend", Done = true },
            new Todo { Id = 3, Title = "Implémenter le frontend React", Done = false },
            new Todo { Id = 4, Title = "Configurer la base de données", Done = false }
        );
    }
}
