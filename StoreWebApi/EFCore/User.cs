using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StoreWebApi.EFCore
{
    [Table("user")]
    public class User
    {
        [Key, Required]
        public int userId { get; set; }

        [Required]
        [MaxLength(150)]
        public string name { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string surname { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string userName { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string email { get; set; } = string.Empty;

        [Required]
        [MinLength(5)]
        public string password { get; set; } = string.Empty;

        public DateTime createdDate { get; set; } = DateTime.Now;

        public DateTime updatedDate { get; set; } = DateTime.Now;

        public Gender gender { get; set; }

        public Role role { get; set; } 



    }
}
