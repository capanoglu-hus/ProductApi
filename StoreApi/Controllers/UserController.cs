
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using StoreApi.Data;
using StoreApi.Model;
using System.Dynamic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace StoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public static User user = new User();

        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;

        public UserController(IConfiguration configuration, DataContext dataContext)
        {
            _configuration = configuration;
            _dataContext = dataContext;
        }


        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserRegisterModel request)
        {
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var findUser = await _dataContext.Users.FirstOrDefaultAsync(p => p.Email == request.Email);
            if (findUser != null)
            {
                return BadRequest("Email hatası");
            }

            user.UserName = request.UserName;
            user.Name = request.Name;
            user.Email = request.Email;
            user.Surname = request.Surname;
            user.CreatedDate= request.CreatedDate;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            _dataContext.Users.Add(user);


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

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

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(UserLoginModel request)
        {

            var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.UserName == request.UserName);
           
            if (user == null)
            {
                return BadRequest("User not found");
            }

            if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong Password");
            }

         

              var UserId = user.UserId;



            string  token =   CreateToken(user);

            var  tokenjwt = new UserLoginModel
            {
                usr = $"{UserId}",
                tokenjwt = $"{token}" ,
               
            };
           

            return Ok(tokenjwt);
        }

       

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {

                new Claim(ClaimTypes.Name , user.UserName)

            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
              _configuration.GetSection("AppSettings:Token").Value));



            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
          
            return jwt;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}

