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
    public class CustomerController : BaseController
    {
        private readonly OnlineStoreContext context;
        public CustomerController(OnlineStoreContext context)
        {
            this.context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var customer = await context.Customers.Include(q => q.City)
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
                ProvinceId = customer.City.ProvinceId,
                ThumbnailBase64 = customer.Thumbnail == null ? "" : Convert.ToBase64String(customer.Thumbnail),
            };

            return Ok(model);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(int page = 1, int itemCount = 5)
        {
            //item count = 5
            //page = 2 => 6...10
            //page 12 => skip count = (page - 1) * itemCount
            // skip(5).take(5)

            var result = new OnlineStoreActionResult<List<CustomerModel>>();
            result.Page = page;
            result.SizePerPage = itemCount;
            result.TotalSize = await context.Customers.CountAsync();

            result.Data = await context.Customers.OrderBy(q => q.CustomerCode)
            .Skip((page - 1) * itemCount).Take(itemCount)
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

        [HttpPost]
        public async Task<IActionResult> Post([FromForm]CustomerModel model)
        {
            var customer = new Customer
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Address = model.Address,
                CustomerCode = model.CustomerCode,
                Email = model.Email,
                Mobile = model.Mobile,
                CityId = model.CityId,
                Thumbnail = ConvertToByteArray(model.Thumbnail),
            };

            await context.AddAsync(customer);
            await context.SaveChangesAsync();

            return Ok();
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

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromForm] CustomerModel model, int id)
        {
            var temp = HttpContext.Request.Form.FirstOrDefault(q => q.Key == "thumbnail").Value;
            var customer = await context.Customers.FindAsync(id);
            customer.FirstName = model.FirstName;
            customer.LastName = model.LastName;
            customer.CustomerCode = model.CustomerCode;
            customer.CityId = model.CityId;
            customer.Mobile = model.Mobile;
            customer.Email = model.Email;
            customer.Address = model.Address;
            customer.Thumbnail = ConvertToByteArray(model.Thumbnail);
            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var customer = await context.Customers.FindAsync(id);
            if (customer == null) return BadRequest("مشتری با این مشخصات پیدا نشد");

            context.Remove(customer);
            await context.SaveChangesAsync();

            return Ok();
        }
    }
}