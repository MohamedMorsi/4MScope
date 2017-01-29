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

    public class FeatureService : IFeatureService
    {
        private readonly IFeatureRepository FeatureRepository;
        private readonly IUnitOfWork unitOfWork;

        public FeatureService(IFeatureRepository FeatureRepository, IUnitOfWork unitOfWork)
        {
            this.FeatureRepository = FeatureRepository;
            this.unitOfWork = unitOfWork;
        }

        #region IApplicationService Members


        public Feature GetFeature(int id)
        {
            var Feature = FeatureRepository.GetById(id);
            return Feature;
        }

        public void CreateFeature(Feature Feature)
        {
            FeatureRepository.Add(Feature);
        }

        public void SaveFeature()
        {
            unitOfWork.Commit();
        }

   

        #endregion
    }
}
