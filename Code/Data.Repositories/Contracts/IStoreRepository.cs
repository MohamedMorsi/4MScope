using Data.Infrastructure;
using Model;
using Model.DTO;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{

    public interface IStoreRepository : IRepository<Store>
    {
        void UpdateStoreCode(Store Store);

        Model.DTO.PagedResult<Store> GetAll(FilterModel<Store> FilterObject);
    }



}
