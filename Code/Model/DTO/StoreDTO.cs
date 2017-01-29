using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.DTO
{
    public class StoreItemsDTO
    {
        public int ProductID { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public string BarCode { get; set; }
        public int CategoryID { get; set; }
        public string CategoryCode { get; set; }
        public string CategoryName { get; set; }
        public int MeasurementUnitID { get; set; }
        public string MeasurementUnitName { get; set; }
        public int? StoreID { get; set; }
        public string StoreCode { get; set; }
        public string StoreName { get; set; }
        public double Balance { get; set; }
    }
}
