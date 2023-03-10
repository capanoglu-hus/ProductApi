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
        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _dataContext.Products.ToListAsync();
        }
       

        [HttpPost]
        [Route("AddProduct")]
        public async Task<ActionResult<Product>> AddProduct(Product product)
        {
            _dataContext.Products.Add(product);
            await _dataContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProducts), new { id =product.ProductId } , product);
        }

        [HttpPatch]
        [Route("UpdateProduct/{id}")]
        public async Task<ActionResult<Product>> UpdateProduct(Product product)
        {
            _dataContext.Entry(product).State = EntityState.Modified;
            await _dataContext.SaveChangesAsync();
            return product;
        }

        [HttpDelete]
        [Route("DeleteProduct/{id}")]
        public bool DeleteProduct(int id)
        {
            bool a = false;
            var product = _dataContext.Products.Find(id);
            if (product != null)
            {
                a = true;
                _dataContext.Entry(product).State = EntityState.Deleted;
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
