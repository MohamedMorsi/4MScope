using Data.Infrastructure;
using Data.Repositories;
using Model;
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
        Store GetStore(int id);
        void CreateStore(Store Store);
        void UpdateStore(Store Store);
        void DeleteStore(Store Store);
        void UpdateStoreCode(Store Store);
        void SaveStore();
    }
}
