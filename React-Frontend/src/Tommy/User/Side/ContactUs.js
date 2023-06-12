import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Nav } from "../Nav";

export class ContactUs extends React.Component {
  submit = () => {
    if (document.querySelector(".carea").value.length == 0) {
      document.querySelector(".calert").innerHTML =
        "Data not Provided to procced further!";
      document.querySelector(".calert").classList.remove("hide");
    } else {
      document.querySelector(".calert").classList.add("hide");

      axios
        .post("http://localhost:56064/Api/Market/ContactUs", {
          UserID: this.props.location.state.Email,
          UserName: this.props.location.state.FirstName,
          Comment: document.querySelector(".carea").value,
        })
        .then((x) => {
          if (x.data)
            this.props.history.push({
              pathname: "/Home",
              state: this.props.location.state,
            });
          else
            this.props.history.push({
              pathname: "/ContactUs",
              state: this.props.location.state,
            });
        });
    }
  };

  menu = () => {
    if (document.querySelector(".open-close").classList.contains("admingrid")) {
      document.querySelector(".open-close").classList.remove("admingrid");
      document.querySelector(".open-close").classList.add("closeadmingrid");
      document.querySelector(".sec1").classList.add("hide");
      document.querySelector(".menu").name = "menu-outline";
      document.querySelector(".menu").classList.remove("close");
      document.querySelector(".center").classList.remove("icenter");
    } else {
      document.querySelector(".open-close").classList.remove("closeadmingrid");
      document.querySelector(".open-close").classList.add("admingrid");
      document.querySelector(".sec1").classList.remove("hide");
      document.querySelector(".menu").name = "close-outline";
      document.querySelector(".menu").classList.add("close");
      document.querySelector(".center").classList.add("icenter");
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
        <ion-icon
          class="menu"
          onClick={this.menu}
          name="menu-outline"
        ></ion-icon>
        <div className="open-close closeadmingrid">
        <Nav nav={this.props.location.state} />
          <div onClick={this.fold}>
            <div className="center">
              <div className="ccenter">
                <p className="question qu">GOT A QUESTION?</p>

                <h1 className="contactP">Contact ProduceCity</h1>
                <p className="para">
                  We’re here to help and answer any question you <br />
                  might have. We look forward to hearing from you <br />
                  <span>🙂</span>
                </p>
              </div>
              <div className="ccenter c1">
                <h1 className="Chead">Drop us a line</h1>
                <div className="para">
                  <label className="lable fstart">Message</label>
                  <textarea
                    className="carea"
                    placeholder="Write your message for the team here!"
                    rows="4"
                    cols="50"
                  ></textarea>
                  <p className="alert calert hide">hello</p>
                  <input
                    type="button"
                    onClick={this.submit}
                    className="sub1 iadd"
                    value="Send Message"
                  />
                </div>
              </div>
            </div>
            <div className="newcenter">
              <h1>Contact Information</h1>
              <div className="flex2">
                <ion-icon name="location-outline"></ion-icon>
                <p>
                  63, Anna Salai, Little Mount, Guindy, Chennai, Tamil Nadu
                  600032
                </p>
              </div>
              <div className="flex2">
                <ion-icon name="call-outline"></ion-icon>
                <a className="link1" href="tel:+4571997707">
                  +4571997707
                </a>
              </div>
              <div className="flex2">
                <ion-icon name="mail-outline"></ion-icon>
                <a className="link1" href="mailto:mail@ProduceCity.com">
                  Mail@ProduceCity.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
