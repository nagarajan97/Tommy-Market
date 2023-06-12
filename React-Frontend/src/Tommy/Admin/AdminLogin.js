import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export class AdminLogin extends React.Component {
  check = () => {
    document.querySelector(".alert1").classList.add("hide");
    let email = document.getElementById("user").value;

    if (email.length >= 50) {
      document.querySelector(".euser").innerHTML = "Invalid Email ID provided!";
      document.querySelector(".euser").classList.remove("hide");
    } else document.querySelector(".euser").classList.add("hide");
  };
  submit = (e) => {
    let email = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;

    e.preventDefault();
    if (email.length == 0) {
      document.querySelector(".euser").innerHTML = "Data not Provided!";
      document.querySelector(".euser").classList.remove("hide");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      document.querySelector(".euser").innerHTML = "Invalid Email ID provided!";
      document.querySelector(".euser").classList.remove("hide");
    } else document.querySelector(".euser").classList.add("hide");

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
      pass.length <= 30
    )
      document.querySelector(".epass").classList.add("hide");
    else if (
      pass.length == 0 ||
      pass.length >= 30 ||
      pass.length < 6 ||
      Uletter < 1 ||
      Lletter < 1 ||
      digit < 1 ||
      special < 1
    ) {
      document.querySelector(".epass").innerHTML = "Invalid Password Provided!";
      document.querySelector(".epass").classList.remove("hide");
    }
    if (
      document.querySelector(".euser").classList.contains("hide") &&
      document.querySelector(".epass").classList.contains("hide")
    )
      axios
        .post("http://localhost:56064/Api/Market/AdminLogin", {
          Email: document.getElementById("user").value,
          Password: document.getElementById("pass").value,
        })
        .then((x) => {
          if (x.data.Email != "-1") {
            this.props.history.push({
              pathname: "/AdminHome",
              state: x.data,
            });
          } else {
            document.querySelector(".alert1").innerHTML =
              "Invalid AdminID or Password Provided!";
            document.querySelector(".alert1").classList.remove("hide");
            this.props.history.push("/AdminLogin");
          }
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
          <h1>Admin Login</h1>
          <form className="form">
            <div className="input-group">
              <label className="lable">Admin ID</label>
              <input
                type="text"
                className="input1"
                onChange={this.check}
                placeholder="Admin123@gmail.com"
                id="user"
                autoFocus
              />
              <p className="error euser hide">hello</p>
            </div>
            <div className="input-group">
              <div className="forget">
                <label className="lable">Password</label>
                <Link to="/AdminForgot" className="format link">
                  Forgot Password ?
                </Link>
              </div>
              <div className="flex">
                <input
                  type="password"
                  className="input1"
                  onChange={this.check}
                  placeholder="Password@123"
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
            <div className="flex1">
              <p className="alert1 hide">hello</p>
              <input
                type="button"
                onClick={this.submit}
                className="sub"
                value="Login"
              />
            </div>
          </form>
          <div className="flex">
            <p className="format">Don't have an account?</p>
            <Link to="/AdminSignUp" className="format link big">
              <span className="link">SiginUp</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
