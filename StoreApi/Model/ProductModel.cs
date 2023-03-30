using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using StoreApi.Data;

namespace StoreApi.Model
{
    public class ProductModel
    {
       
     

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public decimal Price { get; set; }


        public Boolean IsApproved { get; set; }

        public int Status { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

      
        public int Category_Id { get; set; }
        
        public int CreateUserId { get; set; }


        public int UpdateUserId { get; set; }

    }
}
