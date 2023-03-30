using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace StoreApi.Data
{
    [Table("stock")]
    public class Stock
    {

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StockId { get; set; }



        public int Product_id { get; set; }



        public int CreateUserId { get; set; }

        public int UpdateUserId { get; set; }

        public int Quantity { get; set; }


        public Boolean Status { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }
    }
}