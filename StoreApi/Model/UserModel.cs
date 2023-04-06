using StoreApi.Data;
using System.ComponentModel.DataAnnotations;

namespace StoreApi.Model
{
    public class UserModel
    {
      

       
        public string Name { get; set; } = string.Empty;

        public string Surname { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public DateTime UpdatedDate { get; set; } 

        public Gender gender { get; set; }

        public Role role { get; set; }

      

    }
}

