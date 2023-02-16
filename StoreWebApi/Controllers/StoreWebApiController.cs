using Microsoft.AspNetCore.Mvc;
using StoreWebApi.EFCore;
using StoreWebApi.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StoreWebApi.Controllers
{
    
    [ApiController]

    
    public class StoreWebApiController : ControllerBase
    {
        private readonly DbHelper _db;

        public StoreWebApiController(EF_DataContext eF_DataContext)
        {
            _db = new DbHelper(eF_DataContext);
        }
        // GET: api/<ProductController>
        [HttpGet]
        [Route("api/[controller]/GetProducts")]
        public IActionResult Get()
        {
            ResponseType type= ResponseType.Success;
            try
            {
                IEnumerable<ProductModel> data = _db.GetProducts();
                if(!data.Any())
                {
                    type = ResponseType.NotFound;
                }
                return Ok(ResponseHandler.GetAppResponse(type, data));
            }
            catch (Exception ex ) 
            {
              
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }

        // GET api/<ProductController>/5
        [HttpGet]
        [Route("api/[controller]/GetProductById/{productId}")]
        public IActionResult Get(int productId)
        {
            ResponseType type = ResponseType.Success;
            try
            {
               ProductModel data = _db.GetProductById(productId);
                if (data == null)
                {
                    type = ResponseType.NotFound;
                }
                return Ok(ResponseHandler.GetAppResponse(type, data));
            }
            catch (Exception ex)
            {
               
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }

        // POST api/<ProductController>
        [HttpPost]
        [Route("api/[controller]/SaveProduct")]
        public IActionResult Post([FromBody] ProductModel model)
        {
            try
            {
                ResponseType type = ResponseType.Success;
                _db.SaveProduct(model);
                return Ok(ResponseHandler.GetAppResponse(type, model));
            }
            catch (Exception ex) 
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }

        // PUT api/<ProductController>/5
        [HttpPut]
        [Route("api/[controller]/UpdateProduct")]
        public IActionResult Put([FromBody] ProductModel model)
        {
            try
            {
                ResponseType type = ResponseType.Success;
                _db.SaveProduct(model);
                return Ok(ResponseHandler.GetAppResponse(type, model));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }
    

        // DELETE api/<ProductController>/5
        [HttpDelete]
        [Route("api/[controller]/DeleteProduct/{id}")]
        public IActionResult Delete(int productId)
        {
            try
            {
                ResponseType type = ResponseType.Success;
                _db.DeleteProduct(productId);
                return Ok(ResponseHandler.GetAppResponse(type, "delete success"));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }


      



    }
}
