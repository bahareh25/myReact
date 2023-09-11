using System;

namespace OnlineStoreWebAPI.Data
{
    public class UserRefreshToken
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        public string RefreshToken { get; set; }
        public DateTime CreateDate { get; set; }
        public bool IsValid { get; set; }
        
    }
}