using Microsoft.EntityFrameworkCore;

namespace OnlineStoreWebAPI.Data
{
    public class OnlineStoreContext : DbContext
    {
        public OnlineStoreContext(DbContextOptions<OnlineStoreContext> options):base(options)
        {
            
        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserRefreshToken> UserRefreshTokens { get; set; }
        public DbSet<UserRefreshTokenHistory> UserRefreshTokenHistories { get; set; }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Customer> Customers { get; set; }
    }
}