using Microsoft.AspNetCore.Http;

namespace OnlineStoreWebAPI.Models
{
    public class CustomerModel
    {
        public int Id { get; set; }
        public string CustomerCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public int CityId { get; set; }
        public string CityName { get; set; }
        public string ProvinceName { get; set; }
        public int ProvinceId { get; set; }
        public IFormFile Thumbnail {get; set;}
        public string ThumbnailBase64 {get; set;}
    }
}