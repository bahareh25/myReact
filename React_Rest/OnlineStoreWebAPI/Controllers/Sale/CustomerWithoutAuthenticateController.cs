using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineStoreWebAPI.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using OnlineStoreWebAPI.Models;
using System.Collections.Generic;
using System.IO;
using System;
using Microsoft.AspNetCore.Http;

namespace OnlineStoreWebAPI.Controllers.Sale
{
    public class CustomerWithoutAuthenticateController : Controller
    {
        private readonly OnlineStoreContext context;
        public CustomerWithoutAuthenticateController(OnlineStoreContext context)
        {
            this.context = context;
        }

        [HttpGet("Customers/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var customer = await context.Customers.Include(q => q.City)
            .ThenInclude(q => q.Province)
            .SingleOrDefaultAsync(q => q.Id == id);
            var model = new CustomerModel
            {
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Id = customer.Id,
                CustomerCode = customer.CustomerCode,
                Mobile = customer.Mobile,
                Address = customer.Address,
                Email = customer.Email,
                CityId = customer.CityId,
                CityName = customer.City.CityName,
                ProvinceId = customer.City.ProvinceId,
                ProvinceName = customer.City.Province.Title,
                ThumbnailBase64 = customer.Thumbnail == null ? "" : Convert.ToBase64String(customer.Thumbnail),
            };

            return Ok(model);
        }

        [HttpGet("Customers")]
        public async Task<IActionResult> GetAll()
        {
            var result = new OnlineStoreActionResult<List<CustomerModel>>();
            result.Data = await context.Customers.OrderBy(q => q.CustomerCode)
            .Select(q => new CustomerModel
            {
                FirstName = q.FirstName,
                LastName = q.LastName,
                CustomerCode = q.CustomerCode,
                Id = q.Id,
                Mobile = q.Mobile,
                CityName = q.City.CityName,
                CityId = q.CityId,
                ProvinceName = q.City.Province.Title,
                ThumbnailBase64 = q.Thumbnail == null ? "" : Convert.ToBase64String(q.Thumbnail),
            }).AsNoTracking().ToListAsync();

            return Ok(result);

        }
        private byte[] ConvertToByteArray(IFormFile file)
        {
            if (file == null) return null;
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                byte[] fileBytes = ms.ToArray();
                return fileBytes;
            }
        }

        private string ConvertToBase64(IFormFile file)
        {
            if (file == null) return "";

            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                byte[] fileBytes = ms.ToArray();
                string fileBase64 = Convert.ToBase64String(fileBytes);
                return fileBase64;
            }
        }
    }
}