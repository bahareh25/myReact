using System;
using System.ComponentModel.DataAnnotations;

namespace OnlineStoreWebAPI.Data
{
    public class User
    {
        public Guid Id { get; set; }
        [Required, MaxLength(32)]
        public string UserName { get; set; }
        [Required, MaxLength(128)]
        public string Password { get; set; }
        [Required, MaxLength(64)]
        public string PasswordSalt { get; set; }
        [Required, MaxLength(64)]
        public string FirstName { get; set; }
        [Required, MaxLength(64)]
        public string LastName { get; set; }
        public bool IsActive { get; set; }
    }
}