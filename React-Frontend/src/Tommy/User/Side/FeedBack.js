import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Nav } from "../Nav";

export class FeedBack extends React.Component {
  state = { Querys: [] };

  submit = () => {
    var rates = document.getElementsByName("Question1");
    var rate_value1;
    for (var i = 0; i < rates.length; i++)
      if (rates[i].checked) rate_value1 = rates[i].value;

    var rates = document.getElementsByName("Question2");
    var rate_value2;
    for (var i = 0; i < rates.length; i++)
      if (rates[i].checked) rate_value2 = rates[i].value;

    var rates = document.getElementsByName("Question3");
    var rate_value3;
    for (var i = 0; i < rates.length; i++)
      if (rates[i].checked) rate_value3 = rates[i].value;

    var rates = document.getElementsByName("Question4");
    var rate_value4;
    for (var i = 0; i < rates.length; i++)
      if (rates[i].checked) rate_value4 = rates[i].value;

    var rates = document.getElementsByName("Question5");
    var rate_value5;
    for (var i = 0; i < rates.length; i++)
      if (rates[i].checked) rate_value5 = rates[i].value;

    var rates = document.getElementsByName("Question6");
    var rate_value6;
    for (var i = 0; i < rates.length; i++)
      if (rates[i].checked) rate_value6 = rates[i].value;

    if (
      rate_value1 == undefined &&
      rate_value2 == undefined &&
      rate_value3 == undefined &&
      rate_value4 == undefined &&
      rate_value5 == undefined &&
      rate_value6 == undefined &&
      document.querySelector(".area").value.length == 0
    ) {
      document.querySelector(".feed").innerHTML =
        "Sufficient Data not Provided to procced further!";
      document.querySelector(".feed").classList.remove("hide");
    } else {
      document.querySelector(".feed").classList.add("hide");

      axios
        .post("http://localhost:56064/Api/Market/FeedBack", {
          UserID: this.props.location.state.Email,
          UserName: this.props.location.state.FirstName,
          Question1: document.querySelector(".q1").innerHTML,
          Option1: rate_value1,
          Question2: document.querySelector(".q2").innerHTML,
          Option2: rate_value2,
          Question3: document.querySelector(".q3").innerHTML,
          Option3: rate_value3,
          Question4: document.querySelector(".q4").innerHTML,
          Option4: rate_value4,
          Question5: document.querySelector(".q5").innerHTML,
          Option5: rate_value5,
          Question6: document.querySelector(".q6").innerHTML,
          Option6: rate_value6,
          Question7: document.querySelector(".q7").innerHTML,
          Comment: document.querySelector(".area1").value,
        })
        .then((x) => {
          if (x.data)
            this.props.history.push({
              pathname: "/Home",
              state: this.props.location.state,
            });
          else
            this.props.history.push({
              pathname: "/FeedBack",
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

  componentDidMount = () => {
    axios
      .get("http://localhost:56064/Api/Market/GetFeedBackQuestions")
      .then((response) => {
        this.setState({
          Querys: [response.data],
        });
      });
  };

  render = () => {
    const Questions = this.state.Querys.map((que, i) => (
      <div>
        <div className="grid" key={i}>
          <div></div>
          <p className="heading">Very Good</p>
          <p className="heading">Good</p>
          <p className="heading">Fair</p>
          <p className="heading">Poor</p>
          <p className="heading">Very Poor</p>
          <div className="heading q1">{que.Question1}</div>
          <input
            type="radio"
            className="radio"
            name="Question1"
            value="Very Good"
          />
          <input type="radio" className="radio" name="Question1" value="Good" />
          <input type="radio" className="radio" name="Question1" value="Fair" />
          <input type="radio" className="radio" name="Question1" value="Poor" />
          <input
            type="radio"
            className="radio"
            name="Question1"
            value="Very Poor"
          />
          <div className="heading q2">{que.Question2}</div>
          <input
            type="radio"
            className="radio"
            name="Question2"
            value="Very Good"
          />
          <input type="radio" className="radio" name="Question2" value="Good" />
          <input type="radio" className="radio" name="Question2" value="Fair" />
          <input type="radio" className="radio" name="Question2" value="Poor" />
          <input
            type="radio"
            className="radio"
            name="Question2"
            value="Very Poor"
          />
          <div className="heading q3">{que.Question3}</div>
          <input
            type="radio"
            className="radio"
            name="Question3"
            value="Very Good"
          />
          <input type="radio" className="radio" name="Question3" value="Good" />
          <input type="radio" className="radio" name="Question3" value="Fair" />
          <input type="radio" className="radio" name="Question3" value="Poor" />
          <input
            type="radio"
            className="radio"
            name="Question3"
            value="Very Poor"
          />
          <div className="heading q4">{que.Question4}</div>
          <input
            type="radio"
            className="radio"
            name="Question4"
            value="Very Good"
          />
          <input type="radio" className="radio" name="Question4" value="Good" />
          <input type="radio" className="radio" name="Question4" value="Fair" />
          <input type="radio" className="radio" name="Question4" value="Poor" />
          <input
            type="radio"
            className="radio"
            name="Question4"
            value="Very Poor"
          />
          <div className="heading q5">{que.Question5}</div>
          <input
            type="radio"
            className="radio"
            name="Question5"
            value="Very Good"
          />
          <input type="radio" className="radio" name="Question5" value="Good" />
          <input type="radio" className="radio" name="Question5" value="Fair" />
          <input type="radio" className="radio" name="Question5" value="Poor" />
          <input
            type="radio"
            className="radio"
            name="Question5"
            value="Very Poor"
          />
          <div className="heading q6">{que.Question6}</div>
          <input
            type="radio"
            className="radio"
            name="Question6"
            value="Very Good"
          />
          <input type="radio" className="radio" name="Question6" value="Good" />
          <input type="radio" className="radio" name="Question6" value="Fair" />
          <input type="radio" className="radio" name="Question6" value="Poor" />
          <input
            type="radio"
            className="radio"
            name="Question6"
            value="Very Poor"
          />
        </div>
        <p className="heading flexs q7 area">{que.Question7}</p>
        <textarea
          className="flexs1 radio area area1 change1"
          rows="4"
          cols="50"
        ></textarea>
      </div>
    ));
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
          <div className="login">
            <h1>Customer Feedback Form</h1>
            <p className="para">
              Please take a few minutes to give us feedback about our service by
              filling in this short Customer Feedback Form. We are conducting
              this research in order to measure your level of satisfaction with
              the quality of our service. We thank you for your participation.
            </p>
            <h2 className="head">Overall experience with our service</h2>
            {Questions}
            <p className="alert feed hide">hello</p>
            <input
              type="button"
              onClick={this.submit}
              className="sub1 mart"
              value="Send FeedBack"
            />
          </div>
        </div>
      </div>
    );
  };
}
