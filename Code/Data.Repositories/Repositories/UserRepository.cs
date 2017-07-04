using Data.Infrastructure;
using Model;
using Model.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{


    public class UserRepository: BaseRepository<User>, IUserRepository
    {
        public UserRepository(IDbFactory dbFactory)
            : base(dbFactory) { }

        public override IEnumerable<User> GetAll()
        {
           return DbContext.Users.Include("Role");
        }

        public User UserLogin(string username, string password)
        {
            return this.DbContext.Users.Where(u => u.UserName == username.ToLower()).Where(c => c.UserPassword == password).FirstOrDefault();
        }

        public Model.DTO.PagedResult<User> GetAll(FilterModel<User> FilterObject)
        {
            Model.DTO.PagedResult<User> UserList = new Model.DTO.PagedResult<User>();
            Expression<Func<User, bool>> SearchCriteria = a => (

            (a.UserName.Contains(FilterObject.SearchObject.UserName) || string.IsNullOrEmpty(FilterObject.SearchObject.UserName))
            &&
            (a.FullName.Contains(FilterObject.SearchObject.FullName) || string.IsNullOrEmpty(FilterObject.SearchObject.FullName))
            &&
            (a.RoleID == FilterObject.SearchObject.RoleID || FilterObject.SearchObject.RoleID == 0)

            );
            UserList = this.GetAll(FilterObject.PageNumber, FilterObject.PageSize, FilterObject.Includes, SearchCriteria, FilterObject.SortBy, FilterObject.SortDirection);
            return UserList;
        }

    }


}
