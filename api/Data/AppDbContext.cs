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

        // Utilisateur admin par défaut (mot de passe: admin)
        modelBuilder.Entity<User>().HasData(
            new User 
            { 
                Id = 1, 
                Email = "admin@karima.com", 
                PasswordHash = "admin", // Mot de passe simple pour les tests
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
            new ServiceContent { Id = 47, Key = "footer_links_title", Content = "Mentions légales | Politique de confidentialité", Description = "Liens dans le footer", CreatedAt = seedDate, UpdatedAt = seedDate },

            // SERVICES DÉTAILLÉS
            new ServiceContent { Id = 48, Key = "service_1_title", Content = "Consulting Stratégique", Description = "Titre du premier service", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 49, Key = "service_1_description", Content = "Accompagnement personnalisé pour optimiser vos processus et améliorer vos performances organisationnelles.", Description = "Description du premier service", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 50, Key = "service_1_features", Content = "Audit complet de vos processus actuels|Analyse des points d'amélioration|Recommandations personnalisées et détaillées|Plan d'action avec échéancier précis|Suivi et accompagnement dans la mise en œuvre|Formation des équipes aux nouvelles pratiques", Description = "Fonctionnalités du premier service", CreatedAt = seedDate, UpdatedAt = seedDate },
            
            new ServiceContent { Id = 51, Key = "service_2_title", Content = "Formation Professionnelle", Description = "Titre du deuxième service", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 52, Key = "service_2_description", Content = "Formations sur mesure pour développer les compétences de vos équipes et améliorer leur performance.", Description = "Description du deuxième service", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 53, Key = "service_2_features", Content = "Programmes adaptés à vos besoins spécifiques|Formateurs experts certifiés dans leur domaine|Méthodes pédagogiques innovantes et interactives|Certification professionnelle à la clé|Support post-formation et ressources en ligne|Évaluation continue des acquis", Description = "Fonctionnalités du deuxième service", CreatedAt = seedDate, UpdatedAt = seedDate },
            
            new ServiceContent { Id = 54, Key = "service_3_title", Content = "Accompagnement Continu", Description = "Titre du troisième service", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 55, Key = "service_3_description", Content = "Support permanent pour assurer la réussite de vos projets et transformations organisationnelles.", Description = "Description du troisième service", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 56, Key = "service_3_features", Content = "Suivi régulier et personnalisé des projets|Support technique et méthodologique permanent|Ajustements en temps réel selon les besoins|Rapports de progression détaillés|Intervention rapide en cas de difficultés|Optimisation continue des processus", Description = "Fonctionnalités du troisième service", CreatedAt = seedDate, UpdatedAt = seedDate },
            
            new ServiceContent { Id = 57, Key = "service_4_title", Content = "Audit et Diagnostic", Description = "Titre du quatrième service", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 58, Key = "service_4_description", Content = "Analyse approfondie de votre organisation pour identifier les opportunités d'amélioration.", Description = "Description du quatrième service", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 59, Key = "service_4_features", Content = "Audit complet de l'organisation|Diagnostic des forces et faiblesses|Benchmarking avec les meilleures pratiques|Recommandations prioritaires et chiffrées|Plan de transformation détaillé|Indicateurs de performance personnalisés", Description = "Fonctionnalités du quatrième service", CreatedAt = seedDate, UpdatedAt = seedDate },
            
            new ServiceContent { Id = 60, Key = "service_5_title", Content = "Optimisation des Processus", Description = "Titre du cinquième service", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 61, Key = "service_5_description", Content = "Amélioration continue de vos processus métier pour maximiser l'efficacité et la qualité.", Description = "Description du cinquième service", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 62, Key = "service_5_features", Content = "Cartographie des processus existants|Identification des goulots d'étranglement|Redesign des processus optimisés|Mise en place d'outils de mesure|Formation des équipes aux nouveaux processus|Suivi et amélioration continue", Description = "Fonctionnalités du cinquième service", CreatedAt = seedDate, UpdatedAt = seedDate },
            
            new ServiceContent { Id = 63, Key = "service_6_title", Content = "Conformité et Qualité", Description = "Titre du sixième service", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 64, Key = "service_6_description", Content = "Accompagnement pour la mise en conformité et l'amélioration de la qualité de vos services.", Description = "Description du sixième service", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 65, Key = "service_6_features", Content = "Audit de conformité réglementaire|Mise en place de systèmes qualité|Formation aux normes et standards|Préparation aux certifications|Suivi et maintenance de la conformité|Amélioration continue de la qualité", Description = "Fonctionnalités du sixième service", CreatedAt = seedDate, UpdatedAt = seedDate },

            // PROCESSUS DE TRAVAIL
            new ServiceContent { Id = 66, Key = "process_step_1_number", Content = "01", Description = "Numéro de la première étape", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 67, Key = "process_step_1_title", Content = "Analyse", Description = "Titre de la première étape", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 68, Key = "process_step_1_description", Content = "Nous analysons vos besoins et votre situation actuelle pour comprendre vos enjeux.", Description = "Description de la première étape", CreatedAt = seedDate, UpdatedAt = seedDate },
            
            new ServiceContent { Id = 69, Key = "process_step_2_number", Content = "02", Description = "Numéro de la deuxième étape", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 70, Key = "process_step_2_title", Content = "Proposition", Description = "Titre de la deuxième étape", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 71, Key = "process_step_2_description", Content = "Nous vous proposons une solution personnalisée adaptée à vos objectifs.", Description = "Description de la deuxième étape", CreatedAt = seedDate, UpdatedAt = seedDate },
            
            new ServiceContent { Id = 72, Key = "process_step_3_number", Content = "03", Description = "Numéro de la troisième étape", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 73, Key = "process_step_3_title", Content = "Mise en œuvre", Description = "Titre de la troisième étape", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 74, Key = "process_step_3_description", Content = "Nous accompagnons la mise en œuvre avec un suivi rigoureux et des ajustements.", Description = "Description de la troisième étape", CreatedAt = seedDate, UpdatedAt = seedDate },
            
            new ServiceContent { Id = 75, Key = "process_step_4_number", Content = "04", Description = "Numéro de la quatrième étape", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 76, Key = "process_step_4_title", Content = "Suivi", Description = "Titre de la quatrième étape", CreatedAt = seedDate, UpdatedAt = seedDate },
            new ServiceContent { Id = 77, Key = "process_step_4_description", Content = "Nous assurons un suivi continu pour garantir les résultats et l'amélioration.", Description = "Description de la quatrième étape", CreatedAt = seedDate, UpdatedAt = seedDate },

            // GALERIE D'IMAGES
            new ServiceContent { Id = 78, Key = "gallery_title", Content = "Nos réalisations en images", Description = "Titre de la galerie d'images", CreatedAt = seedDate, UpdatedAt = seedDate }
        );
    }

}
