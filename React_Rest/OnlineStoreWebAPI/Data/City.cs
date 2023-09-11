namespace OnlineStoreWebAPI.Data
{
    public class City
    {
        public int Id { get; set; }
        public string CityName { get; set; }
        public int ProvinceId { get; set; }
        public virtual Province Province { get; set; }
        
    }
}