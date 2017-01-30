namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initialScript_roles_rights : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Features", "MenuIcon", c => c.String());
            AddColumn("dbo.Rights", "RightOrder", c => c.Int(nullable: false));
            AddColumn("dbo.Rights", "RightNameAr", c => c.String());
            AddColumn("dbo.Rights", "MenuIcon", c => c.String());
            AddColumn("dbo.Rights", "RightURL", c => c.String());
            DropColumn("dbo.Rights", "RightAr");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Rights", "RightAr", c => c.String());
            DropColumn("dbo.Rights", "RightURL");
            DropColumn("dbo.Rights", "MenuIcon");
            DropColumn("dbo.Rights", "RightNameAr");
            DropColumn("dbo.Rights", "RightOrder");
            DropColumn("dbo.Features", "MenuIcon");
        }
    }
}
