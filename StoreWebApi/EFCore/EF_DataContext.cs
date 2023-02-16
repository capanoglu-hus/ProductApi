using Microsoft.EntityFrameworkCore;

namespace StoreWebApi.EFCore
{
    public class EF_DataContext : DbContext
    {

        public EF_DataContext(DbContextOptions<EF_DataContext> options):base(options) { }

        public DbSet<Product> Products { get; set; } 

        public DbSet<Category> Categorys { get;set; }

        public DbSet<User> Users { get; set; } 

        public DbSet<Stock> Stocks { get; set; } 
    }
}
