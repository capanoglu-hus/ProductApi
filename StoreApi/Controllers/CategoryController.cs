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

         [HttpPatch]
        [Route("UpdateCategory/{id}")]
        public async Task<Category> UpdateCategory(Category objCategory)
        {
            _dataContext.Entry(objCategory).State = EntityState.Modified;
            await _dataContext.SaveChangesAsync();
            return objCategory;
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
