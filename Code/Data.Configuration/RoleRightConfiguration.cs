﻿using Model;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Configuration
{
    public class RoleRightConfiguration : EntityTypeConfiguration<RoleRight>
    {
        public RoleRightConfiguration()
        {
            ToTable("RoleRights");
        }
    }
}
