namespace OnlineStoreWebAPI.Models
{
    public class OnlineStoreActionResult<T>
    {
        public T Data { get; set; }
        public int Page { get; set; } = 1;
        public int TotalSize {get; set;}
        public int SizePerPage {get; set;} = 2;
        
        
        
    }
}