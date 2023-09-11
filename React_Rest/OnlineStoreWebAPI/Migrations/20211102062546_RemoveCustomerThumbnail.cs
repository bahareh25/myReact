using Microsoft.EntityFrameworkCore.Migrations;

namespace OnlineStoreWebAPI.Migrations
{
    public partial class RemoveCustomerThumbnail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Thumbnail",
                table: "Customers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Thumbnail",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
