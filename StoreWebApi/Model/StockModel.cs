
using StoreWebApi.EFCore;
using System.ComponentModel.DataAnnotations;

namespace StoreWebApi.Model
{
    public class StockModel
    {

        
        public int stockId { get; set; }


        public int product_id { get; set; }
      

        public int quantity { get; set; }


        public Boolean status { get; set; }

        public DateTime createdDate { get; set; }

        public DateTime updatedDate { get; set; }

        

      
    }
}
