using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Reflection;

namespace StoreApi.Data
{
    [Table("user")]
    public class User
    {
        [Key, Required]
        public int UserId { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string Surname { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(5)]
        public string Password { get; set; } = string.Empty;

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public DateTime UpdatedDate { get; set; } = DateTime.Now;

        public Gender gender { get; set; }

        public Role role { get; set; }

    }
}
