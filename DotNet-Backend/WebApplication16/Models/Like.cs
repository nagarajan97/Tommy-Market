using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication16.Models
{
    public class Like
    {
        public int ID { get; set; }
        public string Email { get; set; }
        public int ProductID { get; set; }
        public int Wish { get; set; }
    }
}