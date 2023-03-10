using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreApi.Data;

namespace StoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public StockController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        [Route("GetStock")]
        public async Task<ActionResult<IEnumerable<Stock>>> GetStocks()
        {
            if(_dataContext.Stocks == null)
            {
                return NotFound();
            }

            return await _dataContext.Stocks.ToListAsync();
        }

        


        [HttpPost]
        [Route("AddStock")]
        public async Task<Stock> AddStock(Stock objStock)
        {
            _dataContext.Stocks.Add(objStock);
            await _dataContext.SaveChangesAsync();
            return objStock;
        }

        [HttpPatch]
        [Route("UpdateStock/{id}")]
        public async Task<Stock> UpdateStock(Stock objStock)
        {
            _dataContext.Entry(objStock).State = EntityState.Modified;
            await _dataContext.SaveChangesAsync();
            return objStock;
        }

        [HttpDelete]
        [Route("DeleteStock/{id}")]
        public bool DeleteStock(int id)
        {
            bool a = false;
            var stock = _dataContext.Stocks.Find(id);
            if (stock != null)
            {
                a = true;
                _dataContext.Entry(stock).State = EntityState.Deleted;
                _dataContext.SaveChanges();
            }
            else
            {
                a = false;
            }
            return a;

        }
    }
}
