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
    public class CategoryController : ControllerBase
    {
        public static CategoryModel category = new CategoryModel();
      
        private readonly DataContext _dataContext;

        public CategoryController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        [Route("GetCategory")]
        public async Task<ActionResult<List<Category>>> GetCategory()
        {
            return Ok(await _dataContext.Categorys.ToListAsync());
        }


        [HttpPost]
        [Route("AddCategory")]
        public async Task<CategoryModel> AddCategory(Category request)
        {
            category.Name = request.Name;
            category.Description = request.Description;
            category.Status = request.Status;
            category.CreatedDate = request.CreatedDate;
            category.UpdatedDate = request.UpdatedDate;
            category.CreateUserId = request.CreateUserId;
            category.UpdateUserId = request.UpdateUserId;
            

            _dataContext.Categorys.Add(request);
            await _dataContext.SaveChangesAsync();
            return category;
        }

        [HttpPatch]
        [Route("UpdateCategory/{id}")]
        public async Task<ActionResult<Category>> UpdateCategory(int id, Category request)
        {
            var category = await _dataContext.Categorys.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            category.Name = request.Name;
            category.Description = request.Description;
            category.Status = request.Status;
            category.UpdatedDate = request.UpdatedDate;
           
            category.UpdateUserId = request.UpdateUserId;

            _dataContext.Entry(category).State = EntityState.Modified;

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

            return Ok(category);
        }

        [HttpDelete]
        [Route("DeleteCategory/{id}")]
        public async Task<ActionResult<List<Category>>> Delete(int id)
        {
            var dbCat = await _dataContext.Categorys.FindAsync(id);
            if (dbCat == null)
                return BadRequest("Hero not found.");

            _dataContext.Categorys.Remove(dbCat);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Categorys.ToListAsync());
        }
    }
}

