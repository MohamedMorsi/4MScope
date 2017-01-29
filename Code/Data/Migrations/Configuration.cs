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
            context.Commit();
        }
    }
}
