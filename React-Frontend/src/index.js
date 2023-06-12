import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Login } from "./Tommy/User/Login";
import { SignUp } from "./Tommy/User/SignUp";
import { Forgot } from "./Tommy/User/forgot/forgot";
import { Reset } from "./Tommy/User/forgot/Reset";
import { Home } from "./Tommy/User/Home/Home";
import { Product } from "./Tommy/User/Home/Product";
import { Products } from "./Tommy/User/Home/Products";
import { Verify } from "./Tommy/User/Profile/verify";
import { Profile } from "./Tommy/User/Profile/Profile";
import { FeedBack } from "./Tommy/User/Side/FeedBack";
import { ContactUs } from "./Tommy/User/Side/ContactUs";
import { Games } from "./Tommy/User/Side/Games";
import { MyOrders } from "./Tommy/User/Side/MyOrders";
import { OrderHistory } from "./Tommy/User/Side/OrderHistory";
import { Payment } from "./Tommy/User/Side/Payment";
import { WishList } from "./Tommy/User/Side/WishList";
import { Offers } from "./Tommy/User/Home/Offers";
import { Latest } from "./Tommy/User/Home/Latest";
import { GDice } from "./Tommy/User/Side/GDice";

import { AdminLogin } from "./Tommy/Admin/AdminLogin";
import { AdminSignUp } from "./Tommy/Admin/AdminSignUp";
import { AdminHome } from "./Tommy/Admin/AdminHome";
import { AdminForgot } from "./Tommy/Admin/Forgot/AdminForgot";
import { AdminReset } from "./Tommy/Admin/Forgot/AdminReset";
import { AdminProfile } from "./Tommy/Admin/HomeNav/AdminProfile";
import { AdminVerify } from "./Tommy/Admin/HomeNav/AdminVerify";
import { CustomerList } from "./Tommy/Admin/Side/CustomerList";
import { FeedBacks } from "./Tommy/Admin/Side/FeedBacks";
import { ProductsByCategory } from "./Tommy/Admin/Side/ProductsByCategory";
import { UpdateCategory } from "./Tommy/Admin/Side/UpdateCategory";
import { UpdateFeedBack } from "./Tommy/Admin/Side/UpdateFeedBack";
import { UpdateProduct } from "./Tommy/Admin/Side/UpdateProduct";

import "./Tommy/default.css";

ReactDOM.createRoot(document.querySelector(".new")).render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/Forgot" component={Forgot} />
      <Route path="/Reset" component={Reset} />
      <Route path="/Home" component={Home} />
      <Route path="/Verify" component={Verify} />
      <Route path="/Profile" component={Profile} />
      <Route exact path="/FeedBack" component={FeedBack} />
      <Route exact path="/ContactUs" component={ContactUs} />
      <Route exact path="/Products" component={Products} />
      <Route exact path="/Product" component={Product} />
      <Route exact path="/Games" component={Games} />
      <Route exact path="/MyOrders" component={MyOrders} />
      <Route exact path="/OrderHistory" component={OrderHistory} />
      <Route exact path="/Payment" component={Payment} />
      <Route exact path="/WishList" component={WishList} />
      <Route exact path="/Offers" component={Offers} />
      <Route exact path="/Latest" component={Latest} />
      <Route exact path="/GDice" component={GDice} />

      <Route exact path="/AdminLogin" component={AdminLogin} />
      <Route exact path="/AdminSignUp" component={AdminSignUp} />
      <Route exact path="/AdminHome" component={AdminHome} />
      <Route exact path="/AdminForgot" component={AdminForgot} />
      <Route exact path="/AdminReset" component={AdminReset} />
      <Route exact path="/AdminProfile" component={AdminProfile} />
      <Route exact path="/AdminVerify" component={AdminVerify} />
      <Route exact path="/CustomerList" component={CustomerList} />
      <Route exact path="/FeedBacks" component={FeedBacks} />
      <Route exact path="/UpdateCategory" component={UpdateCategory} />
      <Route exact path="/UpdateProduct" component={UpdateProduct} />
      <Route exact path="/UpdateFeedBack" component={UpdateFeedBack} />
      <Route exact path="/ProductsByCategory" component={ProductsByCategory} />
    </Switch>
  </BrowserRouter>
);
