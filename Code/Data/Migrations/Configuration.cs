namespace Data.Migrations
{
    using Model;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Data.DBEntities>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Data.DBEntities context)
        {
            //  This method will be called after migrating to the latest version.

            context.Roles.Add(new Role
            {
                RoleName = "admin",
                RoleNameAr = "adminar"
            });
            context.Users.Add(new User
            {
                UserEmail = "yasser.mohammd@gmail.com",
                UserName = "yasser.mohamed",
                FullName = "Yasser Mohammed ElSayed",
                IsActive = true,
                UserPassword = "퍋鱶ਜ਼᧛䎇鰀粃잼",
                RoleID = 1
            });

            context.Features.Add(new Feature
            {
                FeatureName = "Security",
                FeatureNameAr = "نظام الحماية",
                MenuIcon = "icon-wrench"
            });
            context.Features.Add(new Feature
            {
                FeatureName = "Control Panel",
                FeatureNameAr = "لوحة التحكم",
                MenuIcon= "icon-settings"
            });
            context.Rights.Add(new Right
            {
                FeatureID = 1,
                RightOrder = 1,
                RightCode = "roles",
                RightName = "Manage Roles",
                RightNameAr = "ادارة الادوار",
                MenuIcon= "icon-docs",
                RightURL= "#/roles.html"

            });
            context.Rights.Add(new Right
            {
                FeatureID = 1,
                RightOrder = 2,
                RightCode="users",
                RightName = "Manage Users",
                RightNameAr = "ادارة المستخدمين",
                MenuIcon = "icon-users",
                RightURL = "#/users.html"
            });
            context.RoleRights.Add(new RoleRight
            {
                RoleID = 1,
                RightID = 1
            });
            context.RoleRights.Add(new RoleRight
            {
                RoleID = 1,
                RightID = 2
            });
            context.Commit();
        }
    }
}
