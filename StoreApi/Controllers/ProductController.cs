using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreApi.Data;


namespace StoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    { 
        private readonly DataContext _dataContext;

        public ProductController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        
        [HttpGet]
        [Route("GetProduct")]
        public async Task<ActionResult<IEnumerable<List<Product>>>> GetProduct()
        {
            return Ok(await _dataContext.Products.ToListAsync());
        }
     
        [HttpPost]
        [Route("AddProduct")]
        public async Task<ActionResult<List<Product>>> AddProduct(Product product)
        {
            _dataContext.Products.Add(product);
            await _dataContext.SaveChangesAsync();

            return Ok(product);
        }



         [HttpPatch]
        [Route("UpdateProduct/{id}")]
        public async Task<Product> UpdateProduct(Product objProduct)
        {
            _dataContext.Entry(objProduct).State = EntityState.Modified;
            await _dataContext.SaveChangesAsync();
            return objProduct;
        }

        [HttpDelete]
        [Route("DeleteProduct/{id}")]
        public async Task<ActionResult<List<Product>>> Delete(int id)
        {
            var dbpro = await _dataContext.Products.FindAsync(id);
            if (dbpro == null)
                return BadRequest("product not found.");

            _dataContext.Products.Remove(dbpro);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Products.ToListAsync());
        }
    }
}
