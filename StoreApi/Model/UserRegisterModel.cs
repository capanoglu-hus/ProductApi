namespace StoreApi.Model
{
    public class UserRegisterModel
    {
        public string Name { get; set; } = string.Empty;

        public string Surname { get; set; } = string.Empty;

        public string UserName { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public DateTime CreatedDate { get; set; } 
    }
}
