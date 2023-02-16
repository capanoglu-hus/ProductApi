
using StoreWebApi.EFCore;

namespace StoreWebApi.Model
{
    public class CategoryModel
    {
        public int categoryId { get; set; }

        public string name { get; set; } = string.Empty;

        public string description { get; set; } = string.Empty;

        public int status { get; set; }

        public DateTime createdDate { get; set; }

        public DateTime updatedDate { get; set; }

        public int User { get; set; }


        public ICollection<Product>? Products { get; set; }

    }
}
