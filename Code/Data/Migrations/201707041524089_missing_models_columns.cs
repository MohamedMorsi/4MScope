namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class missing_models_columns : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Rights", "FeatureID", "dbo.Features");
            DropForeignKey("dbo.RoleRights", "RightID", "dbo.Rights");
            DropForeignKey("dbo.RoleRights", "RoleID", "dbo.Roles");
            DropForeignKey("dbo.Users", "RoleID", "dbo.Roles");
            AddColumn("dbo.Rights", "IsVisible", c => c.Boolean(nullable: false));
            AddColumn("dbo.Roles", "IsSystemRole", c => c.Boolean());
            AddForeignKey("dbo.Rights", "FeatureID", "dbo.Features", "FeatureID");
            AddForeignKey("dbo.RoleRights", "RightID", "dbo.Rights", "RightID");
            AddForeignKey("dbo.RoleRights", "RoleID", "dbo.Roles", "RoleID");
            AddForeignKey("dbo.Users", "RoleID", "dbo.Roles", "RoleID");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Users", "RoleID", "dbo.Roles");
            DropForeignKey("dbo.RoleRights", "RoleID", "dbo.Roles");
            DropForeignKey("dbo.RoleRights", "RightID", "dbo.Rights");
            DropForeignKey("dbo.Rights", "FeatureID", "dbo.Features");
            DropColumn("dbo.Roles", "IsSystemRole");
            DropColumn("dbo.Rights", "IsVisible");
            AddForeignKey("dbo.Users", "RoleID", "dbo.Roles", "RoleID", cascadeDelete: true);
            AddForeignKey("dbo.RoleRights", "RoleID", "dbo.Roles", "RoleID", cascadeDelete: true);
            AddForeignKey("dbo.RoleRights", "RightID", "dbo.Rights", "RightID", cascadeDelete: true);
            AddForeignKey("dbo.Rights", "FeatureID", "dbo.Features", "FeatureID", cascadeDelete: true);
        }
    }
}
