using Microsoft.EntityFrameworkCore;

namespace ProductApi.Data
{
  public class DataContext :DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) { } 
            public DbSet<Product> Products { get; set; }
        }
    }

