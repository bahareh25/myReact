using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OnlineStoreWebAPI.Migrations
{
    public partial class AddCustomerThumbnailByteArray : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Thumbnail",
                table: "Customers",
                type: "varbinary(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Thumbnail",
                table: "Customers");
        }
    }
}
