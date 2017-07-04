using Data.Infrastructure;
using Model;
using Model.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{

    public interface IUserRepository : IRepository<User>
    {
        User UserLogin(string username, string password);

        Model.DTO.PagedResult<User> GetAll(FilterModel<User> FilterObject);
    }


}
