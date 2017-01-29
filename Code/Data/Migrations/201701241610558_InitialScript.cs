namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialScript : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Features",
                c => new
                    {
                        FeatureID = c.Int(nullable: false, identity: true),
                        FeatureName = c.String(),
                        FeatureNameAr = c.String(),
                        CreationDate = c.DateTime(),
                        ModificationDate = c.DateTime(),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedBy = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.FeatureID);
            
            CreateTable(
                "dbo.Rights",
                c => new
                    {
                        RightID = c.Int(nullable: false, identity: true),
                        FeatureID = c.Int(nullable: false),
                        RightCode = c.String(),
                        RightName = c.String(),
                        RightAr = c.String(),
                        CreationDate = c.DateTime(),
                        ModificationDate = c.DateTime(),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedBy = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.RightID)
                .ForeignKey("dbo.Features", t => t.FeatureID, cascadeDelete: true)
                .Index(t => t.FeatureID);
            
            CreateTable(
                "dbo.RoleRights",
                c => new
                    {
                        RoleRightID = c.Int(nullable: false, identity: true),
                        RoleID = c.Int(nullable: false),
                        RightID = c.Int(nullable: false),
                        CreationDate = c.DateTime(),
                        ModificationDate = c.DateTime(),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedBy = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.RoleRightID)
                .ForeignKey("dbo.Rights", t => t.RightID, cascadeDelete: true)
                .ForeignKey("dbo.Roles", t => t.RoleID, cascadeDelete: true)
                .Index(t => t.RoleID)
                .Index(t => t.RightID);
            
            CreateTable(
                "dbo.Roles",
                c => new
                    {
                        RoleID = c.Int(nullable: false, identity: true),
                        RoleName = c.String(),
                        RoleNameAr = c.String(),
                        CreationDate = c.DateTime(),
                        ModificationDate = c.DateTime(),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedBy = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.RoleID);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserID = c.Int(nullable: false, identity: true),
                        RoleID = c.Int(nullable: false),
                        FullName = c.String(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 150),
                        UserEmail = c.String(maxLength: 255),
                        UserPassword = c.String(nullable: false, maxLength: 200),
                        IsActive = c.Boolean(nullable: false),
                        CreationDate = c.DateTime(),
                        ModificationDate = c.DateTime(),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedBy = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.UserID)
                .ForeignKey("dbo.Roles", t => t.RoleID, cascadeDelete: true)
                .Index(t => t.RoleID);
            
            CreateTable(
                "dbo.Stores",
                c => new
                    {
                        StoreID = c.Int(nullable: false, identity: true),
                        StoreCode = c.String(),
                        StoreName = c.String(),
                        StoreNameAr = c.String(),
                        CreationDate = c.DateTime(),
                        ModificationDate = c.DateTime(),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedBy = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.StoreID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Users", "RoleID", "dbo.Roles");
            DropForeignKey("dbo.RoleRights", "RoleID", "dbo.Roles");
            DropForeignKey("dbo.RoleRights", "RightID", "dbo.Rights");
            DropForeignKey("dbo.Rights", "FeatureID", "dbo.Features");
            DropIndex("dbo.Users", new[] { "RoleID" });
            DropIndex("dbo.RoleRights", new[] { "RightID" });
            DropIndex("dbo.RoleRights", new[] { "RoleID" });
            DropIndex("dbo.Rights", new[] { "FeatureID" });
            DropTable("dbo.Stores");
            DropTable("dbo.Users");
            DropTable("dbo.Roles");
            DropTable("dbo.RoleRights");
            DropTable("dbo.Rights");
            DropTable("dbo.Features");
        }
    }
}
