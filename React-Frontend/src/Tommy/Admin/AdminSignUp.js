import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export class AdminSignUp extends React.Component {
  submit = (e) => {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let tel = document.getElementById("tel").value;
    let pin = document.getElementById("pin").value;
    let code = parseInt(document.getElementById("code").value);
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

    let [Uletter, Lletter, digit, special] = [0, 0, 0, 0];
    for (let i = 0; i < pin.length; i++) {
      if (/[A-Z]/.test(pin[i])) Uletter++;
      else if (/[a-z]/.test(pin[i])) Lletter++;
      else if (/[0-9]/.test(pin[i])) digit++;
      else special++;
    }

    if (Uletter == 0 && Lletter == 0 && special == 0 && pin.length == 4)
      document.querySelector(".epin").classList.add("hide");
    else if (pin.length == 0) {
      document.querySelector(".epin").innerHTML = "PIN not Provided!!!";
      document.querySelector(".epin").classList.remove("hide");
    } else if (pin.length > 4 || pin.length < 4) {
      document.querySelector(".epin").innerHTML =
        "Provide Four Digit PIN Number";
      document.querySelector(".epin").classList.remove("hide");
    } else if (Uletter >= 1) {
      document.querySelector(".epin").innerHTML =
        "PIN contains UpperCase Characters! Provide only an Four Digit Number.";
      document.querySelector(".epin").classList.remove("hide");
    } else if (Lletter >= 1) {
      document.querySelector(".epin").innerHTML =
        "PIN contains LowerCase Characters! Provide only an Four Digit Number.";
      document.querySelector(".epin").classList.remove("hide");
    } else if (special >= 1) {
      document.querySelector(".epin").innerHTML =
        "PIN contains Special Characters! Provide only an Four Digit Number.";
      document.querySelector(".epin").classList.remove("hide");
    }

    [Uletter, Lletter, digit, special] = [0, 0, 0, 0];
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
      document.querySelector(".ecode").classList.contains("hide") &&
      document.querySelector(".epin").classList.contains("hide") &&
      document.querySelector(".epass").classList.contains("hide") &&
      document.querySelector(".ecpass").classList.contains("hide")
    )
      axios
        .post("http://localhost:56064/Api/Market/AdminSignUp", {
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
          Pin: document.getElementById("pin").value,
          Code: parseInt(document.getElementById("code").value),
          Password: document.getElementById("pass").value,
          ConfirmPassword: document.getElementById("cpass").value,
        })
        .then((x) => {
          if (x.data) {
            this.props.history.push("/AdminLogin");
          } else {
            document.querySelector(".alert1").innerHTML =
              "Invalid Access Code Provided!";
            document.querySelector(".alert1").classList.remove("hide");
            this.props.history.push("/AdminSignUp");
          }
          this.clear();
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
  check = () => {
    document.querySelector(".alert1").classList.add("hide");
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let tel = document.getElementById("tel").value;
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
  render() {
    return (
      <div>
        <div className="nav">
          <Link to="/" className="nav-link">
            User Login
          </Link>
          <Link to="/AdminLogin" className="nav-link idel">
            Admin Login
          </Link>
        </div>

        <div className="login">
          <h1>Admin SignUp</h1>
          <form className="form">
            <div className="input-group">
              <label className="lable">First Name</label>
              <input
                className="input1 in"
                type="text"
                placeholder="First Name"
                id="fname"
                onChange={this.check}
                autoCapitalize="true"
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
                onChange={this.check}
                autoCapitalize="true"
              />
              <p className="error elname hide">hello</p>
            </div>
            <div className="input-group">
              <label className="lable">Email ID</label>
              <input
                className="input1"
                type="email"
                placeholder="Email ID"
                id="email"
                onChange={this.check}
              />
              <p className="error eemail hide">hello</p>
            </div>
            <div className="input-group">
              <label className="lable">Phone Number</label>
              <input
                className="input1"
                type="tel"
                placeholder="Phone Number"
                id="tel"
                onChange={this.check}
              />
              <p className="error etel hide">hello</p>
            </div>
            <div className="input-group">
              <label className="lable">Code</label>

              <div className="flex">
                <input
                  className="input1"
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
              <p className="alert">Remember PIN To Reset An Password Later.</p>
              <p className="error epin hide">hello</p>
            </div>

            <div className="input-group">
              <label className="lable">Access Code</label>
              <input
                className="input1"
                min="10000000"
                max="99999999"
                onChange={this.check}
                type="number"
                placeholder="8 digit Access Code"
                id="code"
              />
              <p className="error ecode hide">hello</p>
            </div>
            <div className="input-group">
              <label className="lable">Password</label>
              <div className="flex">
                <input
                  className="input1"
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
            <div className="input-group">
              <label className="lable">Confirm Password</label>
              <input
                className="input1"
                type="password"
                placeholder="Confirm Password"
                id="cpass"
                onChange={this.check}
              />
              <p className="error ecpass hide">hello</p>
            </div>
            <div className="flex1">
              <p className="alert1 hide">hello</p>
              <input
                type="submit"
                className="sub"
                onClick={this.submit}
                value="Create An Account"
              />
            </div>
          </form>
          <div className="flex">
            <p className="format">Already have an account?</p>
            <Link to="/AdminLogin" className="format link big">
              <span className="link">Login</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
