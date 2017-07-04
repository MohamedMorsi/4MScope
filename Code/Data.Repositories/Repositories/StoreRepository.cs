using Data.Infrastructure;
using Model;
using Model.DTO;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{

    public class StoreRepository : BaseRepository<Store>, IStoreRepository
    {
        public StoreRepository(IDbFactory dbFactory)
            : base(dbFactory) { }

        public override IEnumerable<Store> GetAll()
        {
            return DbContext.Stores.Include("Area");
        }
        public void UpdateStoreCode(Store Store)
        {
            SqlParameter Param = new SqlParameter("@StoreID", Store.StoreID);
            DbContext.Database.ExecuteSqlCommand("Sproc_UpdateStoreCode @StoreID", Param);
        }

        public Model.DTO.PagedResult<Store> GetAll(FilterModel<Store> FilterObject)
        {
            Model.DTO.PagedResult<Store> StoreList = new Model.DTO.PagedResult<Store>();
            Expression<Func<Store, bool>> SearchCriteria = s =>
            (
            (s.StoreName.Contains(FilterObject.SearchObject.StoreName) || string.IsNullOrEmpty(FilterObject.SearchObject.StoreName))
            );

            StoreList = this.GetAll(FilterObject.PageNumber, FilterObject.PageSize, FilterObject.Includes, SearchCriteria, FilterObject.SortBy, FilterObject.SortDirection);
            return StoreList;
        }

    }


}
