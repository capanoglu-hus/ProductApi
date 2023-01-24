using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductApi.Data;
using System.Runtime.CompilerServices;

namespace ProductApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        


        private readonly DataContext _context;

        public ProductController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<List<Data.Product>>> Get()
        {
            return Ok(await _context.Products.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Data.Product>> Get(int id )
        {
            var product = await _context.Products.FindAsync(id);
            if (product ==null)
            {
                return BadRequest("Product not found. ");
            }
            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<List<Data.Product>>> AddProduct(Data.Product product )
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok(await _context.Products.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Data.Product>>> UpdateProduct(Data.Product request)
        {
            var dbproduct = await _context.Products.FindAsync(request.Id);
            if (dbproduct == null)
            
                return BadRequest("Product not found. ");
            

                dbproduct.Name = request.Name;
                dbproduct.Attribute = request.Attribute;
                dbproduct.Sales = request.Sales;
            await _context.SaveChangesAsync();
            return Ok(await _context.Products.ToListAsync());
        
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Data.Product>>> Delete(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            
                return BadRequest("Product not found. ");
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok(await _context.Products.ToListAsync());

        }
    }
}
