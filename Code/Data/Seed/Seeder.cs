using Model;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public static class Seeder
    {

        public static void SeedAllData(Data.DBEntities context)
        {
            populateRoles(context);
            populateUserData(context);
            populateFeaturesData(context);
            populateRightsData(context);      
        }

        private static void populateRoles(DBEntities context)
        {

            IList<Role> lstRoles = new List<Role>();
            Role AdminObj = new Role() { RoleID = 1, RoleName = "admin", IsSystemRole = true };

            lstRoles.Add(AdminObj);

            foreach (Role std in lstRoles)
            {
                var Roles = context.Roles.FirstOrDefault(p => p.RoleID == std.RoleID);
                if (Roles == null)
                {
                    context.Roles.Add(std);
                }

            }

        }

        private static void populateUserData(Data.DBEntities context)
        {
            IList<User> lstUsers = new List<User>();

            User useSeed = new User();
            useSeed.FullName = " Admin";
            useSeed.UserEmail = "admin@admin.com";
            useSeed.UserName = "admin";
            useSeed.RoleID = 1;
            useSeed.UserPassword = "ꉟ뺾";
            useSeed.IsActive = true;
            useSeed.UserID = 1;
            lstUsers.Add(useSeed);
            foreach (User std in lstUsers)
            {
                var adminUser = context.Users.FirstOrDefault(p => p.UserID == std.UserID);
                if (adminUser == null)
                {
                    context.Users.Add(std);
                }
            }
        }

        private static void populateFeaturesData(Data.DBEntities context)
        {
            IList<Feature> lstFeatures = new List<Feature>();

            context.Features.Add(new Feature
            {
                FeatureID = 1,
                FeatureName = "Security",
                FeatureNameAr = "نظام الحماية",
                MenuIcon = "icon-wrench"
            });
            context.Features.Add(new Feature
            {
                FeatureID = 2,
                FeatureName = "Control Panel",
                FeatureNameAr = "لوحة التحكم",
                MenuIcon = "icon-settings"
            });

            foreach (Feature std in lstFeatures)
            {
                var Feature = context.Features.FirstOrDefault(p => p.FeatureID == std.FeatureID);
                if (Feature == null)
                {
                    context.Features.Add(std);
                }
            }
        }

        private static void populateRightsData(Data.DBEntities context)
        {
            context.Rights.Add(new Right
            {
                RightID = 1,
                FeatureID = 1,
                RightOrder = 1,
                RightCode = "roles",
                RightName = "Manage Roles",
                RightNameAr = "ادارة الادوار",
                MenuIcon = "icon-docs",
                RightURL = "#/pages/roles",
                IsVisible = true

            });
            context.Rights.Add(new Right
            {
                RightID = 2,
                FeatureID = 1,
                RightOrder = 2,
                RightCode = "users",
                RightName = "Manage Users",
                RightNameAr = "ادارة المستخدمين",
                MenuIcon = "icon-users",
                RightURL = "#/pages/users",
                IsVisible = true
            });
            context.RoleRights.Add(new RoleRight
            {
                RoleRightID = 1,
                RoleID = 1,
                RightID = 1
            });
            context.RoleRights.Add(new RoleRight
            {
                RoleRightID = 2,
                RoleID = 1,
                RightID = 2
            });
        }
    }
}
