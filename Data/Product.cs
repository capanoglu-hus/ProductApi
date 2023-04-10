using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace StoreApi.Data
{
    [Table("product")]
    public class Product
    {
       
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductId { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(250)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public decimal Price { get; set; }


        public Boolean IsApproved { get; set; }

        public int Status { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;


        public int Category_Id { get; set; }

        //public virtual Category Category { get; set; }
        public int CreateUserId { get; set; }


        public int UpdateUserId { get; set; }




    }
}