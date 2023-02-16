namespace StoreWebApi.Model
{
    public class ApiResponse
    {
        public string? code { get; set; }

        public string? message { get; set; }

        public object? responseData { get; set; }


    }

    public enum ResponseType
    { 
        Success, 
        NotFound,
        Failure
    }
}
