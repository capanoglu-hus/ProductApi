using StoreWebApi.EFCore;
using System.ComponentModel.DataAnnotations;

namespace StoreWebApi.Model
{
    public class UserModel
    {

        public int userId { get; set; }

        public string name { get; set; } = string.Empty;


        public string surname { get; set; } = string.Empty;


        public string userName { get; set; } = string.Empty;


        public string email { get; set; } = string.Empty;


        public string password { get; set; } = string.Empty;

        public DateTime createdDate { get; set; } = DateTime.Now;

        public DateTime updatedDate { get; set; } = DateTime.Now;

        public StoreWebApi.EFCore.Gender gender { get; set; }

        public StoreWebApi.EFCore.Role role { get; set; }

    }
}
