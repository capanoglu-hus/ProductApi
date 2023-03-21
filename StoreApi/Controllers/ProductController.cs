using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreApi.Data;
using StoreApi.Model;

namespace StoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
            return Ok(await _dataContext.Products.ToListAsync());
        }

        [HttpPost]
        [Route("AddProduct")]
        public async Task<ProductModel> AddProduct(Product request)
        {
           
               
                product.Name = request.Name;
                product.Description = request.Description;
                product.Price= request.Price;
                product.IsApproved = request.IsApproved;
                product.Status= request.Status;
                product.CreatedDate= request.CreatedDate;
                product.UpdatedDate= request.UpdatedDate;
                product.CreateUserId= request.CreateUserId;
                product.UpdateUserId    = request.UpdateUserId;
                product.Category_Id = request.Category_Id;

            _dataContext.Products.Add(request);
                await _dataContext.SaveChangesAsync();
                return product;
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
