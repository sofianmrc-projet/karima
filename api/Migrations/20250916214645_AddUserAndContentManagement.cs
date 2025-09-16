using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Karima.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddUserAndContentManagement : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    IsAdmin = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    LastLoginAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MediaFiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FileName = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    MimeType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    FileSizeBytes = table.Column<long>(type: "bigint", nullable: false),
                    AltText = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Category = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    CreatedByUserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MediaFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MediaFiles_Users_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ServiceContents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Key = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    UpdatedByUserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceContents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceContents_Users_UpdatedByUserId",
                        column: x => x.UpdatedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.InsertData(
                table: "ServiceContents",
                columns: new[] { "Id", "Content", "CreatedAt", "Description", "Key", "UpdatedByUserId" },
                values: new object[,]
                {
                    { 1, "Nos Services", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre principal de la section hero", "hero_title", null },
                    { 2, "Des solutions complètes et personnalisées pour répondre à tous vos besoins professionnels et vous accompagner vers l'excellence.", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description de la section hero", "hero_description", null },
                    { 3, "Nos domaines d'expertise", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre de la section des services", "services_section_title", null },
                    { 4, "Chaque service est conçu pour vous apporter une valeur ajoutée réelle et mesurable dans votre domaine d'activité.", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description de la section des services", "services_section_description", null },
                    { 5, "Notre méthode de travail", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre de la section processus", "process_section_title", null },
                    { 6, "Une approche structurée et éprouvée pour garantir le succès de vos projets.", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description de la section processus", "process_section_description", null },
                    { 7, "Prêt à transformer votre organisation ?", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Titre de la section CTA", "cta_title", null },
                    { 8, "Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir comment nos services peuvent vous aider à atteindre vos objectifs.", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Description de la section CTA", "cta_description", null }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "IsAdmin", "LastLoginAt", "LastName", "PasswordHash" },
                values: new object[] { 1, new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), "admin@karima.com", "Admin", true, null, "Karima", "$2a$11$nq8n.a2Iu1/f6Eqz/AsVzO2vKiwBkNL39Xljhyp0IT.jnXIyaj2dG" });

            migrationBuilder.CreateIndex(
                name: "IX_MediaFiles_CreatedByUserId",
                table: "MediaFiles",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceContents_Key",
                table: "ServiceContents",
                column: "Key",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ServiceContents_UpdatedByUserId",
                table: "ServiceContents",
                column: "UpdatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MediaFiles");

            migrationBuilder.DropTable(
                name: "ServiceContents");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
