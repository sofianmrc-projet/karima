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
    public DbSet<User> Users { get; set; }
    public DbSet<ServiceContent> ServiceContents { get; set; }
    public DbSet<MediaFile> MediaFiles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Todo
        modelBuilder.Entity<Todo>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.CreatedAt)
                  .HasDefaultValueSql("GETUTCDATE()")   // SQL Server ; pour SQLite: CURRENT_TIMESTAMP
                  .ValueGeneratedOnAdd();
        });

        // ContactRequest
        modelBuilder.Entity<ContactRequest>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Message).IsRequired().HasMaxLength(1000);
            entity.Property(e => e.CreatedAt)
                  .HasDefaultValueSql("GETUTCDATE()")
                  .ValueGeneratedOnAdd();
        });

        // User
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(200);
            entity.Property(e => e.PasswordHash).IsRequired().HasMaxLength(200);
            entity.Property(e => e.FirstName).IsRequired().HasMaxLength(100);
            entity.Property(e => e.LastName).IsRequired().HasMaxLength(100);
            entity.Property(e => e.CreatedAt)
                  .HasDefaultValueSql("GETUTCDATE()")
                  .ValueGeneratedOnAdd();
            entity.HasIndex(e => e.Email).IsUnique();
        });

        // ServiceContent
        modelBuilder.Entity<ServiceContent>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Key).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Content).IsRequired();
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.CreatedAt)
                  .HasDefaultValueSql("GETUTCDATE()")
                  .ValueGeneratedOnAdd();
            entity.Property(e => e.UpdatedAt)
                  .HasDefaultValueSql("GETUTCDATE()")
                  .ValueGeneratedOnAddOrUpdate();
            entity.HasIndex(e => e.Key).IsUnique();
            
            entity.HasOne(e => e.UpdatedByUser)
                  .WithMany()
                  .HasForeignKey(e => e.UpdatedByUserId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // MediaFile
        modelBuilder.Entity<MediaFile>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FileName).IsRequired().HasMaxLength(500);
            entity.Property(e => e.FilePath).IsRequired().HasMaxLength(1000);
            entity.Property(e => e.MimeType).HasMaxLength(100);
            entity.Property(e => e.AltText).HasMaxLength(200);
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Category).HasMaxLength(100);
            entity.Property(e => e.CreatedAt)
                  .HasDefaultValueSql("GETUTCDATE()")
                  .ValueGeneratedOnAdd();
            
            entity.HasOne(e => e.CreatedByUser)
                  .WithMany()
                  .HasForeignKey(e => e.CreatedByUserId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        // Données de démonstration : valeurs 100% statiques (pas de DateTime.Now/UtcNow)
        var seedDate = new DateTime(2025, 9, 11, 0, 0, 0, DateTimeKind.Utc);

        modelBuilder.Entity<Todo>().HasData(
            new Todo { Id = 1, Title = "Créer la maquette du site Karima", Done = true, CreatedAt = seedDate },
            new Todo { Id = 2, Title = "Développer l'API backend", Done = true, CreatedAt = seedDate },
            new Todo { Id = 3, Title = "Implémenter le frontend React", Done = false, CreatedAt = seedDate },
            new Todo { Id = 4, Title = "Configurer la base de données", Done = false, CreatedAt = seedDate }
        );

        // Utilisateur admin par défaut (mot de passe: admin123)
        // Hash fixe pour "admin123" - généré une seule fois
        modelBuilder.Entity<User>().HasData(
            new User 
            { 
                Id = 1, 
                Email = "admin@karima.com", 
                PasswordHash = "$2a$11$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
                FirstName = "Admin",
                LastName = "Karima",
                IsAdmin = true,
                CreatedAt = seedDate
            }
        );

        // Contenu par défaut pour les services
        modelBuilder.Entity<ServiceContent>().HasData(
            new ServiceContent { Id = 1, Key = "hero_title", Content = "Nos Services", Description = "Titre principal de la section hero", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 2, Key = "hero_description", Content = "Des solutions complètes et personnalisées pour répondre à tous vos besoins professionnels et vous accompagner vers l'excellence.", Description = "Description de la section hero", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 3, Key = "services_section_title", Content = "Nos domaines d'expertise", Description = "Titre de la section des services", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 4, Key = "services_section_description", Content = "Chaque service est conçu pour vous apporter une valeur ajoutée réelle et mesurable dans votre domaine d'activité.", Description = "Description de la section des services", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 5, Key = "process_section_title", Content = "Notre méthode de travail", Description = "Titre de la section processus", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 6, Key = "process_section_description", Content = "Une approche structurée et éprouvée pour garantir le succès de vos projets.", Description = "Description de la section processus", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 7, Key = "cta_title", Content = "Prêt à transformer votre organisation ?", Description = "Titre de la section CTA", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 8, Key = "cta_description", Content = "Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir comment nos services peuvent vous aider à atteindre vos objectifs.", Description = "Description de la section CTA", CreatedAt = seedDate, UpdatedAt = seedDate }
        );
    }

}
