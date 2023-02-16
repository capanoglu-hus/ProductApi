namespace StoreWebApi.Model
{
    public class ResponseHandler
    {
        public static ApiResponse GetExceptionResponse(Exception ex) 
        { 
            ApiResponse response = new ApiResponse();
            response.code = "1";
            response.message = ex.Message;
            return response;
        }

        public static ApiResponse GetAppResponse(ResponseType type , object?  contract) 
        {
            ApiResponse response; 

            response= new ApiResponse { responseData = contract };
            switch (type)
            {
                case ResponseType.Success:
                    response.code = "0";
                    response.message = "Success";
                    break;
                case ResponseType.NotFound:
                    response.code="2";
                    response.message = "no record available";
                    break;
            }
            return response;
        
        
        }
    }
}
