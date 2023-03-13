using StoreApi.Data;
using System.ComponentModel.DataAnnotations;

namespace StoreApi.Model
{
    public class UserModel
    {
        public int UserId { get; set; }

       
        public string Name { get; set; } = string.Empty;

        public string Surname { get; set; } = string.Empty;

        public string UserName { get; set; } = string.Empty;

        
        public string Email { get; set; } = string.Empty;

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public DateTime UpdatedDate { get; set; } = DateTime.Now;

        public Gender gender { get; set; }

        public Role role { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set;}

    }
}
