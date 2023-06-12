import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

export class UpdateProduct extends React.Component {
  check1 = () => {
    let id = parseInt(document.getElementById("id").value);
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let discount = document.getElementById("discount").value;
    let sdesc = document.getElementById("sdesc").value;
    let ldesc = document.getElementById("ldesc").value;
    let dtype = document.getElementById("dtype").value;
    let cid = document.getElementById("cid").value;

    if (id != "" && id >= 1000 && id <= 9999)
      document.querySelector(".eid").classList.add("hide");
    else if (id == "") {
      document.querySelector(".eid").innerHTML = "Product ID not Provided!";
      document.querySelector(".eid").classList.remove("hide");
    } else {
      document.querySelector(".eid").innerHTML = "Invalid Product ID Provided!";
      document.querySelector(".eid").classList.remove("hide");
    }

    let [Uletter, Lletter, digit, special] = [0, 0, 0, 0];
    for (let i = 0; i < name.length; i++) {
      if (/[A-Z]/.test(name[i])) Uletter++;
      else if (/[a-z]/.test(name[i])) Lletter++;
      else if (/[0-9]/.test(name[i])) digit++;
      else special++;
    }
    if (digit == 0 && special == 0 && name.length <= 30 && name.length >= 4)
      document.querySelector(".ename").classList.add("hide");
    else if (name.length == 0) {
      document.querySelector(".ename").innerHTML = "Product Name not Provided!";
      document.querySelector(".ename").classList.remove("hide");
    } else if (name.length > 30) {
      document.querySelector(".ename").innerHTML =
        "Product Name is too long, Maximum 30 letters allowed!";
      document.querySelector(".ename").classList.remove("hide");
    } else if (name.length < 4) {
      document.querySelector(".ename").innerHTML =
        "Product Name is too Small, Minimum 4 letters allowed!";
      document.querySelector(".ename").classList.remove("hide");
    } else if (digit != 0) {
      document.querySelector(".ename").innerHTML =
        "Digits are not allowed in Product Name!";
      document.querySelector(".ename").classList.remove("hide");
    }

    if (price != "") document.querySelector(".eprice").classList.add("hide");
    else {
      document.querySelector(".eprice").innerHTML =
        "Provide Price For An Product!";
      document.querySelector(".eprice").classList.remove("hide");
    }

    if (discount != "")
      document.querySelector(".ediscount").classList.add("hide");
    else {
      document.querySelector(".ediscount").innerHTML =
        "Provide Discount For An product!";
      document.querySelector(".ediscount").classList.remove("hide");
    }

    if (sdesc != "") document.querySelector(".esdesc").classList.add("hide");
    else {
      document.querySelector(".esdesc").innerHTML =
        "Provide Short Description For An product!";
      document.querySelector(".esdesc").classList.remove("hide");
    }

    if (ldesc != "") document.querySelector(".eldesc").classList.add("hide");
    else {
      document.querySelector(".eldesc").innerHTML =
        "Provide Description For An product!";
      document.querySelector(".eldesc").classList.remove("hide");
    }

    if (dtype != "none")
      document.querySelector(".edtype").classList.add("hide");
    else {
      document.querySelector(".edtype").innerHTML =
        "Select an Delivery Type For An product!";
      document.querySelector(".edtype").classList.remove("hide");
    }
    if (!cid == "" && cid >= 1000 && cid <= 9999)
      axios
        .get("http://localhost:56064/Api/Market/CheckCategory?id=" + cid)
        .then((response) => {
          if (response.data) {
            document.querySelector(".ecid").innerHTML =
              "Category ID Does not exist!";
            document.querySelector(".ecid").classList.remove("hide");
          } else document.querySelector(".ecid").classList.add("hide");
        });
    else if (cid == "") {
      document.querySelector(".ecid").innerHTML = "Category ID not Provided!";
      document.querySelector(".ecid").classList.remove("hide");
    } else {
      document.querySelector(".ecid").innerHTML =
        "Invalid Category ID Provided!";
      document.querySelector(".ecid").classList.remove("hide");
    }
  };
  change = () => {
    let cid = document.getElementById("cid").value;

    if (cid != "" && cid >= 1000 && cid <= 9999)
      axios
        .get("http://localhost:56064/Api/Market/CheckCategory?id=" + cid)
        .then((response) => {
          if (response.data) {
            document.querySelector(".ecid").innerHTML =
              "Category ID Does not exist!";
            document.querySelector(".ecid").classList.remove("hide");
          } else document.querySelector(".ecid").classList.add("hide");
        });
    else {
      document.querySelector(".ecid").classList.add("hide");
    }
  };
  checkId = (e) => {
    e.preventDefault();
    let id = parseInt(document.getElementById("id").value);

    if (id != "" && id >= 1000 && id <= 9999)
      document.querySelector(".eid").classList.add("hide");
    else if (id == "") {
      document.querySelector(".eid").innerHTML = "Product ID not Provided!";
      document.querySelector(".eid").classList.remove("hide");
    } else {
      document.querySelector(".eid").innerHTML = "Invalid Product ID Provided!";
      document.querySelector(".eid").classList.remove("hide");
    }

    if (document.querySelector(".eid").classList.contains("hide"))
      axios
        .get(
          "http://localhost:56064/Api/Market/GetProductDetails?id=" +
            document.getElementById("id").value
        )
        .then((response) => {
          if (response.data.ProductID == -1) {
            document.querySelector(".alert2").innerHTML =
              "Product ID Does not exist!";
            this.clear();
          } else {
            if (response.data.OffersAviable)
              document.getElementById("offer").checked = true;
            else document.getElementById("offer").checked = false;
            if (response.data.QualityCheck)
              document.getElementById("quality").checked = true;
            else document.getElementById("quality").checked = false;
            document.getElementById("name").value = response.data.ProductName;
            document.getElementById("price").value = response.data.Price;
            document.getElementById("discount").value = response.data.Discount;
            document.getElementById("sdesc").value = response.data.Description;
            document.getElementById("ldesc").value = response.data.DetailInfo;
            document.getElementById("dtype").value = response.data.DeliveryType;
            document.getElementById("cid").value = response.data.CategoryID;
            document.querySelector(".alert2").innerHTML =
              "Product Details Found Succesfully!";
            document.querySelector(".ename").classList.add("hide");
            document.querySelector(".eprice").classList.add("hide");
            document.querySelector(".ediscount").classList.add("hide");
            document.querySelector(".esdesc").classList.add("hide");
            document.querySelector(".eldesc").classList.add("hide");
            document.querySelector(".edtype").classList.add("hide");
            document.querySelector(".ecid").classList.add("hide");
          }
          document.querySelector(".alert2").classList.remove("hide");
          setTimeout(() => {
            document.querySelector(".alert2").classList.add("hide");
          }, 3 * 1000);
        });
  };
  add = (e) => {
    e.preventDefault();

    let id = parseInt(document.getElementById("id").value);
    let name = document.getElementById("name").value;
    let price = parseFloat(document.getElementById("price").value);
    let discount = parseInt(document.getElementById("discount").value);
    let sdesc = document.getElementById("sdesc").value;
    let ldesc = document.getElementById("ldesc").value;
    let dtype = document.getElementById("dtype").value;
    let cid = document.getElementById("cid").value;

    this.check1();

    if (
      document.querySelector(".eid").classList.contains("hide") &&
      document.querySelector(".ename").classList.contains("hide") &&
      document.querySelector(".eprice").classList.contains("hide") &&
      document.querySelector(".ediscount").classList.contains("hide") &&
      document.querySelector(".esdesc").classList.contains("hide") &&
      document.querySelector(".eldesc").classList.contains("hide") &&
      document.querySelector(".edtype").classList.contains("hide") &&
      document.querySelector(".ecid").classList.contains("hide")
    )
      axios
        .post("http://localhost:56064/Api/Market/AddProduct", {
          ProductID: id,
          ProductName:
            String(name).charAt(0).toUpperCase() + String(name).substring(1),
          Price: price,
          Discount: discount,
          Description: sdesc,
          DetailInfo: ldesc,
          QualityCheck: document.getElementById("quality").checked
            ? true
            : false,
          OffersAviable: document.getElementById("offer").checked
            ? true
            : false,
          DeliveryType: dtype,
          CategoryID: cid,
        })
        .then((response) => {
          if (response.data)
            document.querySelector(".alert1").innerHTML =
              "Product Details Add Sucessfully!";
          else
            document.querySelector(".alert1").innerHTML =
              "Product Details Already Exist!";

          document.querySelector(".alert1").classList.remove("hide");
          this.clear();
          setTimeout(() => {
            document.querySelector(".alert1").classList.add("hide");
          }, 3 * 1000);
        });
  };
  Update = (e) => {
    e.preventDefault();

    this.check1();

    let id = parseInt(document.getElementById("id").value);
    let name = document.getElementById("name").value;
    let price = parseFloat(document.getElementById("price").value);
    let discount = parseInt(document.getElementById("discount").value);
    let sdesc = document.getElementById("sdesc").value;
    let ldesc = document.getElementById("ldesc").value;
    let dtype = document.getElementById("dtype").value;
    let cid = document.getElementById("cid").value;

    if (
      document.querySelector(".eid").classList.contains("hide") &&
      document.querySelector(".ename").classList.contains("hide") &&
      document.querySelector(".eprice").classList.contains("hide") &&
      document.querySelector(".ediscount").classList.contains("hide") &&
      document.querySelector(".esdesc").classList.contains("hide") &&
      document.querySelector(".eldesc").classList.contains("hide") &&
      document.querySelector(".edtype").classList.contains("hide") &&
      document.querySelector(".ecid").classList.contains("hide")
    )
      axios
        .post("http://localhost:56064/Api/Market/UpdateProduct", {
          ProductID: id,
          ProductName:
            String(name).charAt(0).toUpperCase() + String(name).substring(1),
          Price: price,
          Discount: discount,
          Description: sdesc,
          DetailInfo: ldesc,
          QualityCheck: document.getElementById("quality").checked
            ? true
            : false,
          OffersAviable: document.getElementById("offer").checked
            ? true
            : false,
          DeliveryType: dtype,
          CategoryID: cid,
        })
        .then((x) => {
          if (!x)
            document.querySelector(".alert1").innerHTML =
              "Product ID Does not exist!";
          else
            document.querySelector(".alert1").innerHTML =
              "Product Details Updated Sucessfully!";

          document.querySelector(".alert1").classList.remove("hide");
          this.clear();
          setTimeout(() => {
            document.querySelector(".alert1").classList.add("hide");
          }, 3 * 1000);
        });
  };

  close = () => {
    document.querySelector(".modal").classList.add("hide");
    document.querySelector(".overlay").classList.add("hide");
  };

  show = (e) => {
    e.preventDefault();
    document.querySelector(".modal").classList.remove("hide");
    document.querySelector(".overlay").classList.remove("hide");
  };

  delete = (e) => {
    e.preventDefault();

    let id = parseInt(document.getElementById("id").value);

    if (id != "" && id >= 1000 && id <= 9999)
      document.querySelector(".eid").classList.add("hide");
    else if (id == "") {
      document.querySelector(".eid").innerHTML = "Product ID not Provided!";
      document.querySelector(".eid").classList.remove("hide");
    } else {
      document.querySelector(".eid").innerHTML = "Invalid Product ID Provided!";
      document.querySelector(".eid").classList.remove("hide");
    }

    document.querySelector(".modal").classList.add("hide");
    document.querySelector(".overlay").classList.add("hide");

    if (document.querySelector(".eid").classList.contains("hide"))
      axios
        .delete(
          "http://localhost:56064/Api/Market/DeleteProduct?id=" +
            document.getElementById("id").value
        )
        .then((response) => {
          if (response.data == false)
            document.querySelector(".alert1").innerHTML =
              "Product ID Does not exist!";
          else
            document.querySelector(".alert1").innerHTML =
              "Product Record Deleted Sucessfully!";
          document.querySelector(".alert1").classList.remove("hide");
          this.clear();
          setTimeout(() => {
            document.querySelector(".alert1").classList.add("hide");
          }, 3 * 1000);
        });
    document.querySelector(".ecid").classList.add("hide");
  };

  clear = () => {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("discount").value = "";
    document.getElementById("sdesc").value = "";
    document.getElementById("ldesc").value = "";
    document.getElementById("quality").checked = false;
    document.getElementById("offer").checked = false;
    document.getElementById("dtype").value = "none";
    document.getElementById("cid").value = "";
  };

  menu = () => {
    if (document.querySelector(".open-close").classList.contains("admingrid")) {
      document.querySelector(".open-close").classList.remove("admingrid");
      document.querySelector(".open-close").classList.add("closeadmingrid");
      document.querySelector(".sec1").classList.add("hide");
      document.querySelector(".menu").name = "menu-outline";
      document.querySelector(".menu").classList.remove("close");
    } else {
      document.querySelector(".open-close").classList.remove("closeadmingrid");
      document.querySelector(".open-close").classList.add("admingrid");
      document.querySelector(".sec1").classList.remove("hide");
      document.querySelector(".menu").name = "close-outline";
      document.querySelector(".menu").classList.add("close");
    }
  };

  fold = () => {
    if (!document.querySelector(".sec1").classList.contains("hide"))
      this.menu();
  };
  render = () => {
    console.log(this.props.location.state);

    return (
      <div className="main">
        <div onClick={this.fold} className="nav1">
          <Link
            to={{
              pathname: "/AdminHome",
              state: { ...this.props.location.state },
            }}
            className="nav-link"
          >
            Home
          </Link>
          <Link to="/AdminLogin" className="nav-link idel">
            Logout
          </Link>
        </div>
        <ion-icon
          class="menu"
          onClick={this.menu}
          name="menu-outline"
        ></ion-icon>
        <div className="open-close closeadmingrid">
          <div className="sec1 hide sideflex">
            <p className="menu1">MENU</p>
            <Link
              to={{
                pathname: "/AdminVerify",
                state: { ...this.props.location.state },
              }}
              className="sidein"
            >
              Profile
            </Link>
            <Link
              to={{
                pathname: "/AdminHome",
                state: { ...this.props.location.state },
              }}
              className="sidein"
            >
              Update Customer
            </Link>
            <Link
              to={{
                pathname: "/CustomerList",
                state: { ...this.props.location.state },
              }}
              className="sidein"
            >
              Customer List
            </Link>
            <Link
              to={{
                pathname: "/UpdateCategory",
                state: { ...this.props.location.state },
              }}
              className="sidein"
            >
              Update Category
            </Link>
            <Link
              to={{
                pathname: "/UpdateProduct",
                state: { ...this.props.location.state },
              }}
              className="sidein"
            >
              Update Product
            </Link>
            <Link
              to={{
                pathname: "/ProductsByCategory",
                state: { ...this.props.location.state },
              }}
              className="sidein"
            >
              Products By Category
            </Link>
            <Link
              to={{
                pathname: "/FeedBacks",
                state: { ...this.props.location.state },
              }}
              className="sidein"
            >
              FeedBacks
            </Link>
            <Link
              to={{
                pathname: "/UpdateFeedBack",
                state: { ...this.props.location.state },
              }}
              className="sidein"
            >
              Update FeedBack From
            </Link>
          </div>
          <div onClick={this.fold} className="adminflex">
            <h1 className="UpdateCustomer">Update Product Details</h1>
            <form className="form falign">
              <label className="lable">Product ID</label>
              <div className="input-group1">
                <input
                  className="input2"
                  min="1000"
                  max="9999"
                  type="number"
                  placeholder="Four digit Product ID"
                  id="id"
                />
                <p className="error eid hide">hello</p>
              </div>
              <div className="full userflex">
                <input
                  type="submit"
                  className="sub2 s icheck"
                  onClick={this.checkId}
                  value="Check"
                />
                <p className="alert2 hide">hello</p>
              </div>
              <label className="lable">Product Name</label>
              <div className="input-group1">
                <input
                  className="input2"
                  type="text"
                  placeholder="Product Name"
                  id="name"
                />
                <p className="error ename hide">hello</p>
              </div>
              <label className="lable">Price</label>
              <div className="input-group1">
                <input
                  className="input2"
                  min="1"
                  max="99999"
                  type="number"
                  placeholder="Product Price"
                  id="price"
                />
                <p className="error eprice hide">hello</p>
              </div>
              <label className="lable">Discount</label>
              <div className="input-group1">
                <input
                  className="input2"
                  min="1"
                  max="100"
                  type="number"
                  placeholder="Product Discount"
                  id="discount"
                />
                <p className="error ediscount hide">hello</p>
              </div>
              <label className="lable">Description</label>
              <div className="input-group1">
                <textarea
                  className="input2"
                  id="sdesc"
                  placeholder="Write Short Description of product Here!"
                  rows="2"
                />
                <p className="error esdesc hide">hello</p>
              </div>
              <label className="lable">Detail Information</label>
              <div className="input-group1">
                <textarea
                  className="input2"
                  id="ldesc"
                  placeholder="Write Description of product Here!"
                  rows="5"
                />
                <p className="error eldesc hide">hello</p>
              </div>
              <label className="lable">Quality Check</label>
              <div className="input-group1">
                <input
                  type="checkbox"
                  id="quality"
                  className="check"
                  name="fav_language1"
                  value="HTML"
                />
                <p className="error equality hide">hello</p>
              </div>

              <label className="lable">Special Offers</label>
              <div className="input-group1">
                <input
                  type="checkbox"
                  id="offer"
                  className="check"
                  name="fav_language1"
                  value="HTML"
                />
                <p className="error eoffer hide">hello</p>
              </div>
              <label className="lable">Delivery Type</label>
              <div className="input-group1">
                <select className="input2 input4" id="dtype">
                  <option value="none" className="dim">
                    --select--
                  </option>
                  <option value="normal" className="input4">
                    Standard Delivery
                  </option>
                  <option value="express" className="input4">
                    Express Delivery
                  </option>
                </select>
                <p className="error edtype hide">hello</p>
              </div>
              <label className="lable">Category ID</label>
              <div className="input-group1">
                <input
                  className="input2"
                  min="1000"
                  max="9999"
                  onChange={this.change}
                  type="number"
                  placeholder="Four digit Category ID"
                  id="cid"
                />
                <p className="error ecid hide">hello</p>
              </div>
              <p className="alert1 hide full">hello</p>
              <div className="categorygrid">
                <input
                  type="submit"
                  className="sub2 s iadd"
                  onClick={this.add}
                  value="Add"
                />
                <input
                  type="submit"
                  className="sub2 s"
                  onClick={this.Update}
                  value="Update"
                />
                <input
                  type="submit"
                  className="sub2 s idel"
                  onClick={this.show}
                  value="Delete"
                />
              </div>
            </form>
          </div>
        </div>
        <div class="modal hide">
          <ion-icon
            id="closeicon"
            class="close1"
            name="close-outline"
            onClick={this.close}
          ></ion-icon>
          <h1 className="aleartmsg">
            Are you sure, you want to delete{" "}
            <span className="icdel">Product </span>?
          </h1>
          <div className="popbtn">
            <input
              type="button"
              onClick={this.delete}
              className="sub2 s idel"
              value="Delete"
            />
            <input
              type="button"
              onClick={this.close}
              className="sub2 s icheck"
              value="Cancel"
            />
          </div>
        </div>
        <div class="overlay hide" onClick={this.close}></div>
      </div>
    );
  };
}
