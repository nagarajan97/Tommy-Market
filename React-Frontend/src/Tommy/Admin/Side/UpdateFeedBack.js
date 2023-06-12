import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

export class UpdateFeedBack extends React.Component {
  state = { Questions: [] };

  check = () => {
    let q1 = document.getElementById("q1").value;
    let q2 = document.getElementById("q2").value;
    let q3 = document.getElementById("q3").value;
    let q4 = document.getElementById("q4").value;
    let q5 = document.getElementById("q5").value;
    let q6 = document.getElementById("q6").value;
    let q7 = document.getElementById("q7").value;

    if (q1 != "") document.querySelector(".q1").classList.add("hide");
    else {
      document.querySelector(".q1").innerHTML =
        "Provide an Question for an FeedBack Form!";
      document.querySelector(".q1").classList.remove("hide");
    }

    if (q2 == "") document.querySelector(".q2").classList.remove("hide");
    else {
      document.querySelector(".q2").innerHTML =
        "Provide an Question for an FeedBack Form!";
      document.querySelector(".q2").classList.add("hide");
    }

    if (q3 == "") document.querySelector(".q3").classList.remove("hide");
    else {
      document.querySelector(".q3").innerHTML =
        "Provide an Question for an FeedBack Form!";
      document.querySelector(".q3").classList.add("hide");
    }

    if (q4 == "") document.querySelector(".q4").classList.remove("hide");
    else {
      document.querySelector(".q4").innerHTML =
        "Provide an Question for an FeedBack Form!";
      document.querySelector(".q4").classList.add("hide");
    }

    if (q5 == "") document.querySelector(".q5").classList.remove("hide");
    else {
      document.querySelector(".q5").innerHTML =
        "Provide an Question for an FeedBack Form!";
      document.querySelector(".q5").classList.add("hide");
    }

    if (q6 == "") document.querySelector(".q6").classList.remove("hide");
    else {
      document.querySelector(".q6").innerHTML =
        "Provide an Question for an FeedBack Form!";
      document.querySelector(".q6").classList.add("hide");
    }

    if (q7 == "") document.querySelector(".q7").classList.remove("hide");
    else {
      document.querySelector(".q7").innerHTML =
        "Provide an Question for an FeedBack Form!";
      document.querySelector(".q7").classList.add("hide");
    }
  };

  Restore = (e) => {
    e.preventDefault();

    axios
      .get("http://localhost:56064/Api/Market/GetFeedBackQuestions")
      .then((response) => {
        document.getElementById("q1").value = response.data.Question1;
        document.getElementById("q2").value = response.data.Question2;
        document.getElementById("q3").value = response.data.Question3;
        document.getElementById("q4").value = response.data.Question4;
        document.getElementById("q5").value = response.data.Question5;
        document.getElementById("q6").value = response.data.Question6;
        document.getElementById("q7").value = response.data.Question7;
        document.querySelector(".alert1").innerHTML =
          "FeedBack Details Reset Succesfully!";
        document.querySelector(".alert1").classList.remove("hide");
        setTimeout(() => {
          document.querySelector(".alert1").classList.add("hide");
        }, 3 * 1000);
      });
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:56064/Api/Market/GetFeedBackQuestions")
      .then((response) => {
        this.setState({ Questions: response.data });
      });
  };

  Update = (e) => {
    e.preventDefault();
    this.check();

    if (
      document.querySelector(".q1").classList.contains("hide") &&
      document.querySelector(".q2").classList.contains("hide") &&
      document.querySelector(".q3").classList.contains("hide") &&
      document.querySelector(".q4").classList.contains("hide") &&
      document.querySelector(".q5").classList.contains("hide") &&
      document.querySelector(".q6").classList.contains("hide") &&
      document.querySelector(".q7").classList.contains("hide")
    )
      axios
        .post("http://localhost:56064/Api/Market/UpdateFeedBackQuestions", {
          Question1: document.getElementById("q1").value,
          Question2: document.getElementById("q2").value,
          Question3: document.getElementById("q3").value,
          Question4: document.getElementById("q4").value,
          Question5: document.getElementById("q5").value,
          Question6: document.getElementById("q6").value,
          Question7: document.getElementById("q7").value,
        })
        .then(() => {
          document.querySelector(".alert1").innerHTML =
            "FeedBack Details Updated Sucessfully!";
          document.querySelector(".alert1").classList.remove("hide");
          setTimeout(() => {
            document.querySelector(".alert1").classList.add("hide");
          }, 3 * 1000);
        });
  };

  menu = () => {
    if (document.querySelector(".open-close").classList.contains("admingrid")) {
      document.querySelector(".open-close").classList.remove("admingrid");
      document.querySelector(".open-close").classList.add("closeadmingrid");
      document.querySelector(".sec1").classList.add("hide");
      document.querySelector(".menu").name = "menu-outline";
      document.querySelector(".menu").classList.remove("close");
      document.querySelector(".falign1").classList.remove("ifalign1");
      document.querySelectorAll(".input5").forEach((ele) => {
        ele.classList.remove("iinput5");
      });
    } else {
      document.querySelector(".open-close").classList.remove("closeadmingrid");
      document.querySelector(".open-close").classList.add("admingrid");
      document.querySelector(".sec1").classList.remove("hide");
      document.querySelector(".menu").name = "close-outline";
      document.querySelector(".menu").classList.add("close");
      document.querySelector(".falign1").classList.add("ifalign1");
      document.querySelectorAll(".input5").forEach((ele) => {
        ele.classList.add("iinput5");
      });
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
            <h1 className="UpdateCustomer">Update Customer FeedBack Form</h1>
            <form className="falign1">
              <label className="lable cap">Question 1</label>
              <div className="input-group2">
                <textarea
                  className="input5"
                  id="q1"
                  defaultValue={this.state.Questions.Question1}
                  placeholder="Write FeedBack Question 1 Here!"
                  rows="2"
                />
                <p className="error q1 hide">hello</p>
              </div>
              <label className="lable cap">Question 2</label>
              <div className="input-group2">
                <textarea
                  className="input5"
                  id="q2"
                  defaultValue={this.state.Questions.Question2}
                  placeholder="Write FeedBack Question 2 Here!"
                  rows="2"
                />
                <p className="error q2 hide">hello</p>
              </div>
              <label className="lable cap">Question 3</label>
              <div className="input-group2">
                <textarea
                  className="input5"
                  id="q3"
                  defaultValue={this.state.Questions.Question3}
                  placeholder="Write FeedBack Question 3 Here!"
                  rows="2"
                />
                <p className="error q3 hide">hello</p>
              </div>
              <label className="lable cap">Question 4</label>
              <div className="input-group2">
                <textarea
                  className="input5"
                  id="q4"
                  defaultValue={this.state.Questions.Question4}
                  placeholder="Write FeedBack Question 4 Here!"
                  rows="2"
                />
                <p className="error q4 hide">hello</p>
              </div>
              <label className="lable cap">Question 5</label>
              <div className="input-group2">
                <textarea
                  className="input5"
                  id="q5"
                  defaultValue={this.state.Questions.Question5}
                  placeholder="Write FeedBack Question 5 Here!"
                  rows="2"
                />
                <p className="error q5 hide">hello</p>
              </div>
              <label className="lable cap">Question 6</label>
              <div className="input-group2">
                <textarea
                  className="input5"
                  id="q6"
                  defaultValue={this.state.Questions.Question6}
                  placeholder="Write FeedBack Question 6 Here!"
                  rows="2"
                />
                <p className="error q6 hide">hello</p>
              </div>
              <label className="lable cap">Question 7</label>
              <div className="input-group2">
                <textarea
                  className="input5"
                  id="q7"
                  defaultValue={this.state.Questions.Question7}
                  placeholder="Write FeedBack Question 7 Here!"
                  rows="2"
                />
                <p className="error q7 hide">hello</p>
              </div>
              <p className="alert1 hide full">hello</p>
              <div className="input-group3 full">
                <input
                  type="submit"
                  className="sub2 s icheck"
                  onClick={this.Restore}
                  value="Restore"
                />
                <input
                  type="submit"
                  className="sub2 s"
                  onClick={this.Update}
                  value="Update"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
}
