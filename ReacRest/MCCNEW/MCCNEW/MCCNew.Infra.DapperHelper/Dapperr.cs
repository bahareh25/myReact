using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;

namespace MCCNew.Infra.DapperHelper;
public class Dapperr : IDapper
{
    private readonly IConfiguration _config;
    private string Connectionstring = "DefaultConnection";

    public Dapperr(IConfiguration config)
    {
        _config = config;
    }
    public void Dispose()
    {

    }

    public int Execute(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
    {
        
        throw new NotImplementedException();
    }

    public T Get<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.Text)
    {
      
        using IDbConnection db = new SqlConnection(_config.GetConnectionString(Connectionstring));
        return db.Query<T>(sp, parms, commandType: commandType).FirstOrDefault();
        
    }

    public async Task<T> GetAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
    {
        using IDbConnection db = new SqlConnection(_config.GetConnectionString(Connectionstring));
        var resualt = await db.QueryFirstOrDefaultAsync<T>(sp, parms, commandType: commandType);
        return resualt;
    }
    public List<T> GetAll<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
    {
        using IDbConnection db = new SqlConnection(_config.GetConnectionString(Connectionstring));
        return db.Query<T>(sp, parms, commandType: commandType).ToList();
    }
    public async Task<List<T>> GetAllAsync<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
    {
        using IDbConnection db = new SqlConnection(_config.GetConnectionString(Connectionstring));
        var result = await db.QueryAsync<T>(sp, parms, commandType: commandType);
        return result.ToList();
    }
    public DbConnection GetDbconnection()=>new SqlConnection(_config.GetConnectionString(Connectionstring));
    

    public T Insert<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
    {
        T result;
        using IDbConnection db = new SqlConnection(_config.GetConnectionString(Connectionstring));
        try
        {
            if (db.State == ConnectionState.Closed)
                db.Open();

            using var tran = db.BeginTransaction();
            try
            {
                result = db.Query<T>(sp, parms, commandType: commandType, transaction: tran).FirstOrDefault();
                tran.Commit();
            }
            catch (Exception ex)
            {
                tran.Rollback();
                throw ex;
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            if (db.State == ConnectionState.Open)
                db.Close();
        }

        return result;
    }

   public async Task<int> InsertAsync(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
    {
        int result;
        using IDbConnection db = new SqlConnection(_config.GetConnectionString(Connectionstring));
        try
        {
            if (db.State == ConnectionState.Closed)
                db.Open();

            using var tran = db.BeginTransaction();
            try
            {
              
                result =await db.ExecuteAsync(sp, parms, commandType: commandType, transaction: tran);
                tran.Commit();
            }
            catch (Exception ex)
            {
                tran.Rollback();
                throw ex;
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            if (db.State == ConnectionState.Open)
                db.Close();
        }

        return result;
    }

    public T Update<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
    {
        T result;
        using IDbConnection db = new SqlConnection(_config.GetConnectionString(Connectionstring));
        try
        {
            if (db.State == ConnectionState.Closed)
                db.Open();

            using var tran = db.BeginTransaction();
            try
            {
               
                result = db.Query<T>(sp, parms, commandType: commandType, transaction: tran).FirstOrDefault();
                tran.Commit();
            }
            catch (Exception ex)
            {
                tran.Rollback();
                throw ex;
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            if (db.State == ConnectionState.Open)
                db.Close();
        }

        return result;
    }
    public async Task<int> UpdateAsync(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
    {
       int result;
        using IDbConnection db = new SqlConnection(_config.GetConnectionString(Connectionstring));
        try
        {
            if (db.State == ConnectionState.Closed)
                db.Open();

            using var tran = db.BeginTransaction();
            try
            {
                
                result =await db.ExecuteAsync(sp, parms, commandType: commandType, transaction: tran);
                tran.Commit();
            }
            catch (Exception ex)
            {
                tran.Rollback();
                throw ex;
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            if (db.State == ConnectionState.Open)
                db.Close();
        }

        return result;
    }
    public async Task<int> DeleteAsync(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
    {
        int result;
        using IDbConnection db = new SqlConnection(_config.GetConnectionString(Connectionstring));
        try
        {
            if (db.State == ConnectionState.Closed)
                db.Open();

            using var tran = db.BeginTransaction();
            try
            {

                result = await db.ExecuteAsync(sp, parms, commandType: commandType, transaction: tran);
                tran.Commit();
            }
            catch (Exception ex)
            {
                tran.Rollback();
                throw ex;
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            if (db.State == ConnectionState.Open)
                db.Close();
        }

        return result;
    }
}
