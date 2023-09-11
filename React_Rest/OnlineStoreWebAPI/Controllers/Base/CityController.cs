using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineStoreWebAPI.Data;
using System.Linq;
using OnlineStoreWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace OnlineStoreWebAPI.Controllers.Base
{
    public class CityController : BaseController
    {
        private readonly OnlineStoreContext context;
        public CityController(OnlineStoreContext context)
        {
            this.context = context;
        }

        [HttpGet("provinces")]
        public async Task<IActionResult> GetProvinces()
        {
            var result = await context.Provinces
            .OrderBy(q => q.Title)
            .Select(q => new KeyValueViewModel {
                Id = q.Id,
                Title = q.Title,
            }).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> Get(int provinceId)
        {
            var result = await context.Cities
            .Where(q => q.ProvinceId == provinceId)
            .OrderBy(q => q.CityName)
            .Select(q => new KeyValueViewModel {
                Id = q.Id,
                Title = q.CityName,
            }).ToListAsync();

            return Ok(result);
        }
    }
}