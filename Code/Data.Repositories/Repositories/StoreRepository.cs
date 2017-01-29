using Data.Infrastructure;
using Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
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

    }


}
