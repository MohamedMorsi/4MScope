using Data.Infrastructure;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
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

    }


}
