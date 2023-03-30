using System.ComponentModel.DataAnnotations;

namespace StoreApi.Model
{
    public class CategoryModel
    {

  
        public int CategoryId { get; set; }

        
        public string Name { get; set; } = string.Empty;

        
        public string Description { get; set; } = string.Empty;

        public int Status { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }


        public int CreateUserId { get; set; }

        public int UpdateUserId { get; set; }


    }
}
