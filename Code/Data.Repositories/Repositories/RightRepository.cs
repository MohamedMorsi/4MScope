using Data.Infrastructure;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{

    public class RightRepository : BaseRepository<Right>, IRightRepository
    {
        public RightRepository(IDbFactory dbFactory)
            : base(dbFactory) { }


    }


}
