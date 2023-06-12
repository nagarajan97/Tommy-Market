using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication16.Models
{
    public class Admin
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Key]
        public string Email { get; set; }
        public long Number { get; set; }
        public string Pin { get; set; }
        public int Code { get; set; }
        public string Password { get; set; }
    }
}