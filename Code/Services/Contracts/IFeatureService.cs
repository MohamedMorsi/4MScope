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

    public interface IFeatureService
    {
        Feature GetFeature(int id);
        void CreateFeature(Feature Feature);
        void SaveFeature();
    }
}
