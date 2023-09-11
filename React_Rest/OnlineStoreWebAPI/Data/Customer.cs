namespace OnlineStoreWebAPI.Data
{
    public class Customer
    {
        public int Id { get; set; }
        public string CustomerCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public int CityId { get; set; }
        public byte[] Thumbnail {get; set;}
        public virtual City City { get; set; }
    }
}