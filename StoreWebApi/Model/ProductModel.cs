
using StoreWebApi.EFCore;
using System.ComponentModel.DataAnnotations;

namespace StoreWebApi.Model
{
    public class ProductModel
    {
       
        public int productId { get; set; }

      
        public string name { get; set; } = string.Empty;

        

        public string description { get; set; } = string.Empty;

        public decimal price { get; set; }


        public Boolean isApproved { get; set; }

        public int status { get; set; }


        public int category_Id { get; set; }
       


        public DateTime createdDate { get; set; }

        public DateTime updatedDate { get; set; }


       

       

    }
}
