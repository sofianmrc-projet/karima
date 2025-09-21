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

        // Contenu par défaut pour tout le site
        modelBuilder.Entity<ServiceContent>().HasData(
            // PAGE D'ACCUEIL
            new ServiceContent { Id = 1, Key = "home_hero_title", Content = "Bienvenue chez Karima", Description = "Titre principal de la page d'accueil", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 2, Key = "home_hero_subtitle", Content = "Votre partenaire de confiance", Description = "Sous-titre de la page d'accueil", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 3, Key = "home_hero_description", Content = "Des solutions innovantes pour votre entreprise", Description = "Description principale de la page d'accueil", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 4, Key = "home_hero_cta_text", Content = "Découvrir nos services", Description = "Texte du bouton CTA de la page d'accueil", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 5, Key = "home_about_title", Content = "À propos de nous", Description = "Titre de la section à propos sur l'accueil", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 6, Key = "home_about_description", Content = "Une entreprise dédiée à votre succès", Description = "Description de la section à propos sur l'accueil", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 7, Key = "home_stat_1_number", Content = "100+", Description = "Première statistique - nombre", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 8, Key = "home_stat_1_label", Content = "Projets réalisés", Description = "Première statistique - label", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 9, Key = "home_stat_2_number", Content = "50+", Description = "Deuxième statistique - nombre", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 10, Key = "home_stat_2_label", Content = "Clients satisfaits", Description = "Deuxième statistique - label", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 11, Key = "home_stat_3_number", Content = "5+", Description = "Troisième statistique - nombre", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 12, Key = "home_stat_3_label", Content = "Années d'expérience", Description = "Troisième statistique - label", CreatedAt = seedDate, UpdatedAt = seedDate },

            // PAGE SERVICES
            new ServiceContent { Id = 13, Key = "services_hero_title", Content = "Nos Services", Description = "Titre principal de la page services", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 14, Key = "services_hero_description", Content = "Des solutions complètes et personnalisées pour répondre à tous vos besoins professionnels et vous accompagner vers l'excellence.", Description = "Description de la page services", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 15, Key = "services_section_title", Content = "Nos domaines d'expertise", Description = "Titre de la section des services", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 16, Key = "services_section_description", Content = "Chaque service est conçu pour vous apporter une valeur ajoutée réelle et mesurable dans votre domaine d'activité.", Description = "Description de la section des services", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 17, Key = "services_process_title", Content = "Notre méthode de travail", Description = "Titre de la section processus", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 18, Key = "services_process_description", Content = "Une approche structurée et éprouvée pour garantir le succès de vos projets.", Description = "Description de la section processus", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 19, Key = "services_cta_title", Content = "Prêt à transformer votre organisation ?", Description = "Titre de la section CTA", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 20, Key = "services_cta_description", Content = "Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir comment nos services peuvent vous aider à atteindre vos objectifs.", Description = "Description de la section CTA", CreatedAt = seedDate, UpdatedAt = seedDate },

            // PAGE À PROPOS
            new ServiceContent { Id = 21, Key = "about_hero_title", Content = "À propos de nous", Description = "Titre principal de la page à propos", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 22, Key = "about_hero_description", Content = "Découvrez notre histoire et notre mission", Description = "Description de la page à propos", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 23, Key = "about_company_title", Content = "Notre entreprise", Description = "Titre de la section entreprise", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 24, Key = "about_company_description", Content = "Une entreprise dédiée à l'excellence et à l'innovation", Description = "Description de la section entreprise", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 25, Key = "about_team_title", Content = "Notre équipe", Description = "Titre de la section équipe", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 26, Key = "about_team_description", Content = "Des professionnels passionnés et expérimentés", Description = "Description de la section équipe", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 27, Key = "about_values_title", Content = "Nos valeurs", Description = "Titre de la section valeurs", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 28, Key = "about_values_description", Content = "Des valeurs qui nous guident au quotidien", Description = "Description de la section valeurs", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 29, Key = "about_mission_title", Content = "Notre mission", Description = "Titre de la section mission", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 30, Key = "about_mission_description", Content = "Accompagner nos clients vers le succès", Description = "Description de la section mission", CreatedAt = seedDate, UpdatedAt = seedDate },

            // PAGE BLOG
            new ServiceContent { Id = 31, Key = "blog_hero_title", Content = "Notre Blog", Description = "Titre principal de la page blog", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 32, Key = "blog_hero_description", Content = "Découvrez nos articles et actualités", Description = "Description de la page blog", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 33, Key = "blog_section_title", Content = "Derniers articles", Description = "Titre de la section articles", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 34, Key = "blog_section_description", Content = "Restez informé de nos dernières actualités", Description = "Description de la section articles", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 35, Key = "blog_cta_title", Content = "Restez informé", Description = "Titre de la section CTA blog", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 36, Key = "blog_cta_description", Content = "Abonnez-vous à notre newsletter", Description = "Description de la section CTA blog", CreatedAt = seedDate, UpdatedAt = seedDate },

            // PAGE CONTACT
            new ServiceContent { Id = 37, Key = "contact_hero_title", Content = "Contactez-nous", Description = "Titre principal de la page contact", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 38, Key = "contact_hero_description", Content = "Nous sommes là pour vous accompagner", Description = "Description de la page contact", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 39, Key = "contact_info_title", Content = "Nos coordonnées", Description = "Titre de la section informations contact", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 40, Key = "contact_address", Content = "123 Rue de la Paix, 75001 Paris", Description = "Adresse de contact", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 41, Key = "contact_phone", Content = "+33 1 23 45 67 89", Description = "Téléphone de contact", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 42, Key = "contact_email", Content = "contact@karima.com", Description = "Email de contact", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 43, Key = "contact_hours", Content = "Lun-Ven: 9h-18h", Description = "Horaires de contact", CreatedAt = seedDate, UpdatedAt = seedDate },

            // FOOTER
            new ServiceContent { Id = 44, Key = "footer_company_name", Content = "Karima", Description = "Nom de l'entreprise dans le footer", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 45, Key = "footer_description", Content = "Votre partenaire de confiance pour tous vos projets", Description = "Description dans le footer", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 46, Key = "footer_copyright", Content = "© 2025 Karima. Tous droits réservés.", Description = "Copyright dans le footer", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 47, Key = "footer_links_title", Content = "Mentions légales | Politique de confidentialité", Description = "Liens dans le footer", CreatedAt = seedDate, UpdatedAt = seedDate }
        );
    }

}
