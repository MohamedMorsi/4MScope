namespace Data.Migrations
{
    using Model;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Migrations.Model;
    using System.Data.Entity.Migrations.Sql;
    using System.Data.Entity.SqlServer;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Data.DBEntities>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            SetSqlGenerator("System.Data.SqlClient", new SqlMigrator());
        }

        protected override void Seed(Data.DBEntities context)
        {
            //  This method will be called after migrating to the latest version.
            Seeder.SeedAllData(context);
            context.Commit();
        }

        private class SqlMigrator : SqlServerMigrationSqlGenerator
        {
            public override IEnumerable<MigrationStatement> Generate(IEnumerable<MigrationOperation> migrationOperations, string providerManifestToken)
            {
                yield return new MigrationStatement { Sql = "SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED" };
                foreach (var statement in base.Generate(migrationOperations, providerManifestToken))
                    yield return statement;
            }

        }
    }
}
