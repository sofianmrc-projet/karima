using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Karima.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddSections : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 43);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 44);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 45);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 47);

            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.CreateTable(
                name: "Sections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Key = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    AltText = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Category = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    UpdatedByUserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sections_Users_UpdatedByUserId",
                        column: x => x.UpdatedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Sections",
                columns: new[] { "Id", "AltText", "Category", "Content", "CreatedAt", "Description", "ImageUrl", "IsActive", "Key", "SortOrder", "Title", "UpdatedByUserId" },
                values: new object[,]
                {
                    { 1, null, "Accueil", "Bienvenue chez Karima", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre principal de la page d'accueil", null, true, "home_hero", 1, "Section Hero - Accueil", null },
                    { 2, null, "Accueil", "Votre partenaire de confiance", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Sous-titre de la page d'accueil", null, true, "home_hero_subtitle", 2, "Sous-titre Hero", null },
                    { 3, null, "Accueil", "Des solutions innovantes pour votre entreprise", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description principale de la page d'accueil", null, true, "home_hero_description", 3, "Description Hero", null },
                    { 4, null, "Accueil", "Une entreprise dédiée à votre succès", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Section à propos sur l'accueil", null, true, "home_about", 4, "Section À propos", null },
                    { 5, null, "Accueil", "100+ Projets réalisés|50+ Clients satisfaits|5+ Années d'expérience", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Statistiques de l'entreprise", null, true, "home_stats", 5, "Statistiques", null },
                    { 6, null, "Services", "Nos Services", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre principal de la page services", null, true, "services_hero", 1, "Hero Services", null },
                    { 7, null, "Services", "Des solutions complètes et personnalisées pour répondre à tous vos besoins professionnels", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description de la page services", null, true, "services_description", 2, "Description Services", null },
                    { 8, null, "Services", "Accompagnement personnalisé pour optimiser vos processus et améliorer vos performances organisationnelles.", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Premier service", null, true, "service_consulting", 3, "Consulting Stratégique", null },
                    { 9, null, "Services", "Formations sur mesure pour développer les compétences de vos équipes et améliorer leur performance.", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Deuxième service", null, true, "service_formation", 4, "Formation Professionnelle", null },
                    { 10, null, "Services", "Support permanent pour assurer la réussite de vos projets et transformations organisationnelles.", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Troisième service", null, true, "service_accompagnement", 5, "Accompagnement Continu", null },
                    { 11, null, "À propos", "À propos de nous", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre principal de la page à propos", null, true, "about_hero", 1, "Hero À propos", null },
                    { 12, null, "À propos", "Une entreprise dédiée à l'excellence et à l'innovation", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Section entreprise", null, true, "about_company", 2, "Notre entreprise", null },
                    { 13, null, "À propos", "Des professionnels passionnés et expérimentés", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Section équipe", null, true, "about_team", 3, "Notre équipe", null },
                    { 14, null, "À propos", "Des valeurs qui nous guident au quotidien", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Section valeurs", null, true, "about_values", 4, "Nos valeurs", null },
                    { 15, null, "Contact", "Contactez-nous", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre principal de la page contact", null, true, "contact_hero", 1, "Hero Contact", null },
                    { 16, null, "Contact", "123 Rue de la Paix, 75001 Paris|+33 1 23 45 67 89|contact@karima.com|Lun-Ven: 9h-18h", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Coordonnées de contact", null, true, "contact_info", 2, "Informations de contact", null },
                    { 17, null, "Footer", "Karima", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Nom de l'entreprise dans le footer", null, true, "footer_company", 1, "Footer - Entreprise", null },
                    { 18, null, "Footer", "Votre partenaire de confiance pour tous vos projets", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description dans le footer", null, true, "footer_description", 2, "Footer - Description", null },
                    { 19, null, "Footer", "© 2025 Karima. Tous droits réservés.", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Copyright dans le footer", null, true, "footer_copyright", 3, "Footer - Copyright", null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Sections_Key",
                table: "Sections",
                column: "Key",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sections_UpdatedByUserId",
                table: "Sections",
                column: "UpdatedByUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sections");

            migrationBuilder.InsertData(
                table: "ServiceContents",
                columns: new[] { "Id", "Content", "CreatedAt", "Description", "Key", "UpdatedByUserId" },
                values: new object[,]
                {
                    { 1, "Bienvenue chez Karima", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre principal de la page d'accueil", "home_hero_title", null },
                    { 2, "Votre partenaire de confiance", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Sous-titre de la page d'accueil", "home_hero_subtitle", null },
                    { 3, "Des solutions innovantes pour votre entreprise", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description principale de la page d'accueil", "home_hero_description", null },
                    { 4, "Découvrir nos services", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Texte du bouton CTA de la page d'accueil", "home_hero_cta_text", null },
                    { 5, "À propos de nous", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre de la section à propos sur l'accueil", "home_about_title", null },
                    { 6, "Une entreprise dédiée à votre succès", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description de la section à propos sur l'accueil", "home_about_description", null },
                    { 7, "100+", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Première statistique - nombre", "home_stat_1_number", null },
                    { 8, "Projets réalisés", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Première statistique - label", "home_stat_1_label", null },
                    { 9, "50+", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Deuxième statistique - nombre", "home_stat_2_number", null },
                    { 10, "Clients satisfaits", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Deuxième statistique - label", "home_stat_2_label", null },
                    { 11, "5+", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Troisième statistique - nombre", "home_stat_3_number", null },
                    { 12, "Années d'expérience", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Troisième statistique - label", "home_stat_3_label", null },
                    { 13, "Nos Services", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre principal de la page services", "services_hero_title", null },
                    { 14, "Des solutions complètes et personnalisées pour répondre à tous vos besoins professionnels et vous accompagner vers l'excellence.", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description de la page services", "services_hero_description", null },
                    { 15, "Nos domaines d'expertise", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre de la section des services", "services_section_title", null },
                    { 16, "Chaque service est conçu pour vous apporter une valeur ajoutée réelle et mesurable dans votre domaine d'activité.", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description de la section des services", "services_section_description", null },
                    { 17, "Notre méthode de travail", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre de la section processus", "services_process_title", null },
                    { 18, "Une approche structurée et éprouvée pour garantir le succès de vos projets.", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description de la section processus", "services_process_description", null },
                    { 19, "Prêt à transformer votre organisation ?", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre de la section CTA", "services_cta_title", null },
                    { 20, "Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir comment nos services peuvent vous aider à atteindre vos objectifs.", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description de la section CTA", "services_cta_description", null },
                    { 21, "À propos de nous", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre principal de la page à propos", "about_hero_title", null },
                    { 22, "Découvrez notre histoire et notre mission", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description de la page à propos", "about_hero_description", null },
                    { 23, "Notre entreprise", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre de la section entreprise", "about_company_title", null },
                    { 24, "Une entreprise dédiée à l'excellence et à l'innovation", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description de la section entreprise", "about_company_description", null },
                    { 25, "Notre équipe", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre de la section équipe", "about_team_title", null },
                    { 26, "Des professionnels passionnés et expérimentés", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description de la section équipe", "about_team_description", null },
                    { 27, "Nos valeurs", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre de la section valeurs", "about_values_title", null },
                    { 28, "Des valeurs qui nous guident au quotidien", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description de la section valeurs", "about_values_description", null },
                    { 29, "Notre mission", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre de la section mission", "about_mission_title", null },
                    { 30, "Accompagner nos clients vers le succès", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description de la section mission", "about_mission_description", null },
                    { 31, "Notre Blog", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre principal de la page blog", "blog_hero_title", null },
                    { 32, "Découvrez nos articles et actualités", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description de la page blog", "blog_hero_description", null },
                    { 33, "Derniers articles", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre de la section articles", "blog_section_title", null },
                    { 34, "Restez informé de nos dernières actualités", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description de la section articles", "blog_section_description", null },
                    { 35, "Restez informé", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre de la section CTA blog", "blog_cta_title", null },
                    { 36, "Abonnez-vous à notre newsletter", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description de la section CTA blog", "blog_cta_description", null },
                    { 37, "Contactez-nous", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre principal de la page contact", "contact_hero_title", null },
                    { 38, "Nous sommes là pour vous accompagner", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description de la page contact", "contact_hero_description", null },
                    { 39, "Nos coordonnées", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre de la section informations contact", "contact_info_title", null },
                    { 40, "123 Rue de la Paix, 75001 Paris", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Adresse de contact", "contact_address", null },
                    { 41, "+33 1 23 45 67 89", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Téléphone de contact", "contact_phone", null },
                    { 42, "contact@karima.com", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Email de contact", "contact_email", null },
                    { 43, "Lun-Ven: 9h-18h", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Horaires de contact", "contact_hours", null },
                    { 44, "Karima", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Nom de l'entreprise dans le footer", "footer_company_name", null },
                    { 45, "Votre partenaire de confiance pour tous vos projets", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description dans le footer", "footer_description", null },
                    { 46, "© 2025 Karima. Tous droits réservés.", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Copyright dans le footer", "footer_copyright", null },
                    { 47, "Mentions légales | Politique de confidentialité", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Liens dans le footer", "footer_links_title", null }
                });

            migrationBuilder.InsertData(
                table: "Todos",
                columns: new[] { "Id", "CreatedAt", "Done", "Title" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), true, "Créer la maquette du site Karima" },
                    { 2, new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), true, "Développer l'API backend" },
                    { 3, new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), false, "Implémenter le frontend React" },
                    { 4, new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), false, "Configurer la base de données" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "IsAdmin", "LastLoginAt", "LastName", "PasswordHash" },
                values: new object[] { 1, new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "admin@karima.com", "Admin", true, null, "Karima", "$2a$11$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy" });
        }
    }
}
