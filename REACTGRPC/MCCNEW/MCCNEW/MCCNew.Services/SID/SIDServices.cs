using MCCNew.Domain.Contracts.SID;
using MCCNew.Domain.Core;
using MCCNEW.Infra.DataLayer;
using Microsoft.Extensions.Logging;

namespace MCCNew.Services
{
    public class SIDServices : ISIDServices
    {
        private readonly ILogger<SIDServices> _logger;
        private readonly ISIDRepository _sidrepository;
        public SIDServices(ISIDRepository sIDRepository,ILogger<SIDServices> logger) 
        { 
            _logger = logger;
            _sidrepository = sIDRepository;
        }
        public bool DeleteParameterId(int pID)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteSID(int sID)
        {
            throw new NotImplementedException();
        }

        public List<SIDInfo> GetNEWSidList()
        {
            throw new NotImplementedException();
        }

        public async Task<List<SIDInfo>> GetSidList()
        {
           return await _sidrepository.GetSidList();
            
        }

        public async Task<bool> InsertSID(SIDInfo sIDInfo)
        {
           var result=await _sidrepository.InsertSID(sIDInfo);
           _logger.LogDebug("SId Created {StudentId}", result);
            return result;
        }

        public async Task<bool> UpdateSID(SIDInfo sIDInfo)
        {
            var result= await _sidrepository.UpdateSID(sIDInfo);
            _logger.LogDebug("SId update {sid_Id}", result);
            return result;
        }

        public async Task<bool> UpdateSIDDefMode(int sid, int defmode)
        {
            var result= await _sidrepository.UpdateSIDDefMode(sid,defmode);
            return result;
        }
    }
}