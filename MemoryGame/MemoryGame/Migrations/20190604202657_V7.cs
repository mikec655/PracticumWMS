using Microsoft.EntityFrameworkCore.Migrations;

namespace MemoryGame.Migrations
{
    public partial class V7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Games",
                columns: new[] { "Id", "GameName", "Website" },
                values: new object[] { 1, "Memory", "http://kaas.com/" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                    table: "Games",
                    keyColumns: new[] { "Id" },
                    keyValues: new[] { "1" }
                );
        }
    }
}
