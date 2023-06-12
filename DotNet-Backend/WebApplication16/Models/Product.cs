using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApplication16.Models
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public int Price { get; set; }
        public float Discount { get; set; }
        public string Description { get; set; }
        public string DetailInfo { get; set; }
        public bool QualityCheck { get; set; }
        public bool OffersAviable { get; set; }
        public string DeliveryType { get; set; }
        public int CategoryID { get; set; }
    }
}