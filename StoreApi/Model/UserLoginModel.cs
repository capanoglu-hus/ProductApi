namespace StoreApi.Model
{
    public class UserLoginModel
    {
        

       public string usr { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        public string tokenjwt { get; set; } 

    }
}
