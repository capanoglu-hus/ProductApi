namespace StoreApi.Model
{
    public class UserLoginModel
    {
        

        // public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        public string tokenjwt { get; set; } 

    }
}
