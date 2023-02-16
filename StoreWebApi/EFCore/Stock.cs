
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StoreWebApi.EFCore
{

    [Table("stock")]
    public class Stock
    {

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int stockId { get; set; }


        [ForeignKey("Product")] 
        public int product_id { get; set; }
        public virtual Product Product { get; set; }

        [ForeignKey("User")]
        public int createUserId  { get; set; }
        public virtual User User { get; set; }

        public int quantity { get; set; } 


        public Boolean status { get; set; }

        public DateTime createdDate { get; set; }

        public DateTime updatedDate { get; set; }



      







    }
}
