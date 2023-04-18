using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreApi.Data;
using StoreApi.Model;
using System.Linq;

namespace StoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductController : ControllerBase
    {
        public static ProductModel product = new ProductModel();
        private readonly DataContext _dataContext;

        public ProductController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        [Route("GetProduct")]
        public async Task<ActionResult<IEnumerable<List<Product>>>> GetProduct()
        {
            var result = (from e in _dataContext.Products
                          join d
               in _dataContext.Categorys on e.Category_Id equals d.CategoryId
              select new
              {
                   e.ProductId,
                   e.Name,
                   e.Description,
                   e.Price,
                   e.IsApproved,
                   e.Status,
                   e.CreatedDate,
                   e.UpdatedDate,
                   e.CreateUserId,
                   e.UpdateUserId,
                   e.Category_Id,
                  CategoryName = d.Name
              }).ToList();
            
            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("AddProduct")]
        public async Task<ProductModel> AddProduct(Product request)
        {


            product.Name = request.Name;
            product.Description = request.Description;
            product.Price = request.Price;
            product.IsApproved = request.IsApproved;
            product.Status = request.Status;
            product.CreatedDate = DateTime.UtcNow;
            product.UpdatedDate = request.UpdatedDate;
            product.CreateUserId = request.CreateUserId;
            product.UpdateUserId = request.UpdateUserId;
            product.Category_Id = request.Category_Id;

            _dataContext.Products.Add(request);
            await _dataContext.SaveChangesAsync();
            return product;
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch]
        [Route("UpdateProduct/{id}")]
        public async Task<ActionResult<Product>> UpdateProduct(int id, Product request)
        {
            var product = await _dataContext.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            product.Name = request.Name;
            product.Description = request.Description;
            product.Price = request.Price;
            product.IsApproved = request.IsApproved;
            product.Status = request.Status;
          
            product.UpdatedDate = request.UpdatedDate;
          
            product.UpdateUserId = request.UpdateUserId;
            product.Category_Id = request.Category_Id;

            _dataContext.Entry(product).State = EntityState.Modified;

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

            return Ok(product);
        }
        [Authorize(Roles = "Admin")]
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
