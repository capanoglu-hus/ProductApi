using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreApi.Data;
using StoreApi.Model;

namespace StoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StockController : ControllerBase
    {

        public static StockModel stock = new StockModel();
        private readonly DataContext _dataContext;

        public StockController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }


        [HttpGet]
        [Route("GetStock")]
        public async Task<ActionResult<List<Stock>>> GetStock()
        {
            var result = (from s in _dataContext.Stocks
                          join p
               in _dataContext.Products on s.Product_id equals p.ProductId
                          select new
                          {
                              s.StockId,
                              s.Product_id,
                              s.Quantity,
                              s.Status,
                              s.CreatedDate, 
                              s.UpdatedDate ,
                              s.CreateUserId, 
                              s.UpdateUserId, 
                             
                              productName = p.Name
                          }).ToList();

            return Ok(result);
        }





        [HttpPost]
        [Route("AddStock")]
        public async Task<StockModel> AddStock(Stock request)
        {
            stock.Product_id = request.Product_id;
            stock.Quantity = request.Quantity;

            stock.Status = request.Status;
            stock.CreatedDate = request.CreatedDate;
            stock.UpdatedDate = request.UpdatedDate;
            stock.CreateUserId = request.CreateUserId;
            stock.UpdateUserId = request.UpdateUserId;


            _dataContext.Stocks.Add(request);
            await _dataContext.SaveChangesAsync();
            return stock;
        }

        [HttpPatch]
        [Route("UpdateStock/{id}")]
        public async Task<ActionResult<Stock>> UpdateStock(int id, Stock request)
        {
            var stock = await _dataContext.Stocks.FindAsync(id);

            if (stock == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            stock.Product_id = request.Product_id;
            stock.Quantity = request.Quantity;
            stock.Status = request.Status;
            stock.UpdatedDate = request.UpdatedDate;
           
            stock.UpdateUserId = request.UpdateUserId;

            _dataContext.Entry(stock).State = EntityState.Modified;

            try
            {
                await _dataContext.SaveChangesAsync();

            }
            catch (DbUpdateConcurrencyException)
            {
                ModelState.AddModelError("", "Unable to save change. " +
                        "Try Again, if you have problem persists, " +
                        "Contact your system administrator");
            }

            return Ok(stock);
        }

        [HttpDelete]
        [Route("DeleteStock/{id}")]
        public async Task<ActionResult<List<Stock>>> DeleteStock(int id)
        {
            var dbStock = await _dataContext.Stocks.FindAsync(id);
            if (dbStock == null)
                return BadRequest("Hero not found.");

            _dataContext.Stocks.Remove(dbStock);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Stocks.ToListAsync());
        }
    }
}
