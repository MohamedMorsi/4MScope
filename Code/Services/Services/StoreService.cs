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

    public class StoreService : IStoreService
    {
        private readonly IStoreRepository StoreRepository;
        private readonly IUnitOfWork unitOfWork;

        public StoreService(IStoreRepository StoreRepository, IUnitOfWork unitOfWork)
        {
            this.StoreRepository = StoreRepository;
            this.unitOfWork = unitOfWork;
        }

        #region IApplicationService Members

        public List<Store> GetAll()
        {
            List<Store> Stores = StoreRepository.GetAll().ToList();
            return Stores;
        }
        public List<Store> GetAll(int PageNumber, int PageSize, string SortBy = "")
        {
            List<Store> Stores = StoreRepository.GetAll(PageNumber,PageSize,SortBy).ToList();
            return Stores;
        }
        public Store GetStore(int id)
        {
            var Store = StoreRepository.GetById(id);
            return Store;
        }

        public void CreateStore(Store Store)
        {
            StoreRepository.Add(Store);
        }

        public void UpdateStore(Store Store)
        {
            StoreRepository.Update(Store.StoreID,Store);
        }

        public void DeleteStore(Store Store)
        {
            StoreRepository.Delete(Store);
        }

        public void UpdateStoreCode(Store Store)
        {
            StoreRepository.UpdateStoreCode(Store);
        }

        public void SaveStore()
        {
            unitOfWork.Commit();
        }

   

        #endregion
    }
}
