import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

export class AdminReset extends React.Component {
  submit = (e) => {
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
          if (x.data) this.props.history.push("/AdminLogin");
          else this.props.history.push("/AdminReset");
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
  render = () => {
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
          <h1>Reset Password</h1>
          <form className="form">
            <div className="input-group">
              <label className="lable">Password</label>
              <div className="flex">
                <input
                  className="input1"
                  type="password"
                  placeholder="Password"
                  id="pass"
                  onChange={this.check}
                  autoFocus
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
                onChange={this.check}
              />
              <p className="error ecpass hide">hello</p>
            </div>
            <input
              type="button"
              onClick={this.submit}
              className="sub"
              value="Reset"
            />
          </form>
        </div>
      </div>
    );
  };
}
