using MCCNew.Domain.Contracts.Common;
using MCCNew.Infra.DapperHelper;

namespace MCCNew.Infra.DataLayer.Common
{
    public abstract class BaseRepository<TEntity> : IBaseRepository<TEntity>
    {
        private readonly IDapper _dapper;
        public BaseRepository(IDapper dapper)
        {
            _dapper=dapper;
        }

        public bool? Add(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public bool? Delete(int id)
        {
            throw new NotImplementedException();
        }

        public TEntity Get(int id)
        {
            throw new NotImplementedException();
        }

        public List<TEntity> GetAll()
        {
            throw new NotImplementedException();
        }

        public bool? Update(TEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
