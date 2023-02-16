
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StoreWebApi.EFCore
{
    [Table("product")]
    public class Product
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int productId { get; set; }

        [Required]
        [MaxLength(150)]
        public string name { get; set; } = string.Empty;

        [Required]
        [MaxLength(250)]
        public string description { get; set; } = string.Empty; 

        [Required]
        public decimal price { get; set; }


        public Boolean isApproved { get; set; } 

        public int status { get; set; } 

        public DateTime createdDate { get; set; } 

        public DateTime updatedDate { get; set; }



        [ForeignKey("Category")]
        public int category_Id  { get; set; }
        public virtual Category Category { get; set; } = null!;
       
        [ForeignKey("User")]
        public int createUserId { get; set; }


       


    }
}
