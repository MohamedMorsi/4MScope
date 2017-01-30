using Data.Infrastructure;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{

    public class RoleRepository : BaseRepository<Role>, IRoleRepository
    {
        public RoleRepository(IDbFactory dbFactory)
            : base(dbFactory) { }

        public override Role GetById(int id)
        {
            return DbContext.Roles.Include("RoleRights").Include("RoleRights.Right").SingleOrDefault(r => r.RoleID == id);
        }

        public object getRoleSideMenu(int RoleId)
        {
            return this.DbContext.Features
                .Where(f => f.Rights.Any(r => r.RoleRights.Any(rr => rr.RoleID == RoleId)))
                .Select(f => new
                {
                    f.FeatureName,
                    f.FeatureNameAr,
                    f.MenuIcon,
                    Rights = f.Rights.Where(r =>r.RoleRights.Any(rr => rr.RoleID == RoleId))
                        .Select(right => new { right.RightID, right.RightName, right.RightNameAr,right.RightCode ,right.RightOrder,right.MenuIcon,right.RightURL })
                        .OrderBy(rightOrder => rightOrder.RightOrder)
                });
        }

        public object getFeaturesRights()
        {
            return this.DbContext.Features
                .Include("Rights").ToList();
        }

        public bool canAccess(int role_id, int right_id)
        {
            return this.DbContext.RoleRights.
                    Include("Role").
                    Include("Right").
                    Where(a => a.RoleID == role_id
                       && a.RightID == right_id).ToList().Count > 0;
        }
    }


}
