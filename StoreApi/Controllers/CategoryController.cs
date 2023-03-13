using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreApi.Data;

namespace StoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
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
        public async Task<ActionResult<IEnumerable<List<Category>>>> AddCategory(Category category)
        {
            _dataContext.Categorys.Add(category);
            await _dataContext.SaveChangesAsync();

            return Ok(category);
        }

        [HttpPut]
        [Route("UpdateCategory")]
        public async Task<ActionResult<List<Category>>> UpdateCategory(Category request)
        {
            var dbCat = await _dataContext.Categorys.FindAsync(request.CategoryId);
            if (dbCat == null)
                return BadRequest("Category not found.");

            
            dbCat.Name = request.Name;
            dbCat.Description = request.Description;
            dbCat.Status = request.Status;
            dbCat.CreatedDate = request.CreatedDate;
            dbCat.UpdatedDate = request.UpdatedDate;
            dbCat.CreateUserId = request.CreateUserId;
            dbCat.UpdateUserId = request.UpdateUserId;

            await _dataContext.SaveChangesAsync();

            return Ok(request);
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
