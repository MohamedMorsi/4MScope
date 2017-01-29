using Autofac;
using Autofac.Core;
using Autofac.Integration.WebApi;
using System;
using System.Collections.Generic;
using Data;
using Data.Infrastructure;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Web;
using System.Web.Http;

namespace WebAPI
{
    public class AutofacWebapiConfig
    {
        public static IContainer Container;
        public static void Initialize(HttpConfiguration config)
        {
            Initialize(config, RegisterServices(new ContainerBuilder()));
        }

        public static void Initialize(HttpConfiguration config, IContainer container)
        {
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        private static IContainer RegisterServices(ContainerBuilder builder)
        {
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // EF HomeCinemaContext
            builder.RegisterType<DBEntities>()
                   .As<DbContext>()
                   .InstancePerRequest();

            builder.RegisterType<DbFactory>()
                .As<IDbFactory>()
                .InstancePerRequest();

            builder.RegisterType<UnitOfWork>()
                .As<IUnitOfWork>()
                .InstancePerRequest();

            builder.RegisterGeneric(typeof(BaseRepository<>))
                   .InstancePerRequest();



            // Generic Data Repository Factory
            builder.RegisterType<Data.Repositories.FeatureRepository>()
                .As<Data.Repositories.IFeatureRepository>().InstancePerRequest();

            builder.RegisterType<Data.Repositories.RightRepository>()
    .As<Data.Repositories.IRightRepository>().InstancePerRequest();

            builder.RegisterType<Data.Repositories.RoleRightRepository>()
    .As<Data.Repositories.IRoleRightRepository>().InstancePerRequest();

            builder.RegisterType<Data.Repositories.RoleRepository>()
    .As<Data.Repositories.IRoleRepository>().InstancePerRequest();

            builder.RegisterType<Data.Repositories.StoreRepository>()
    .As<Data.Repositories.IStoreRepository>().InstancePerRequest();

            builder.RegisterType<Data.Repositories.UserRepository>()
    .As<Data.Repositories.IUserRepository>().InstancePerRequest();

            // Services
            builder.RegisterType<Services.FeatureService>()
                .As<Services.IFeatureService>()
                .InstancePerRequest();

            builder.RegisterType<Services.RightService>()
                .As<Services.IRightService>()
                .InstancePerRequest();

            builder.RegisterType<Services.RoleRightService>()
    .As<Services.IRoleRightService>()
    .InstancePerRequest();

            builder.RegisterType<Services.RoleService>()
    .As<Services.IRoleService>()
    .InstancePerRequest();

            builder.RegisterType<Services.StoreService>()
    .As<Services.IStoreService>()
    .InstancePerRequest();

            builder.RegisterType<Services.UserService>()
    .As<Services.IUserService>()
    .InstancePerRequest();

                Container = builder.Build();

            return Container;
        }
    }
}