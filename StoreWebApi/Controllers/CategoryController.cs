using Microsoft.AspNetCore.Mvc;
using StoreWebApi.EFCore;
using StoreWebApi.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StoreWebApi.Controllers
{
    [ApiController]


    public class CategoryController : ControllerBase
    {
        private readonly DbHelper _db;

        public CategoryController(EF_DataContext eF_DataContext)
        {
            _db = new DbHelper(eF_DataContext);
        }
        // GET: api/CategoryController>
        [HttpGet]
        [Route("api/[controller]/GetCategory")]
        public IActionResult Get()
        {
            ResponseType type = ResponseType.Success;
            try
            {
                IEnumerable<CategoryModel> data = _db.GetCategorys();
                if (!data.Any())
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

        // GET api/<CategoryController>/5
        [HttpGet]
        [Route("api/[controller]/GetCategoryById/{categoryId}")]
        public IActionResult Get(int categoryId)
        {
            ResponseType type = ResponseType.Success;
            try
            {
                CategoryModel data = _db.GetCategoryById(categoryId);
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

        // POST api/<CategoryController>
        [HttpPost]
        [Route("api/[controller]/SaveCategory")]
        public IActionResult Post([FromBody] CategoryModel model)
        {
            try
            {
                ResponseType type = ResponseType.Success;
                _db.SaveCategory(model);
                return Ok(ResponseHandler.GetAppResponse(type, model));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }

        // PUT api/<CategoryController>/5
        [HttpPut]
        [Route("api/[controller]/UpdateCategory")]
        public IActionResult Put([FromBody] CategoryModel model)
        {
            try
            {
                ResponseType type = ResponseType.Success;
                _db.SaveCategory(model);
                return Ok(ResponseHandler.GetAppResponse(type, model));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }


        // DELETE api/<CategoryController>/5
        [HttpDelete]
        [Route("api/[controller]/DeleteCategory/{id}")]
        public IActionResult Delete(int categoryId)
        {
            try
            {
                ResponseType type = ResponseType.Success;
                _db.DeleteProduct(categoryId);
                return Ok(ResponseHandler.GetAppResponse(type, "delete success"));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }



    }
}
