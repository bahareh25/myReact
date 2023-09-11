namespace OnlineStoreWebAPI.Models
{
    public class AuthenticateModel
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
    }
}