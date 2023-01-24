using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductApi.Data
{

    [Table("product")]
    public class Product
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }


        public string Name { get; set; } = string.Empty;



        public string Attribute { get; set; } = string.Empty;


        public int Sales { get; set; }



    }
}
