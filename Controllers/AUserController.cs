using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreApi.Data;
using StoreApi.Model;

namespace StoreApi.Controllers
{
   
        [ApiController]
        [Route("api/[Controller]")]
        public class AUserController : Controller
        {
           
            private readonly DataContext _dataContext;

            public AUserController(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            

            [HttpGet("{id}")]
            public async Task<ActionResult<User>> GetById(int id)
            {
                var user = await _dataContext.Users.FindAsync(id);

                return Ok(user);
            }
       

        [HttpPut]
            [Route("UpdateUser/{id}")]
            public async Task<ActionResult<User>> UpdateUser(int id, UserModel user)
            {
                var findUser = await _dataContext.Users.FindAsync(id);

                if (findUser == null)
                {
                    return NotFound();
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                findUser.Name = user.Name;
                findUser.Surname = user.Surname;
                findUser.Email = user.Email;
                findUser.UpdatedDate = user.UpdatedDate;
                findUser.gender = user.gender;
                findUser.role = user.role;

                _dataContext.Entry(findUser).State = EntityState.Modified;

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

                return Ok(findUser);
            }

          
        }
}


