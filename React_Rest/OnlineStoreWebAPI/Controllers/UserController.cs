using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineStoreWebAPI.Common;
using OnlineStoreWebAPI.Data;
using OnlineStoreWebAPI.Models;

namespace OnlineStoreWebAPI.Controllers
{
    public class UserController : BaseController
    {
        private readonly OnlineStoreContext context;
        private readonly EncryptionUtility encryptionUtility;
        public UserController(OnlineStoreContext context, EncryptionUtility encryptionUtility)
        {
            this.context = context;
            this.encryptionUtility = encryptionUtility;
        }
        [HttpPost]
        public async Task<IActionResult> Post(UserModel model)
        {
            if(context.Users.Any(q => q.UserName == model.UserName))
            {
                return BadRequest("نام کاربری تکراری می باشد");
            }
            
            var passwordSalt = Guid.NewGuid().ToString();

            var user = new User(){
                FirstName = model.FirstName,
                LastName = model.LastName,
                UserName = model.UserName,
                IsActive = true,
                Password = encryptionUtility.HashPasswordWithSalt(model.Password, passwordSalt),
                PasswordSalt = passwordSalt,
            };

            await context.AddAsync(user);
            await context.SaveChangesAsync();

            return Ok();
        }
    }
}