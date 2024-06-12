using MCCNew.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCCNew.Domain.Contracts.SID
{
   public interface ISIDServices
    {
        Task<List<SIDInfo>> GetSidList();
        List<SIDInfo> GetNEWSidList();
        Task<bool> InsertSID(SIDInfo sIDInfo);
        Task<bool> UpdateSID(SIDInfo sIDInfo);
        Task<bool> UpdateSIDDefMode(int sid, int defmode);
        Task<bool> DeleteSID(int sID);
        bool DeleteParameterId(int pID);
    }
}
