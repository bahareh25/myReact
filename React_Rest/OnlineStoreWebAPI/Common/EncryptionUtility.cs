using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OnlineStoreWebAPI.Data;

namespace OnlineStoreWebAPI.Common
{
    public class EncryptionUtility
    {
        private readonly IConfiguration configuration;

        public EncryptionUtility(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public string HashSHA256(string input)
        {
            using (var sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

        public string HashPasswordWithSalt(string password, string salt)
        {
            return HashSHA256(password + salt);
        }

        public string GenerateNewToken(Guid userGuid)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(configuration.GetValue<string>("TokenKey"));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                        new Claim("userGuid", userGuid.ToString()),

                }),

                Expires = DateTime.UtcNow.AddMinutes(configuration.GetValue<int>("TokenTimeout")),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string GenerateNewRefreshToken()
        {
            return Guid.NewGuid().ToString();
        }
    }
}