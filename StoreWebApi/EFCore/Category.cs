
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StoreWebApi.EFCore
{
    [Table("category")]
    public class Category
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int categoryId { get; set; }

        [Required]
        [MaxLength(150)]
        public string name { get; set; } = string.Empty;

        [MaxLength(250)]
        public string description { get; set; } = string.Empty;

        public int status { get; set; } 

        public DateTime createdDate { get; set; }

        public DateTime updatedDate { get; set; }


        [ForeignKey("User")]
        public int createUserId { get; set; }
        public virtual User User { get; set; } = null!;






    }
}
