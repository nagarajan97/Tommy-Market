import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";

export class Verify extends React.Component {
  hide = () => {
    document.getElementById("pass").type =
      document.getElementById("pass").type === "password" ? "text" : "password";
    document.getElementById("eye").name =
      document.getElementById("eye").name === "eye-outline"
        ? "eye-off-outline"
        : "eye-outline";
  };
  check = () => {
    document.querySelector(".alert1").classList.add("hide");
  };
  submit = (e) => {
    let pass = document.getElementById("pass").value;

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
    if (document.querySelector(".epass").classList.contains("hide"))
      axios
        .post("http://localhost:56064/Api/Market/Login", {
          Email: this.props.location.state.Email,
          Password: document.getElementById("pass").value,
        })
        .then((x) => {
          if (x.data.Email != "-1")
            this.props.history.push({
              pathname: "/Profile",
              state: x.data,
            });
          else {
            document.querySelector(".alert1").innerHTML =
              "Invalid Password Provided!";
            document.querySelector(".alert1").classList.remove("hide");

            this.props.history.push({
              pathname: "/Verify",
              state: this.props.location.state,
            });
          }
        });
  };
  render = () => {
    return (
      <div>
        <div className="nav1">
          <Link
            to={{
              pathname: "/Home",
              state: { ...this.props.location.state },
            }}
            className="nav-link"
          >
            Home
          </Link>
          <Link to="/" className="nav-link idel">
            Logout
          </Link>
        </div>
        <div>
          <form className="form">
            <div className="input-group">
              <div className="flex">
                <input
                  className="input1 high"
                  type="password"
                  onChange={this.check}
                  placeholder="Current Password"
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
                type="submit"
                className="sub1"
                onClick={this.submit}
                value="Proceed"
              />
            </div>
          </form>
        </div>
      </div>
    );
  };
}
