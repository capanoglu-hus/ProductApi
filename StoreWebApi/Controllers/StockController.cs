using Microsoft.AspNetCore.Mvc;
using StoreWebApi.EFCore;
using StoreWebApi.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StoreWebApi.Controllers
{
    [ApiController]


    public class StockController : ControllerBase
    {
        private readonly DbHelper _db;

        public StockController(EF_DataContext eF_DataContext)
        {
            _db = new DbHelper(eF_DataContext);
        }
        // GET: api/CategoryController>
        [HttpGet]
        [Route("api/[controller]/GetStock")]
        public IActionResult Get()
        {
            ResponseType type = ResponseType.Success;
            try
            {
                IEnumerable<StockModel> data = _db.GetStocks();
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
        [Route("api/[controller]/GetStockById/{stockId}")]
        public IActionResult Get(int stockId)
        {
            ResponseType type = ResponseType.Success;
            try
            {
                StockModel data = _db.GetStocksById(stockId);
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
        public IActionResult Post([FromBody] StockModel model)
        {
            try
            {
                ResponseType type = ResponseType.Success;
                _db.SaveStock(model);
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
        public IActionResult Put([FromBody] StockModel model)
        {
            try
            {
                ResponseType type = ResponseType.Success;
                _db.SaveStock(model);
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
        public IActionResult Delete(int stockId)
        {
            try
            {
                ResponseType type = ResponseType.Success;
                _db.DeleteStock(stockId);
                return Ok(ResponseHandler.GetAppResponse(type, "delete success"));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }






    }
}
