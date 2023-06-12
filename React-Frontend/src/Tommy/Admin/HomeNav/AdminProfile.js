import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";

export class AdminProfile extends React.Component {
  passsubmit = (e) => {
    let pass = document.getElementById("pass").value;
    let cpass = document.getElementById("cpass").value;

    e.preventDefault();

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
      document.querySelector(".epass").classList.contains("hide") &&
      document.querySelector(".ecpass").classList.contains("hide")
    )
      axios
        .post("http://localhost:56064/Api/Market/AdminResetpass", {
          Email: this.props.location.state.Email,
          Password: document.getElementById("pass").value,
          ConfirmPassword: document.getElementById("cpass").value,
        })
        .then((x) => {
          this.props.history.push({
            pathname: "/AdminHome",
            state: x.data,
          });
        });
  };
  hide = () => {
    document.getElementById("pass").type =
      document.getElementById("pass").type === "password" ? "text" : "password";
    document.getElementById("eye").name =
      document.getElementById("eye").name === "eye-outline"
        ? "eye-off-outline"
        : "eye-outline";
  };
  submit = (e) => {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let tel = document.getElementById("tel").value;

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

    if (
      document.querySelector(".efname").classList.contains("hide") &&
      document.querySelector(".elname").classList.contains("hide") &&
      document.querySelector(".etel").classList.contains("hide")
    )
      axios
        .post("http://localhost:56064/Api/Market/AdminReset", {
          Email: this.props.location.state.Email,
          FirstName: document.getElementById("fname").value,
          LastName: document.getElementById("lname").value,
          Number: document.getElementById("tel").value,
        })
        .then((x) => {
          this.props.history.push({
            pathname: "/AdminHome",
            state: x.data,
          });
        });
  };
  check = () => {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let tel = document.getElementById("tel").value;

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

    if (tel.length > 13) {
      document.querySelector(".etel").innerHTML = "Invalid Number Provided!";
      document.querySelector(".etel").classList.remove("hide");
    } else document.querySelector(".etel").classList.add("hide");
    document.querySelector(".epin").classList.add("hide");
  };
  render = () => {
    return (
      <div>
        <div className="nav1">
          <Link
            to={{
              pathname: "/AdminHome",
              state: { ...this.props.location.state },
            }}
            className="nav-link"
          >
            Back to Home
          </Link>
          <Link to="/AdminLogin" className="nav-link idel">
            Logout
          </Link>
        </div>

        <div className="login">
          <h1>Change Name, Phone Number etc</h1>
          <form className="form">
            <div className="input-group">
              <label className="lable">Email ID</label>
              <input
                className="input1"
                defaultValue={this.props.location.state.Email}
                style={{ cursor: "not-allowed" }}
                type="email"
                id="email"
                disabled
              />
              <p className="error eemail hide">hello</p>
            </div>
            <div className="input-group">
              <label className="lable">First Name</label>
              <input
                className="input1 in"
                type="text"
                placeholder="First Name"
                id="fname"
                onChange={this.check}
                defaultValue={this.props.location.state.FirstName}
                autoFocus
              />
              <p className="error efname hide">hello</p>
            </div>
            <div className="input-group">
              <label className="lable">Last Name</label>
              <input
                className="input1"
                type="text"
                placeholder="Last Name"
                id="lname"
                defaultValue={this.props.location.state.LastName}
                onChange={this.check}
                autoCapitalize="true"
              />
              <p className="error elname hide">hello</p>
            </div>
            <div className="input-group">
              <label className="lable">Phone Number</label>
              <input
                className="input1"
                type="tel"
                placeholder="Phone Number"
                id="tel"
                defaultValue={this.props.location.state.Number}
                onChange={this.check}
              />
              <p className="error etel hide">hello</p>
            </div>
            <input
              type="submit"
              className="sub"
              onClick={this.submit}
              value="Save"
            />
          </form>
        </div>

        <div className="login">
          <h1>Change Password</h1>
          <form className="form">
            <div className="input-group">
              <label className="lable">Password</label>
              <div className="flex">
                <input
                  className="input1"
                  type="password"
                  placeholder="Password"
                  id="pass"
                />
                <ion-icon
                  name="eye-off-outline"
                  onClick={this.hide}
                  id="eye"
                ></ion-icon>
              </div>
              <p className="error epass hide">hello</p>
            </div>
            <div className="input-group">
              <label className="lable">Confirm Password</label>
              <input
                className="input1"
                type="password"
                placeholder="Confirm Password"
                id="cpass"
              />
              <p className="error ecpass hide">hello</p>
            </div>
            <input
              type="submit"
              className="sub"
              onClick={this.passsubmit}
              value="Change Password"
            />
          </form>
        </div>
      </div>
    );
  };
}
