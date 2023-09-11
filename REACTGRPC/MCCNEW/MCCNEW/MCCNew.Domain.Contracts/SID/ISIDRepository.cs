using MCCNew.Domain.Contracts.Common;
using MCCNew.Domain.Core;
namespace MCCNew.Domain.Contracts.SID;
public interface ISIDRepository
{
    // List<SIDInfo> GetSidList();
    Task<List<SIDInfo>> GetSidList();
    //List<SidnameInfo> GetSidNameList();
    //List<ParamNameInfo> GetParamNameList();
    //List<PIDInfo> GetPidList();
    List<SIDInfo> GetNEWSidList();
    //List<SidnameInfo> GetNEWSidNameList();
    //List<SidnameInfo> GetNEWSidNameList_todisplay();
    //List<PIDInfo> GetNEWPidList(int sid);
    // bool InsertSID(SIDInfo sIDInfo);
    Task<bool> InsertSID(SIDInfo sIDInfo);
    // bool InsertPID(PIDInfo pIDInfo);
    Task<bool> UpdateSID(SIDInfo sIDInfo);
    // bool UpdateSID(SIDInfo sIDInfo);
    Task<bool> UpdateSIDDefMode(int sid, int defmode);
   // bool UpdateSIDDefMode(int sid, int defmode);
   // bool DeleteSID(int sID);
    Task<bool> DeleteSID(int sID);
    bool DeleteParameterId(int pID);
}

