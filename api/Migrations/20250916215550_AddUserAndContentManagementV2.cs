using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Karima.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddUserAndContentManagementV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$F/OyPK1nNdmPljsaOChupO6.yNmRQHbsUq6CYf9cTYOYzDY/LPEqO");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$nq8n.a2Iu1/f6Eqz/AsVzO2vKiwBkNL39Xljhyp0IT.jnXIyaj2dG");
        }
    }
}
