using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication16.Models;
using System.Web.Http.Cors;


namespace WebApplication16.Controllers
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("Api/Market")]
    public class MovieApiController : ApiController
    {
       
        Bind db = new Bind();

        [Route("SignUp")]
        [HttpPost]
        public bool SignUp(User u)
        {
            try
            {
                db.Users.Add(u);
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        [Route("Login")]
        [HttpPost]
        public User Login(User u)
        {
                var non = new User() { Email = "-1" };
            try
            {
                var obj = db.Users.Where(x => x.Email == u.Email).ToList().FirstOrDefault();
                if (obj != null)
                    return obj.Password == u.Password ? obj : non;
                else
                    return non;
            }
            catch
            {
                return non;
            }
        }

        [Route("Forgot")]
        [HttpPost]
        public bool Forgot(User u)
        {
            try
            {
                var obj = db.Users.Where(x => x.Email == u.Email).ToList().FirstOrDefault();
                return obj.Pin == u.Pin ? true : false;
            }
            catch
            {
                return false;
            }
        }

        [Route("Resetpass")]
        [HttpPost]
        public User Resetpass(User u)
        {

                var obj = db.Users.Where(x => x.Email == u.Email).ToList().FirstOrDefault();
                obj.Password = u.Password;
                db.SaveChanges();
                return obj;
        }

        [Route("Reset")]
        [HttpPost]
        public User Reset(User u)
        {
                var obj = db.Users.Where(x => x.Email == u.Email).ToList().FirstOrDefault();
                obj.FirstName = u.FirstName;
                obj.LastName = u.LastName;
                obj.Number = u.Number;
                db.SaveChanges();
                return obj;
        }

        [Route("AdminSignUp")]
        [HttpPost]
        public bool AdminSignUp(Admin a)
        {
            try
            {
                var obj = db.Roles.Where(x => x.Code == a.Code).ToList().FirstOrDefault();
                if (obj != null)
                {
                    db.Admins.Add(a);
                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
                
            }
            catch
            {
                return false;
            }
        }

        [Route("AdminLogin")]
        [HttpPost]
        public Admin AdminLogin(Admin a)
        {
            var non = new Admin() { Email = "-1" };
            try
            {
                var obj = db.Admins.Where(x => x.Email == a.Email).ToList().FirstOrDefault();
                if (obj != null)
                    return obj.Password == a.Password ? obj : non;
                else
                    return non;
            }
            catch
            {
                return non;
            }
        }

        [Route("AdminForgot")]
        [HttpPost]
        public bool AdminForgot(Admin a)
        {
            try
            {
                var obj = db.Admins.Where(x => x.Email == a.Email).ToList().FirstOrDefault();
                return obj.Pin == a.Pin ? true : false;
            }
            catch
            {
                return false;
            }
        }

        [Route("AdminResetpass")]
        [HttpPost]
        public Admin AdminResetpass(Admin a)
        {

            var obj = db.Admins.Where(x => x.Email == a.Email).ToList().FirstOrDefault();
            obj.Password = a.Password;
            db.SaveChanges();
            return obj;
        }
        [Route("AdminReset")]
        [HttpPost]
        public Admin AdminReset(Admin a)
        {
            var obj = db.Admins.Where(x => x.Email == a.Email).ToList().FirstOrDefault();
            obj.FirstName = a.FirstName;
            obj.LastName = a.LastName;
            obj.Number = a.Number;
            db.SaveChanges();
            return obj;
        }

        [Route("FeedBack")]
        [HttpPost]
        public bool FeedBack(FeedBack f)
        {
            try
            {
                db.FeedBacks.Add(f);
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        [Route("ContactUs")]
        [HttpPost]
        public bool ContactUs(ContactUs c)
        {
            try
            {
                db.ContactUs.Add(c);
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
        
        [Route("UpdateCustomer")]
        [HttpPost]
        public bool UpdateCustomer(User u)
        {
            try
            {
                var obj = db.Users.Where(x => x.Email == u.Email).ToList().FirstOrDefault();
                if (obj != null)
                {
                    obj.FirstName = u.FirstName;
                    obj.LastName = u.LastName;
                    obj.Number = u.Number;
                    obj.Pin = u.Pin;
                    obj.Password = u.Password;
                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch
            {
                    return false;
            }
        }

        [Route("GetCustomerDetails")]
        [HttpGet]
        public User GetCustomerDetails(string id)
        {
            var non = new User() { Email = "-1" };
            try
            {
                var obj = db.Users.Where(x => x.Email == id).ToList().FirstOrDefault();
                if (obj != null)
                    return obj;
                else
                    return non;
            }
            catch
            {
                return non;
            }
        }

        [Route("DeleteCustomer")]
        [HttpDelete]
        public bool DeleteCustomer(string id)
        {

            try
            {
                var obj = db.Users.Where(x => x.Email == id).ToList().FirstOrDefault();
                if (obj != null)
                {
                    db.Users.Remove(obj);
                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch
            {
                return false;
            }
        }

        [Route("FeedDetails")]
        [HttpGet]
        public List<FeedBack> FeedDetails()
        {
            List<FeedBack> feeds = (from f in db.FeedBacks orderby f.UserName select f).ToList();
            return feeds;
        }

        [Route("DeleteFeed")]
        [HttpDelete]
        public void DeleteFeed(int id)
        {
                var obj = db.FeedBacks.Where(x => x.ID == id).ToList().FirstOrDefault();
                db.FeedBacks.Remove(obj);
                db.SaveChanges();
        }

        [Route("SearchFeed")]
        [HttpGet]
        public List<FeedBack> SearchFeed(string id)
        {
            List<FeedBack> feeds = (from f in db.FeedBacks where f.UserID.Contains(id) orderby f.UserName select f).ToList();
            return feeds;
        }

        [Route("CustomersDetails")]
        [HttpGet]
        public List<User> CustomersDetails()
        {
            List<User> Customers = (from f in db.Users orderby f.FirstName select f).ToList();
            return Customers;
        }

        [Route("AdminDeleteCustomer")]
        [HttpDelete]
        public void AdminDeleteCustomer(string id)
        {
            var obj = db.Users.Where(x => x.Email == id).ToList().FirstOrDefault();
            db.Users.Remove(obj);
            db.SaveChanges();
        }

        [Route("SearchCustomer")]
        [HttpGet]
        public List<User> SearchCustomer(string id)
        {
            List<User> Customers = (from f in db.Users where f.Email.Contains(id) orderby f.FirstName select f).ToList();
            return Customers;
        }

        [Route("GetCategoryDetails")]
        [HttpGet]
        public Category GetCategoryDetails(int id)
        {
            var non = new Category() { CategoryID = -1 };
            try
            {
                var obj = db.Categories.Where(x => x.CategoryID == id).ToList().FirstOrDefault();
                if (obj != null)
                    return obj;
                else
                    return non;
            }
            catch
            {
                return non;
            }
        }

        [Route("AddCategory")]
        [HttpPost]
        public bool AddCategory(Category c)
        {
            try
            {
                var obj = db.Categories.Where(x => x.CategoryID == c.CategoryID).ToList().FirstOrDefault();
                if (obj == null)
                {
                    db.Categories.Add(c);
                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch
            {
                return false;
            }

        }

        [Route("UpdateCategory")]
        [HttpPost]
        public bool UpdateCategory(Category c)
        {
            try
            {
                var obj = db.Categories.Where(x => x.CategoryID == c.CategoryID).ToList().FirstOrDefault();
                if (obj != null)
                {
                    obj.CategoryID = c.CategoryID;
                    obj.CategoryName = c.CategoryName;
                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch
            {
                return false;
            }
        }
        
        [Route("DeleteCategory")]
        [HttpDelete]
        public bool DeleteCategory(int id)
        {

            try
            {
                var obj = db.Categories.Where(x => x.CategoryID == id).ToList().FirstOrDefault();
                if (obj != null)
                {
                    db.Categories.Remove(obj);
                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch
            {
                return false;
            }
        }

        [Route("CheckCategory")]
        [HttpGet]
        public bool CheckCategory(int id)
        {
            try
            {
                var obj = db.Categories.Where(x => x.CategoryID == id).ToList().FirstOrDefault();
                if (obj == null)
                    return true;
                else
                    return false;
            }
            catch
            {
                return false;
            }

        }

        [Route("AddProduct")]
        [HttpPost]
        public bool AddProduct(Product p)
        {
            try
            {
                var obj = db.Products.Where(x => x.ProductID == p.ProductID).ToList().FirstOrDefault();
                if (obj == null)
                {
                    db.Products.Add(p);
                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch
            {
                return false;
            }
        }

        [Route("GetProductDetails")]
        [HttpGet]
        public Product GetProductDetails(int id)
        {
            var non = new Product() { ProductID = -1 };
            try
            {
                var obj = db.Products.Where(x => x.ProductID == id).ToList().FirstOrDefault();
                if (obj != null)
                    return obj;
                else
                    return non;
            }
            catch
            {
                return non;
            }
        }

        [Route("UpdateProduct")]
        [HttpPost]
        public bool UpdateProduct(Product p)
        {
            try
            {
                var obj = db.Products.Where(x => x.ProductID == p.ProductID).ToList().FirstOrDefault();
                if (obj != null)
                {
                    obj.ProductName = p.ProductName;
                    obj.Price = p.Price;
                    obj.Discount = p.Discount;
                    obj.Description = p.Description;
                    obj.DetailInfo = p.DetailInfo;
                    obj.QualityCheck = p.QualityCheck;
                    obj.OffersAviable = p.OffersAviable;
                    obj.DeliveryType = p.DeliveryType;
                    obj.CategoryID = p.CategoryID;
                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch
            {
                return false;
            }
        }

        [Route("DeleteProduct")]
        [HttpDelete]
        public bool DeleteProduct(int id)
        {

            try
            {
                var obj = db.Products.Where(x => x.ProductID == id).ToList().FirstOrDefault();
                if (obj != null)
                {
                    db.Products.Remove(obj);
                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch
            {
                return false;
            }
        }

        [Route("ProductsDetails")]
        [HttpGet]
        public List<Product> ProductsDetails()
        {
            return (from f in db.Products orderby f.ProductID select f).ToList();
        }

        
        [Route("AdminDeleteProduct")]
        [HttpDelete]
        public void AdminDeleteProduct(int id)
        {
            var obj = db.Products.Where(x => x.ProductID == id).ToList().FirstOrDefault();
            db.Products.Remove(obj);
            db.SaveChanges();
        }

        [Route("SearchProduct")]
        [HttpGet]
        public List<Product> SearchProduct(int id)
        {
            return db.Products.Where(x => x.CategoryID == id).ToList();
        }


        [Route("GetFeedBackQuestions")]
        [HttpGet]
        public FeedQuestions GetFeedBackQuestions()
        {
            return (from f in db.FeedQuestions select f).ToList().FirstOrDefault();
        }

        [Route("UpdateFeedBackQuestions")]
        [HttpPost]
        public void UpdateFeedBackQuestions(FeedQuestions f)
        {
                var obj = db.FeedQuestions.ToList().FirstOrDefault();
                    obj.Question1 = f.Question1;
                    obj.Question2 = f.Question2;
                    obj.Question3 = f.Question3;
                    obj.Question4 = f.Question4;
                    obj.Question5 = f.Question5;
                    obj.Question6 = f.Question6;
                    obj.Question7 = f.Question7;
                    db.SaveChanges();
        }

        [Route("GetProducts")]
        [HttpGet]
        public List<Product> GetProducts()
        {
            return (from f in db.Products select f).ToList();
        }

        [Route("GetCatogories")]
        [HttpGet]
        public List<Category> GetCatogories()
        {
            return (from f in db.Categories select f).ToList();
        }

        [Route("GetProduct")]
        [HttpGet]
        public List<Product> GetProduct(int id)
        {
            return (from f in db.Products where id==f.CategoryID select f).ToList();
        }

        [Route("AddOrder")]
        [HttpPost]
        public bool AddOrder(Order o)
        {
            try
            {
                var obj = db.Orders.Where(x => x.ProductID == o.ProductID && x.UserID==o.UserID).ToList().FirstOrDefault();
                if (obj == null)
                {
                    db.Orders.Add(o);
                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch
            {
                return false;
            }
        }

        [Route("UpdateOrder")]
        [HttpPost]
        public bool UpdateOrder(Order o)
        {
            try
            {
                var obj = db.Orders.Where(x => x.ProductID == o.ProductID && x.UserID == o.UserID).ToList().FirstOrDefault();
                if (obj != null)
                {
                    obj.Quantity = o.Quantity;
                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch
            {
                return false;
            }
        }

        [Route("DeleteOrder")]
        [HttpDelete]
        public bool DeleteOrder(string id,int pid)
        {

            try
            {
                var obj = db.Orders.Where(x => x.ProductID == pid && x.UserID == id).ToList().FirstOrDefault();
                if (obj != null)
                {
                    db.Orders.Remove(obj);
                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch
            {
                return false;
            }
        }

        [Route("GetOrders")]
        [HttpGet]
        public List<Order> GetOrders(string userid)
        {
            return (from o in db.Orders where userid==o.UserID select o).ToList();
        }

        [Route("ShowProduct")]
        [HttpGet]
        public List<Product> ShowProduct(string id)
        {
            return (from p in db.Products where p.ProductName.Contains(id) orderby p.ProductName select p).ToList();
        }

        [Route("GetOrders1")]
        [HttpGet]
        public List<Order> GetOrders1(string uid)
        {
            return (from p in db.Orders where p.UserID==uid orderby p.ProductID select p).ToList();
        }

        [Route("GetAllProducts")]
        [HttpGet]
        public List<Product> GetAllProducts()
        {
            return (from p in db.Products orderby p.ProductID select p).ToList();
        }

        [Route("UpdateLike")]
        [HttpPost]
        public void UpdateLike(Like o)
        {
                var obj = db.Likes.Where(x => x.ProductID == o.ProductID && x.Email == o.Email).ToList().FirstOrDefault();
                if (obj != null)
                {
                    obj.Wish = o.Wish;
                    db.SaveChanges();
                }
                else
            {
                db.Likes.Add(o);
                db.SaveChanges();
            }
        }

        [Route("GetLikes")]
        [HttpGet]
        public List<Like> GetLikes(string id)
        {
            return (from p in db.Likes where p.Email==id && p.Wish==1 orderby p.ProductID select p).ToList();
        }

        
        [Route("UpdateAddress")]
        [HttpPost]
        public void UpdateAddress(string email,string add)
        {
            var obj = db.Locations.Where(x => x.Email == email).ToList().FirstOrDefault();
            if (obj != null)
            {
                obj.Address = add;
                db.SaveChanges();
            }
            else
            {
                db.Locations.Add(new Location { Address=add,Email=email });
                db.SaveChanges();
            }
        }

        [Route("GetAddress")]
        [HttpGet]
        public string GetAddress(string id)
        {
            var obj=(from p in db.Locations where p.Email == id select p).ToList().FirstOrDefault();
            if (obj != null)
                return obj.Address;
            else
                return "";
        }
        
        [Route("delivery")]
        [HttpPost]
        public void delivery(string email,string date)
        {
            var objs = db.Orders.Where(x => x.UserID == email).ToList();
            if (objs != null)
            {
                foreach (var order in objs)
                {
                    db.OrderHistories.Add(new OrderHistory { ProductID = order.ProductID, Quantity = order.Quantity, UserID = order.UserID ,Date=date});
                }
                db.Orders.RemoveRange(objs);
                db.SaveChanges();
            }
        }

        [Route("GetHistory")]
        [HttpGet]
        public List<OrderHistory> GetHistory(string id)
        {
            return (from p in db.OrderHistories where p.UserID == id orderby p.Date select p).ToList();
        }

        [Route("GetLatest")]
        [HttpGet]
        public List<int> GetLatest()
        {
            return (from p in db.Latests select p.ProductID).ToList();
        }
    }
}
