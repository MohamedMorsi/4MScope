﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public partial class Right : BaseModel
    {
        public int RightID { get; set; }
        public int FeatureID { get; set; }
        public string RightCode { get; set; }
        public string RightName { get; set; }
        public string RightAr { get; set; }

        public Feature Feature { get; set; }
        public List<RoleRight> RoleRights { get; set; }

        public Right()
        {
            RoleRights = new List<RoleRight>();
        }
    }
}
