
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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
        public static UserModel user = new UserModel();

        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;

        public UserController(IConfiguration configuration , DataContext dataContext)
        {   
             _configuration = configuration;
            _dataContext = dataContext;
        }


        [HttpPost("register")]
        public async Task<ActionResult<UserModel>> Register(User request)
        {
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            user.UserId = request.UserId;
           
            user.UserName = request.UserName;
            user.Name = request.UserName;
            user.Email = request.Email;  
            user.Surname= request.Surname;
            user.gender = request.gender;
            user.role = request.role;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _dataContext.Users.Add(request);
            await _dataContext.SaveChangesAsync();
            return user;

        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(User request)
        {
            if (user.UserName != request.UserName)
            {
                return BadRequest("user not found.");
            }
            if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("wrong password.");
            }

            string token = CreateToken(user);
            return Ok(token);
        }


        private string CreateToken(UserModel user)
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

