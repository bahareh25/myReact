using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineStoreWebAPI.Data;
using OnlineStoreWebAPI.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using OnlineStoreWebAPI.Common;
using System;
using Microsoft.Extensions.Configuration;

namespace OnlineStoreWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticateController : ControllerBase
    {
        private readonly OnlineStoreContext context;
        private readonly EncryptionUtility encryptionUtility;
        private readonly IConfiguration configuration;
        public AuthenticateController(OnlineStoreContext context,
        EncryptionUtility encryptionUtility,
        IConfiguration configuration)
        {
            this.context = context;
            this.encryptionUtility = encryptionUtility;
            this.configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Post(LoginModel model)
        {
            var user = await context.Users.SingleOrDefaultAsync(q => q.UserName == model.UserName);

            if (user == null)
            {
                return BadRequest("نام کاربری موجود نمی باشد");
            }

            var hashPassword = encryptionUtility.HashPasswordWithSalt(model.Password, user.PasswordSalt);

            if (user.Password != hashPassword)
            {
                return BadRequest("رمز عبور صحیح نمی باشد");
            }

            string token;
            string refreshToken;
            (token,refreshToken) =  await GetTokens(user.Id); 

            
            var result = new AuthenticateModel
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = token,
                RefreshToken = refreshToken,
                UserName = user.UserName,
            };

            return Ok(result);
        }

        [HttpPost("NewToken")]
        public async Task<IActionResult> GenerateNewToken(RefreshTokenModel model)
        {
            var userRefreshToken = await context.UserRefreshTokens
            .SingleOrDefaultAsync(q => q.RefreshToken == model.RefreshToken);

            if (userRefreshToken == null || !userRefreshToken.IsValid) return BadRequest("توکن ارسالی معتبر نمی باشد");

            var refreshTokenTimeout = configuration.GetValue<int>("RefreshTokenTimeout");
            if (userRefreshToken.CreateDate.AddMinutes(refreshTokenTimeout) < DateTime.Now)
                return BadRequest("مدت زمان توکن پایان یافته است");

            string token;
            string refreshToken;
            (token,refreshToken) =  await GetTokens(userRefreshToken.UserId); 

            var result = new RefreshTokenModel
            {
                Token = token,
                RefreshToken = refreshToken,
            };

            return Ok(result);

        }

        private async Task<(string,string)> GetTokens(Guid userId)
        {
            //generate token & refresh token
            var token = encryptionUtility.GenerateNewToken(userId);
            var refreshToken = encryptionUtility.GenerateNewRefreshToken();

            //check UserRefershTokenHistory
            var userRefreshToken = await context.UserRefreshTokens.SingleOrDefaultAsync(q => q.UserId == userId);
            if (userRefreshToken != null)
            {
                //update userRefreshToken  
                userRefreshToken.RefreshToken = refreshToken;
                userRefreshToken.IsValid = true;
                userRefreshToken.CreateDate = DateTime.Now;
            }
            else
            {
                //create userRefreshToken
                var newUserRefreshToken = new UserRefreshToken
                {
                    UserId = userId,
                    RefreshToken = refreshToken,
                    IsValid = true,
                    CreateDate = DateTime.Now,
                };
                await context.AddAsync(newUserRefreshToken);
            }

            //insert userRefreshTokenHistory
            var newUserRefreshTokenHistory = new UserRefreshTokenHistory
            {
                UserId = userId,
                RefreshToken = refreshToken,
                CreateDate = DateTime.Now,
            };
            await context.AddAsync(newUserRefreshTokenHistory);
            await context.SaveChangesAsync();

            return (token,refreshToken);
        }
    }
}