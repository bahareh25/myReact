using Dapper;
using MCCNew.Domain.Contracts.SID;
using MCCNew.Domain.Core;
using MCCNew.Infra.DapperHelper;
using System.Data;
using System.Threading.Tasks;

namespace MCCNEW.Infra.DataLayer;
public class SIDRepository : ISIDRepository
{
    private readonly IDapper _dapper;
    //............ Stored Procedures
    private const string SP_GET_SID_ALL = "SP_GET_SID_ALL";
    private const string SP_INSERT_SID = "SP_INSERT_SID";
    private const string SP_UPDATE_SID = "SP_UPDATE_SID";
    private const string SP_DELETE_SID = "SP_DELETE_SId";
    private const string SP_DELETE_PID = "SP_DELETE_PId";
    private const string SP_GET_PID_bySID2 = "SP_GET_PID_bySID2";
    private const string SP_GET_NEWPID_bySID = "SP_GET_NewPID_bySID";
    private const string SP_Get_SIDNAME_Dictinict = "SP_Get_SIDNAME_Dictinict";
    private const string SP_Get_NEWSIDNAME_Dictinict = "SP_Get_NEWSIDNAME_Dictinict";
    private const string SP_Get_NEWSIDNAME_Dictinict_todisplay = "SP_Get_NEWSIDNAME_Dictinict_todisplay";
    private const string SP_Get_Param_Dictinict_BySid = "SP_Get_Param_Dictinict";
    private const string SP_GET_PID_ALL = "SP_GET_PID_ALL";
    private const string SP_GET_NewSID_ALL = "SP_GET_NewSID_ALL";
    private const string SP_UPDATE_SID_DefMode = "SP_UPDATE_SID_DefMode";
    public SIDRepository(IDapper dapper)
    {
        _dapper = dapper;
    }

    public bool DeleteParameterId(int pID)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteSID(int sID)
    {
        var dbparams = new DynamicParameters();
        dbparams.Add("SID", sID, DbType.Int32);
        var result = await _dapper.DeleteAsync(SP_DELETE_SID, dbparams, CommandType.StoredProcedure);
        if (result > 0)
            return true;
        else
            return false;
    }

    public List<SIDInfo> GetNEWSidList()
    {
        throw new NotImplementedException();
    }

    public async Task<List<SIDInfo>> GetSidList()
    {
        var resualt= await _dapper.GetAllAsync<SIDInfo>(SP_GET_SID_ALL, null, CommandType.StoredProcedure);
       
        return resualt.ToList();

    }

    //public bool InsertPID(PIDInfo pIDInfo)
    //{
    //    throw new NotImplementedException();
    //}

    public async Task<bool> InsertSID(SIDInfo sIDInfo)
    {
        //sIDInfo.Multiplicand,sIDInfo.Totalfact,sIDInfo.PID,sIDInfo.Defmode);
        var dbparams = new DynamicParameters();
        dbparams.Add("SID", sIDInfo.SId, DbType.Int32);
        dbparams.Add("SIDName", sIDInfo.Sidname, DbType.String, size: sIDInfo.Sidname.Length);
        dbparams.Add("Name",sIDInfo.Name, DbType.String, size:sIDInfo.Name.Length);
        dbparams.Add("minValue",sIDInfo.MinValue, DbType.Single);
        dbparams.Add("maxValue", sIDInfo.MinValue, DbType.Single);
        dbparams.Add("ValueType",sIDInfo.PTCode, DbType.Int32);
        dbparams.Add("PFormatCode", sIDInfo.PTFormat, DbType.Int32);
        dbparams.Add("Multiplicand", sIDInfo.Multiplicand, DbType.Single);
        dbparams.Add("TotalFactor", sIDInfo.totalfact, DbType.Single);
        dbparams.Add("PID", sIDInfo.PID, DbType.Int32);
        dbparams.Add("Defmode", sIDInfo.Defmode, DbType.Int32);
        // int result = _dapper.InsertAsync(SP_INSERT_SID, dbparams, CommandType.StoredProcedure).Result;
        var result =await _dapper.InsertAsync(SP_INSERT_SID, dbparams, CommandType.StoredProcedure);
        if (result > 0)
            return true;
        else
            return false;
    }

    public async Task<bool> UpdateSIDDefMode(int sid, int defmode)
    {
        var dbparams = new DynamicParameters();
        dbparams.Add("Defmode",defmode, DbType.Int32);
        dbparams.Add("SID", sid, DbType.Int32);
        var result = await _dapper.UpdateAsync(SP_UPDATE_SID_DefMode, dbparams, CommandType.StoredProcedure);
        if (result > 0)
            return true;
        else
            return false;
    }

    public async Task<bool> UpdateSID(SIDInfo sIDInfo)
    {
        var dbparams = new DynamicParameters();
        dbparams.Add("ParameterId", sIDInfo.ParameterId, DbType.Int32);
        dbparams.Add("SID", sIDInfo.SId, DbType.Int32);
        dbparams.Add("SIDName", sIDInfo.Sidname, DbType.String, size: sIDInfo.Sidname.Length);
        dbparams.Add("Name", sIDInfo.Name, DbType.String, size: sIDInfo.Name.Length);
        dbparams.Add("minValue", sIDInfo.MinValue, DbType.Single);
        dbparams.Add("maxValue", sIDInfo.MinValue, DbType.Single);
        dbparams.Add("ValueType", sIDInfo.PTCode, DbType.Int32);
        dbparams.Add("PFormatCode", sIDInfo.PTFormat, DbType.Int32);
        dbparams.Add("Multiplicand", sIDInfo.Multiplicand, DbType.Single);
        dbparams.Add("TotalFactor", sIDInfo.totalfact, DbType.Single);
        dbparams.Add("PID", sIDInfo.PID, DbType.Int32);
        dbparams.Add("Defmode", sIDInfo.Defmode, DbType.Int32);
        var result =await _dapper.UpdateAsync(SP_UPDATE_SID, dbparams, CommandType.StoredProcedure);
        if (result > 0)
            return true;
        else
            return false;
    }
}
