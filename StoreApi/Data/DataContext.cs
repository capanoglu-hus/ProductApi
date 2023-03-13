using Microsoft.EntityFrameworkCore;

namespace StoreApi.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

       

        public DbSet<Product> Products { get; set; }

        public DbSet<Category> Categorys { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Stock> Stocks { get; set; }

       protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("server=localhost;Database=StoreApi;Port=5432;User Id= postgres;Password=1234;Integrated Security=true;Pooling=true");
        }
    }
   
}
