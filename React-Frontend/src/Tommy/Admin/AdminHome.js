import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

export class AdminHome extends React.Component {
  submit = (e) => {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let tel = document.getElementById("tel").value;
    let pin = parseInt(document.getElementById("pin").value);
    let pass = document.getElementById("pass").value;
    let cpass = document.getElementById("cpass").value;

    e.preventDefault();
    if (fname.length == 0) {
      document.querySelector(".efname").innerHTML =
        "First Name not Provided!!!";
      document.querySelector(".efname").classList.remove("hide");
    } else if (/\d+/.test(fname)) {
      document.querySelector(".efname").innerHTML = "Numbers are not Allowed!";
      document.querySelector(".efname").classList.remove("hide");
    } else if (fname.length < 4) {
      document.querySelector(".efname").innerHTML =
        "Too Short name not Allowed!";
      document.querySelector(".efname").classList.remove("hide");
    } else if (fname.length > 25) {
      document.querySelector(".efname").innerHTML =
        "Too Long name not Allowed!";
      document.querySelector(".efname").classList.remove("hide");
    } else document.querySelector(".efname").classList.add("hide");

    if (lname.length == 0) {
      document.querySelector(".elname").innerHTML = "Last Name not Provided!!!";
      document.querySelector(".elname").classList.remove("hide");
    } else if (/\d+/.test(lname)) {
      document.querySelector(".elname").innerHTML = "Numbers are not Allowed!";
      document.querySelector(".elname").classList.remove("hide");
    } else if (lname.length > 25) {
      document.querySelector(".elname").innerHTML =
        "Too Long name not Allowed!";
      document.querySelector(".elname").classList.remove("hide");
    } else document.querySelector(".elname").classList.add("hide");

    if (email.length == 0) {
      document.querySelector(".eemail").innerHTML = "E-mail not Provided!!!";
      document.querySelector(".eemail").classList.remove("hide");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      document.querySelector(".eemail").innerHTML =
        "Invalid Email ID provided!";
      document.querySelector(".eemail").classList.remove("hide");
    } else document.querySelector(".eemail").classList.add("hide");

    if (tel.length == 0) {
      document.querySelector(".etel").innerHTML =
        "Phone Number not Provided!!!";
      document.querySelector(".etel").classList.remove("hide");
    } else if (/\D+/.test(tel)) {
      document.querySelector(".etel").innerHTML = "Only Digits are Allowed!";
      document.querySelector(".etel").classList.remove("hide");
    } else if (!/^\d{8,12}$/.test(tel)) {
      document.querySelector(".etel").innerHTML = "Invalid Number provided!";
      document.querySelector(".etel").classList.remove("hide");
    } else document.querySelector(".etel").classList.add("hide");

    if (String(pin)[0] == "N") {
      document.querySelector(".epin").innerHTML = "Pin not Provided!!";
      document.querySelector(".epin").classList.remove("hide");
    } else if (pin < 1000 || pin > 9999) {
      document.querySelector(".epin").innerHTML =
        "Value should be bettween 1000 and 9999";
      document.querySelector(".epin").classList.remove("hide");
    } else document.querySelector(".epin").classList.add("hide");

    let [Uletter, Lletter, digit, special] = [0, 0, 0, 0];
    for (let i = 0; i < pass.length; i++) {
      if (/[A-Z]/.test(pass[i])) Uletter++;
      else if (/[a-z]/.test(pass[i])) Lletter++;
      else if (/[0-9]/.test(pass[i])) digit++;
      else special++;
    }
    if (
      Uletter >= 1 &&
      Lletter >= 1 &&
      digit >= 1 &&
      special >= 1 &&
      pass.length >= 6 &&
      pass.length <= 30 &&
      pass == cpass
    )
      document.querySelector(".epass").classList.add("hide");
    else if (pass.length == 0) {
      document.querySelector(".epass").innerHTML = "Password not Provided!!!";
      document.querySelector(".epass").classList.remove("hide");
    } else if (pass.length > 30) {
      document.querySelector(".epass").innerHTML =
        "password is too long, Maximum 30 letters allowed!";
      document.querySelector(".epass").classList.remove("hide");
    } else if (pass.length < 6) {
      document.querySelector(".epass").innerHTML = "Password is Too Short!";
      document.querySelector(".epass").classList.remove("hide");
    } else if (Uletter < 1) {
      document.querySelector(".epass").innerHTML =
        "Password Doesn't contains any UpperCase!";
      document.querySelector(".epass").classList.remove("hide");
    } else if (Lletter < 1) {
      document.querySelector(".epass").innerHTML =
        "Password Doesn't contains any LowerCase!";
      document.querySelector(".epass").classList.remove("hide");
    } else if (digit < 1) {
      document.querySelector(".epass").innerHTML =
        "Password Doesn't contains any digit!";
      document.querySelector(".epass").classList.remove("hide");
    } else if (special < 1) {
      document.querySelector(".epass").innerHTML =
        "Password Doesn't contains any Spical Characters!";
      document.querySelector(".epass").classList.remove("hide");
    } else if (pass != cpass) {
      document.querySelector(".epass").innerHTML = "No Match Found!";
      document.querySelector(".epass").classList.remove("hide");
    }

    [Uletter, Lletter, digit, special] = [0, 0, 0, 0];
    for (let i = 0; i < cpass.length; i++) {
      if (/[A-Z]/.test(cpass[i])) Uletter++;
      else if (/[a-z]/.test(cpass[i])) Lletter++;
      else if (/[0-9]/.test(cpass[i])) digit++;
      else special++;
    }
    if (
      Uletter >= 1 &&
      Lletter >= 1 &&
      digit >= 1 &&
      special >= 1 &&
      cpass.length >= 6 &&
      cpass.length <= 30 &&
      cpass == pass
    )
      document.querySelector(".ecpass").classList.add("hide");
    else if (cpass.length == 0) {
      document.querySelector(".ecpass").innerHTML = "Password not Provided!!!";
      document.querySelector(".ecpass").classList.remove("hide");
    } else if (cpass.length > 30) {
      document.querySelector(".ecpass").innerHTML =
        "password is too long, Maximum 30 letters allowed!";
      document.querySelector(".ecpass").classList.remove("hide");
    } else if (cpass.length < 6) {
      document.querySelector(".ecpass").innerHTML = "Password is Too Short!";
      document.querySelector(".ecpass").classList.remove("hide");
    } else if (Uletter < 1) {
      document.querySelector(".ecpass").innerHTML =
        "Password Doesn't contains any UpperCase!";
      document.querySelector(".ecpass").classList.remove("hide");
    } else if (Lletter < 1) {
      document.querySelector(".ecpass").innerHTML =
        "Password Doesn't contains any LowerCase!";
      document.querySelector(".ecpass").classList.remove("hide");
    } else if (digit < 1) {
      document.querySelector(".ecpass").innerHTML =
        "Password is Doesn't contains any digit!";
      document.querySelector(".ecpass").classList.remove("hide");
    } else if (special < 1) {
      document.querySelector(".ecpass").innerHTML =
        "Password is Doesn't contains any Spical Characters!";
      document.querySelector(".ecpass").classList.remove("hide");
    } else if (pass != cpass) {
      document.querySelector(".ecpass").innerHTML = "No Match Found!";
      document.querySelector(".ecpass").classList.remove("hide");
    }
    if (
      document.querySelector(".efname").classList.contains("hide") &&
      document.querySelector(".elname").classList.contains("hide") &&
      document.querySelector(".eemail").classList.contains("hide") &&
      document.querySelector(".etel").classList.contains("hide") &&
      document.querySelector(".epin").classList.contains("hide") &&
      document.querySelector(".epass").classList.contains("hide") &&
      document.querySelector(".ecpass").classList.contains("hide")
    )
      axios
        .post("http://localhost:56064/Api/Market/UpdateCustomer", {
          FirstName:
            String(document.getElementById("fname").value)
              .charAt(0)
              .toUpperCase() +
            String(document.getElementById("fname").value).substring(1),
          LastName:
            document.getElementById("lname").value.length == 1
              ? String(document.getElementById("lname").value).toUpperCase()
              : String(document.getElementById("lname").value)
                  .charAt(0)
                  .toUpperCase() +
                String(document.getElementById("lname").value).substring(1),
          Email: document.getElementById("email").value,
          Number: document.getElementById("tel").value,
          Pin: parseInt(document.getElementById("pin").value),
          Password: document.getElementById("pass").value,
          ConfirmPassword: document.getElementById("cpass").value,
        })
        .then((x) => {
          if (!x) {
            document.querySelector(".alert1").innerHTML =
              "Customer ID Does not exist!";
            document.querySelector(".alert1").classList.remove("hide");
          } else {
            document.querySelector(".alert1").innerHTML =
              "Customer Details Updated Sucessfully!";
            document.querySelector(".alert1").classList.remove("hide");
          }
          this.clear();
          setTimeout(() => {
            document.querySelector(".alert1").classList.add("hide");
          }, 3 * 1000);
        });
  };
  clear = () => {
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("tel").value = "";
    document.getElementById("pin").value = "";
    document.getElementById("pass").value = "";
    document.getElementById("cpass").value = "";
  };
  checkId = (e) => {
    e.preventDefault();
    let email = document.getElementById("email").value;

    if (email.length == 0) {
      document.querySelector(".eemail").innerHTML = "E-mail not Provided!!!";
      document.querySelector(".eemail").classList.remove("hide");
      this.clear();
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      document.querySelector(".eemail").innerHTML =
        "Invalid Email ID provided!";
      document.querySelector(".eemail").classList.remove("hide");
      this.clear();
    } else document.querySelector(".eemail").classList.add("hide");
    if (document.querySelector(".eemail").classList.contains("hide"))
      axios
        .get(
          "http://localhost:56064/Api/Market/GetCustomerDetails?id=" +
            document.getElementById("email").value
        )
        .then((response) => {
          if (response.data.Email == "-1") {
            document.querySelector(".alert2").innerHTML =
              "Customer ID Does not exist!";
            document.querySelector(".alert2").classList.remove("hide");
            this.clear();
            setTimeout(() => {
              document.querySelector(".alert2").classList.add("hide");
            }, 2 * 1000);
          } else {
            document.querySelector(".alert2").classList.add("hide");
            document.getElementById("fname").value = response.data.FirstName;
            document.getElementById("lname").value = response.data.LastName;
            document.getElementById("tel").value = response.data.Number;
            document.getElementById("pin").value = parseInt(response.data.Pin);
            document.getElementById("pass").value = response.data.Password;
            document.getElementById("cpass").value = response.data.Password;
            document.querySelector(".alert2").innerHTML =
              "Customer Details Found Succesfully!";
            document.querySelector(".alert2").classList.remove("hide");
            setTimeout(() => {
              document.querySelector(".alert2").classList.add("hide");
            }, 3 * 1000);
          }
        });
  };
  check = () => {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let tel = document.getElementById("tel").value;
    let pin = parseInt(document.getElementById("pin").value);
    let pass = document.getElementById("pass").value;
    let cpass = document.getElementById("cpass").value;
    if (fname.length > 25) {
      document.querySelector(".efname").innerHTML =
        "Maximum 25 letters allowed !";
      document.querySelector(".efname").classList.remove("hide");
    } else document.querySelector(".efname").classList.add("hide");

    if (lname.length > 25) {
      document.querySelector(".elname").innerHTML =
        "Maximum 25 letters allowed !";
      document.querySelector(".elname").classList.remove("hide");
    } else document.querySelector(".elname").classList.add("hide");

    if (email.length > 50) {
      document.querySelector(".eemail").innerHTML =
        "Invalid Email ID Provided!";
      document.querySelector(".eemail").classList.remove("hide");
    } else document.querySelector(".eemail").classList.add("hide");

    if (tel.length > 13) {
      document.querySelector(".etel").innerHTML = "Invalid Number Provided!";
      document.querySelector(".etel").classList.remove("hide");
    } else document.querySelector(".etel").classList.add("hide");
    document.querySelector(".epin").classList.add("hide");

    if (pass.length > 30) {
      document.querySelector(".epass").innerHTML =
        "password is too long, Maximum 30 characters allowed !";
      document.querySelector(".epass").classList.remove("hide");
    } else document.querySelector(".epass").classList.add("hide");

    if (cpass.length > 30) {
      document.querySelector(".ecpass").innerHTML =
        "password is too long, Maximum 30 characters allowed !";
      document.querySelector(".ecpass").classList.remove("hide");
    } else document.querySelector(".ecpass").classList.add("hide");
  };
  hide1 = () => {
    document.getElementById("pin").type =
      document.getElementById("pin").type === "password" ? "text" : "password";
    document.getElementById("eye1").name =
      document.getElementById("eye1").name === "eye-outline"
        ? "eye-off-outline"
        : "eye-outline";
  };
  hide2 = () => {
    document.getElementById("pass").type =
      document.getElementById("pass").type === "password" ? "text" : "password";
    document.getElementById("eye2").name =
      document.getElementById("eye2").name === "eye-outline"
        ? "eye-off-outline"
        : "eye-outline";
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
    let email = document.getElementById("email").value;

    if (email.length == 0) {
      document.querySelector(".eemail").innerHTML = "E-mail not Provided!!!";
      document.querySelector(".eemail").classList.remove("hide");
      this.clear();
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      document.querySelector(".eemail").innerHTML =
        "Invalid Email ID provided!";
      document.querySelector(".eemail").classList.remove("hide");
      this.clear();
    } else document.querySelector(".eemail").classList.add("hide");
    document.querySelector(".modal").classList.add("hide");
    document.querySelector(".overlay").classList.add("hide");
    if (document.querySelector(".eemail").classList.contains("hide"))
      axios
        .delete(
          "http://localhost:56064/Api/Market/DeleteCustomer?id=" +
            document.getElementById("email").value
        )
        .then((response) => {
          if (response.data == false) {
            document.querySelector(".alert1").innerHTML =
              "Customer ID Does not exist!";
            document.querySelector(".alert1").classList.remove("hide");
            this.clear();
            setTimeout(() => {
              document.querySelector(".alert1").classList.add("hide");
            }, 3 * 1000);
          } else {
            document.querySelector(".alert1").innerHTML =
              "Customer Record Deleted Sucessfully!";
            document.querySelector(".alert1").classList.remove("hide");
            this.clear();
            setTimeout(() => {
              document.querySelector(".alert1").classList.add("hide");
            }, 3 * 1000);
          }
        });
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
    return (
      <div className="main">
        <div onClick={this.fold} className="nav1">
          <p>Welcome back, {this.props.location.state.FirstName}</p>
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
            <h1 className="UpdateCustomer">Update Customer Details</h1>
            <form className="form falign">
              <label className="lable">Customer ID</label>
              <div className="input-group1">
                <input
                  type="text"
                  className="input2"
                  onChange={this.check}
                  placeholder="Customer123@gmail.com"
                  id="email"
                  autoFocus
                />
                <p className="error eemail hide">hello</p>
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
              <label className="lable">First Name</label>
              <div className="input-group1">
                <input
                  className="input2 in"
                  type="text"
                  placeholder="First Name"
                  id="fname"
                  onChange={this.check}
                  autoCapitalize="true"
                />
                <p className="error efname hide">hello</p>
              </div>
              <label className="lable">Last Name</label>
              <div className="input-group1">
                <input
                  className="input2"
                  type="text"
                  placeholder="Last Name"
                  id="lname"
                  onChange={this.check}
                  autoCapitalize="true"
                />
                <p className="error elname hide">hello</p>
              </div>
              <label className="lable">Phone Number</label>
              <div className="input-group1">
                <input
                  className="input2"
                  type="tel"
                  placeholder="Phone Number"
                  id="tel"
                  onChange={this.check}
                />
                <p className="error etel hide">hello</p>
              </div>
              <label className="lable">Code</label>
              <div className="input-group1">
                <div className="flex">
                  <input
                    className="input2"
                    type="password"
                    placeholder="4 digit PIN Number"
                    id="pin"
                    onChange={this.check}
                  />
                  <ion-icon
                    name="eye-off-outline"
                    onClick={this.hide1}
                    id="eye1"
                  ></ion-icon>
                </div>
                <p className="error epin hide">hello</p>
              </div>
              <label className="lable">Password</label>
              <div className="input-group1">
                <div className="flex">
                  <input
                    className="input2"
                    type="password"
                    placeholder="Password"
                    id="pass"
                    onChange={this.check}
                  />
                  <ion-icon
                    name="eye-off-outline"
                    onClick={this.hide2}
                    id="eye2"
                  ></ion-icon>
                </div>
                <p className="error epass hide">hello</p>
              </div>
              <label className="lable">Confirm Password</label>
              <div className="input-group1">
                <input
                  className="input2"
                  type="password"
                  placeholder="Confirm Password"
                  id="cpass"
                  onChange={this.check}
                />
                <p className="error ecpass hide">hello</p>
              </div>
              <p className="alert1 hide full">hello</p>
              <input
                type="submit"
                className="sub2 s top"
                onClick={this.submit}
                value="Update"
              />
              <input
                type="submit"
                className="sub2 s top idel"
                onClick={this.show}
                value="Delete"
              />
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
            <span className="icdel">Customer Account</span>?
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
