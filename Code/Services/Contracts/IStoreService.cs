using Data.Infrastructure;
using Data.Repositories;
using Model;
using Model.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{

    public interface IStoreService
    {
        List<Store> GetAll();
        PagedResult<Store> GetAll(int PageNumber, int PageSize, string SortBy, string SortDirection);
        Store GetStore(int id);
        void CreateStore(Store Store);
        void UpdateStore(Store Store);
        void DeleteStore(Store Store);
        void UpdateStoreCode(Store Store);
        void SaveStore();

        PagedResult<Store> GetAll(FilterModel<Store> FilterObject);
    }
}
