import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";

export class Forgot extends React.Component {
  check = () => {
    document.querySelector(".alert1").classList.add("hide");
    let email = document.getElementById("user").value;

    if (email.length >= 50) {
      document.querySelector(".eemail").innerHTML =
        "Invalid Email ID provided!";
      document.querySelector(".eemail").classList.remove("hide");
    } else document.querySelector(".eemail").classList.add("hide");
  };
  submit = (e) => {
    let email = document.getElementById("user").value;
    let pin = parseInt(document.getElementById("pin").value);

    e.preventDefault();
    if (email.length == 0) {
      document.querySelector(".eemail").innerHTML = "Data not Provided!";
      document.querySelector(".eemail").classList.remove("hide");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      document.querySelector(".eemail").innerHTML =
        "Invalid Email ID provided!";
      document.querySelector(".eemail").classList.remove("hide");
    } else document.querySelector(".eemail").classList.add("hide");

    if (String(pin)[0] == "N") {
      document.querySelector(".epin").innerHTML = "Pin not Provided!!";
      document.querySelector(".epin").classList.remove("hide");
    } else if (pin < 1000 || pin > 9999) {
      document.querySelector(".epin").innerHTML =
        "Value should be bettween 1000 and 9999";
      document.querySelector(".epin").classList.remove("hide");
    } else document.querySelector(".epin").classList.add("hide");

    if (
      document.querySelector(".eemail").classList.contains("hide") &&
      document.querySelector(".epin").classList.contains("hide")
    )
      axios
        .post("http://localhost:56064/Api/Market/Forgot", {
          Email: document.getElementById("user").value,
          Pin: parseInt(document.getElementById("pin").value),
        })
        .then((x) => {
          if (x.data)
            this.props.history.push({
              pathname: "/Reset",
              state: { Email: document.getElementById("user").value },
            });
          else {
            document.querySelector(".alert1").innerHTML =
              "Invalid UserID or PIN Provided!";
            document.querySelector(".alert1").classList.remove("hide");
            this.props.history.push("/Forgot");
          }
        });
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
          <h1>Forgot Password</h1>
          <form className="form">
            <div className="input-group">
              <label className="lable">User ID</label>
              <input
                type="text"
                className="input1"
                onChange={this.check}
                placeholder="user123@gmail.com"
                id="user"
                autoFocus
              />
              <p className="error eemail hide">hello</p>
            </div>
            <div className="input-group">
              <label className="lable">Code</label>
              <input
                className="input1"
                min="1000"
                max="9990"
                type="number"
                placeholder="4 digit PIN Number"
                id="pin"
                onChange={this.check}
              />
              <p className="error epin hide">hello</p>
            </div>
            <div className="flex1">
              <p className="alert1 hide">hello</p>
              <input
                type="button"
                onClick={this.submit}
                className="sub icheck"
                value="Check"
              />
            </div>
          </form>
          <div className="flex">
            <Link to="/" className="format link big">
              <span className="link">Back To Login</span>
            </Link>
          </div>
        </div>
      </div>
    );
  };
}
