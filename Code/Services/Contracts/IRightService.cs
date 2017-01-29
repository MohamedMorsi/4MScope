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

    public interface IRightService
    {
        Right GetRight(int id);
        void CreateRight(Right Right);
        void SaveRight();
    }
}
