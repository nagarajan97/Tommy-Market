import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

export class UpdateCategory extends React.Component {
  check1 = () => {
    let id = parseInt(document.getElementById("id").value);
    let name = document.getElementById("name").value;

    if (id >= 1000 && id <= 9999)
      document.querySelector(".eid").classList.add("hide");
    else {
      document.querySelector(".eid").innerHTML =
        "Invalid Category ID not Provided!";
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
      document.querySelector(".ename").innerHTML =
        "Category Name not Provided!";
      document.querySelector(".ename").classList.remove("hide");
    } else if (name.length > 30) {
      document.querySelector(".ename").innerHTML =
        "Category Name is too long, Maximum 30 letters allowed!";
      document.querySelector(".ename").classList.remove("hide");
    } else if (name.length < 4) {
      document.querySelector(".ename").innerHTML =
        "Category Name is too Small, Minimum 4 letters allowed!";
      document.querySelector(".ename").classList.remove("hide");
    }
  };
  checkId = (e) => {
    e.preventDefault();
    let id = document.getElementById("id").value;

    if (id.length == 0) {
      document.querySelector(".eid").innerHTML = "Category ID not Provided!!!";
      document.querySelector(".eid").classList.remove("hide");
      this.clear();
    } else if (!/^\d{4}$/.test(id)) {
      document.querySelector(".eid").innerHTML =
        "Invalid Category ID provided!";
      document.querySelector(".eid").classList.remove("hide");
      this.clear();
    } else document.querySelector(".eid").classList.add("hide");
    if (document.querySelector(".eid").classList.contains("hide"))
      axios
        .get(
          "http://localhost:56064/Api/Market/GetCategoryDetails?id=" +
            document.getElementById("id").value
        )
        .then((response) => {
          if (response.data.CategoryID == -1) {
            document.querySelector(".alert2").innerHTML =
              "Category ID Does not exist!";
            this.clear();
          } else {
            document.getElementById("name").value = response.data.CategoryName;
            document.querySelector(".alert2").innerHTML =
              "Category Details Found Succesfully!";
          }
          document.querySelector(".alert2").classList.remove("hide");
          setTimeout(() => {
            document.querySelector(".alert2").classList.add("hide");
          }, 3 * 1000);
        });
  };
  add = (e) => {
    e.preventDefault();

    this.check1();

    if (
      document.querySelector(".eid").classList.contains("hide") &&
      document.querySelector(".ename").classList.contains("hide")
    )
      axios
        .post("http://localhost:56064/Api/Market/AddCategory", {
          CategoryID: parseInt(document.getElementById("id").value),
          CategoryName:
            String(document.getElementById("name").value)
              .charAt(0)
              .toUpperCase() +
            String(document.getElementById("name").value).substring(1),
        })
        .then((response) => {
          if (response.data)
            document.querySelector(".alert1").innerHTML =
              "Category Details Add Sucessfully!";
          else
            document.querySelector(".alert1").innerHTML =
              "Category Details Already Exist!";

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

    if (
      document.querySelector(".eid").classList.contains("hide") &&
      document.querySelector(".ename").classList.contains("hide")
    )
      axios
        .post("http://localhost:56064/Api/Market/UpdateCategory", {
          CategoryID: parseInt(document.getElementById("id").value),
          CategoryName:
            String(document.getElementById("name").value)
              .charAt(0)
              .toUpperCase() +
            String(document.getElementById("name").value).substring(1),
        })
        .then((x) => {
          if (!x)
            document.querySelector(".alert1").innerHTML =
              "Category ID Does not exist!";
          else
            document.querySelector(".alert1").innerHTML =
              "Category Details Updated Sucessfully!";

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
    let id = document.getElementById("id").value;

    if (id >= 1000 && id <= 9999)
      document.querySelector(".eid").classList.add("hide");
    else {
      document.querySelector(".eid").innerHTML =
        "Invalid Category ID not Provided!";
      document.querySelector(".eid").classList.remove("hide");
    }

    document.querySelector(".modal").classList.add("hide");
    document.querySelector(".overlay").classList.add("hide");

    if (document.querySelector(".eid").classList.contains("hide"))
      axios
        .delete(
          "http://localhost:56064/Api/Market/DeleteCategory?id=" +
            document.getElementById("id").value
        )
        .then((response) => {
          if (response.data == false)
            document.querySelector(".alert1").innerHTML =
              "Category ID Does not exist!";
          else
            document.querySelector(".alert1").innerHTML =
              "Category Record Deleted Sucessfully!";
          document.querySelector(".alert1").classList.remove("hide");
          this.clear();
          setTimeout(() => {
            document.querySelector(".alert1").classList.add("hide");
          }, 3 * 1000);
        });
  };

  clear = () => {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
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
            <h1 className="UpdateCustomer">Update Category Details</h1>
            <form className="form falign">
              <label className="lable">Category ID</label>
              <div className="input-group1">
                <input
                  className="input2"
                  min="1000"
                  max="9999"
                  type="number"
                  placeholder="Four digit Category ID"
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
              <label className="lable">Category Name</label>
              <div className="input-group1">
                <input
                  className="input2 in"
                  type="text"
                  placeholder="Category Name"
                  id="name"
                  autoCapitalize="true"
                />
                <p className="error ename hide">hello</p>
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
            <span className="icdel">Category </span>?
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
