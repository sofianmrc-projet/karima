using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Karima.Api.Migrations
{
    /// <inheritdoc />
    public partial class CompleteSiteContent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Content", "Description", "Key" },
                values: new object[] { "Bienvenue chez Karima", "Titre principal de la page d'accueil", "home_hero_title" });

            migrationBuilder.UpdateData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Content", "Description", "Key" },
                values: new object[] { "Votre partenaire de confiance", "Sous-titre de la page d'accueil", "home_hero_subtitle" });

            migrationBuilder.UpdateData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Content", "Description", "Key" },
                values: new object[] { "Des solutions innovantes pour votre entreprise", "Description principale de la page d'accueil", "home_hero_description" });

            migrationBuilder.UpdateData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Content", "Description", "Key" },
                values: new object[] { "Découvrir nos services", "Texte du bouton CTA de la page d'accueil", "home_hero_cta_text" });

            migrationBuilder.UpdateData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Content", "Description", "Key" },
                values: new object[] { "À propos de nous", "Titre de la section à propos sur l'accueil", "home_about_title" });

            migrationBuilder.UpdateData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Content", "Description", "Key" },
                values: new object[] { "Une entreprise dédiée à votre succès", "Description de la section à propos sur l'accueil", "home_about_description" });

            migrationBuilder.UpdateData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Content", "Description", "Key" },
                values: new object[] { "100+", "Première statistique - nombre", "home_stat_1_number" });

            migrationBuilder.UpdateData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Content", "Description", "Key" },
                values: new object[] { "Projets réalisés", "Première statistique - label", "home_stat_1_label" });

            migrationBuilder.InsertData(
                table: "ServiceContents",
                columns: new[] { "Id", "Content", "CreatedAt", "Description", "Key", "UpdatedByUserId" },
                values: new object[,]
                {
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.UpdateData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Content", "Description", "Key" },
                values: new object[] { "Nos Services", "Titre principal de la section hero", "hero_title" });

            migrationBuilder.UpdateData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Content", "Description", "Key" },
                values: new object[] { "Des solutions complètes et personnalisées pour répondre à tous vos besoins professionnels et vous accompagner vers l'excellence.", "Description de la section hero", "hero_description" });

            migrationBuilder.UpdateData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Content", "Description", "Key" },
                values: new object[] { "Nos domaines d'expertise", "Titre de la section des services", "services_section_title" });

            migrationBuilder.UpdateData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Content", "Description", "Key" },
                values: new object[] { "Chaque service est conçu pour vous apporter une valeur ajoutée réelle et mesurable dans votre domaine d'activité.", "Description de la section des services", "services_section_description" });

            migrationBuilder.UpdateData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Content", "Description", "Key" },
                values: new object[] { "Notre méthode de travail", "Titre de la section processus", "process_section_title" });

            migrationBuilder.UpdateData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Content", "Description", "Key" },
                values: new object[] { "Une approche structurée et éprouvée pour garantir le succès de vos projets.", "Description de la section processus", "process_section_description" });

            migrationBuilder.UpdateData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Content", "Description", "Key" },
                values: new object[] { "Prêt à transformer votre organisation ?", "Titre de la section CTA", "cta_title" });

            migrationBuilder.UpdateData(
                table: "ServiceContents",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Content", "Description", "Key" },
                values: new object[] { "Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir comment nos services peuvent vous aider à atteindre vos objectifs.", "Description de la section CTA", "cta_description" });
        }
    }
}
