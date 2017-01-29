using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Enums
{
    public class TransactionTypesEnum
    {
        public static int OpeningBalance = 1;
        public static int PurchaseOrder = 2;
        public static int IssueOrder = 3;
        public static int SupplierReturnOrder = 4;
        public static int StockCount = 5;
        public static int SupplierPayment = 6;
        public static int SupplierOpeningBalance = 7;
    }
}
