namespace MCCNew.Domain.Contracts.Common;
 public interface IBaseRepository<TEntity>
{
    List<TEntity> GetAll();
    TEntity Get(int id); 
    bool? Add(TEntity entity);
    bool? Update(TEntity entity);
    bool? Delete(int id);
}

