using Dapper;
using System.Data;
using System.Data.Common;

namespace MCCNew.Infra.DapperHelper;
public interface IDapper:IDisposable
{
    DbConnection GetDbconnection();

    Task<T> GetAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure); 
    T Get<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
    List<T> GetAll<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
    Task<List<T>> GetAllAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
    int Execute(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
    T Insert<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
    Task<int> InsertAsync(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
    T Update<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
    Task<int> UpdateAsync(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
   // T Delete<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
    Task<int> DeleteAsync(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
}

