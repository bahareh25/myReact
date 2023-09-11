using System.Collections.Generic;

namespace OnlineStoreWebAPI.Data
{
    public class Province
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<City> Cities { get; set; }
    }
}