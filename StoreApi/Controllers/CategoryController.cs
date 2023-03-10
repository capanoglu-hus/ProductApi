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
        public async Task<IEnumerable<Category>> GetCategorys()
        {
            return await _dataContext.Categorys.ToListAsync();
        }

        [HttpPost]
        [Route("AddCategory")]
        public async Task<Category> AddCategory(Category objCategory)
        {
            _dataContext.Categorys.Add(objCategory);
            await _dataContext.SaveChangesAsync();
            return objCategory;
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
        public bool DeleteCategory(int id)
        {
            bool a = false;
            var category = _dataContext.Categorys.Find(id);
            if (category != null)
            {
                a = true;
                _dataContext.Entry(category).State = EntityState.Deleted;
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
