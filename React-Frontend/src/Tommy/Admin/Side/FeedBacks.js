import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

export class FeedBacks extends React.Component {
  state = { FeedBacks: [], tot: [] };

  check = () => {
    if (document.querySelector("#email").value.length != 0)
      axios
        .get(
          "http://localhost:56064/Api/Market/SearchFeed?id=" +
            document.querySelector("#email").value
        )
        .then((response) => {
          this.setState({ FeedBacks: response.data });
        });
    else this.componentDidMount();
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

  close = () => {
    document.querySelector(".modal").classList.add("hide");
    document.querySelector(".overlay").classList.add("hide");
  };

  show = (id) => {
    document.querySelector(".modal").classList.remove("hide");
    document.querySelector(".overlay").classList.remove("hide");
    this.setState({ id: id });
  };

  delete = () => {
    axios
      .delete(
        "http://localhost:56064/Api/Market/DeleteFeed?id=" + this.state.id
      )
      .then(() => {
        this.componentDidMount();
      });
    document.querySelector(".modal").classList.add("hide");
    document.querySelector(".overlay").classList.add("hide");
    document
      .querySelectorAll(".num")
      .forEach((ele) => ele.classList.remove("active"));
    document.querySelectorAll(".num")[0].classList.add("active");
  };

  pages = (i) => {
    document
      .querySelectorAll(".num")
      .forEach((ele) => ele.classList.remove("active"));
    document.querySelectorAll(".num").forEach((ele) => {
      if (ele.innerHTML == i + 1) ele.classList.add("active");
    });
    this.setState({
      FeedBacks: [...this.state.tot.slice(i * 4, i * 4 + 4)],
    });
  };

  PageUp = () => {
    let pos, i;
    document.querySelectorAll(".num").forEach((ele) => {
      if (ele.classList.contains("active")) pos = parseInt(ele.innerHTML);
    });
    document
      .querySelectorAll(".num")
      .forEach((ele) => ele.classList.remove("active"));
    if (pos == 3) {
      document.querySelectorAll(".num")[0].classList.add("active");
      i = 0;
    } else {
      document.querySelectorAll(".num")[pos].classList.add("active");
      i = pos;
    }
    this.setState({
      FeedBacks: [...this.state.tot.slice(i * 4, i * 4 + 4)],
    });
  };

  PageDown = () => {
    let pos, i;
    document.querySelectorAll(".num").forEach((ele) => {
      if (ele.classList.contains("active")) pos = parseInt(ele.innerHTML);
    });
    document
      .querySelectorAll(".num")
      .forEach((ele) => ele.classList.remove("active"));
    if (pos == 1) {
      document
        .querySelectorAll(".num")
        [Math.ceil(this.state.tot.length / 4) - 1].classList.add("active");
      i = Math.ceil(this.state.tot.length / 4) - 1;
    } else {
      document.querySelectorAll(".num")[pos - 2].classList.add("active");
      i = pos - 2;
    }
    this.setState({
      FeedBacks: [...this.state.tot.slice(i * 4, i * 4 + 4)],
    });
  };

  componentDidMount() {
    axios
      .get("http://localhost:56064/Api/Market/FeedDetails")
      .then((response) => {
        this.setState({
          FeedBacks: response.data.slice(0, 4),
          tot: response.data,
        });
      });
  }

  render = () => {
    console.log(this.props.location.state);

    let arr = [];
    for (let i = 0; i < this.state.tot.length / 4; i++) arr.push(i);
    let btns = arr.map((i) =>
      i == 0 ? (
        <button className="num active" key={i} onClick={() => this.pages(i)}>
          {i + 1}
        </button>
      ) : (
        <button className="num" key={i} onClick={() => this.pages(i)}>
          {i + 1}
        </button>
      )
    );

    let Feeds = this.state.FeedBacks.map((feed, i) => (
      <main className="com1 feedbackbtns" key={i}>
        <div className="flex3">
          <p className="feedid">{feed.UserID}</p>
          <p className="feedid">{feed.UserName}</p>
        </div>
        <div className="feedbackgrid1">
          <p>{feed.Question1}</p>
          <p
            className={
              feed.Option1 == "Very Good" || feed.Option1 == "Good"
                ? "answer-good"
                : feed.Option1 == "Fair"
                ? "answer-fair"
                : "answer-poor"
            }
          >
            {feed.Option1}
          </p>
        </div>
        <div className="feedbackgrid1">
          <p>{feed.Question2}</p>
          <p
            className={
              feed.Option2 == "Very Good" || feed.Option2 == "Good"
                ? "answer-good"
                : feed.Option2 == "Fair"
                ? "answer-fair"
                : "answer-poor"
            }
          >
            {feed.Option2}
          </p>
        </div>
        <div className="feedbackgrid1">
          <p>{feed.Question3}</p>
          <p
            className={
              feed.Option3 == "Very Good" || feed.Option3 == "Good"
                ? "answer-good"
                : feed.Option3 == "Fair"
                ? "answer-fair"
                : "answer-poor"
            }
          >
            {feed.Option3}
          </p>
        </div>
        <div className="feedbackgrid1">
          <p>{feed.Question4}</p>
          <p
            className={
              feed.Option4 == "Very Good" || feed.Option4 == "Good"
                ? "answer-good"
                : feed.Option4 == "Fair"
                ? "answer-fair"
                : "answer-poor"
            }
          >
            {feed.Option4}
          </p>
        </div>
        <div className="feedbackgrid1">
          <p>{feed.Question5}</p>
          <p
            className={
              feed.Option5 == "Very Good" || feed.Option5 == "Good"
                ? "answer-good"
                : feed.Option5 == "Fair"
                ? "answer-fair"
                : "answer-poor"
            }
          >
            {feed.Option5}
          </p>
        </div>
        <div className="feedbackgrid1">
          <p>{feed.Question6}</p>
          <p
            className={
              feed.Option6 == "Very Good" || feed.Option6 == "Good"
                ? "answer-good"
                : feed.Option6 == "Fair"
                ? "answer-fair"
                : "answer-poor"
            }
          >
            {feed.Option6}
          </p>
        </div>
        <div className="feedbackgrid2">
          <p>{feed.Question7}</p>
          <p className="feedcmt">{feed.Comment}</p>
        </div>
        <div className="feedbackbtn">
          <input
            type="submit"
            className="sub2 s idel"
            onClick={() => this.show(feed.ID)}
            value="Delete"
          />
        </div>
      </main>
    ));
    if (this.state.tot.length != 0) {
      if (Feeds.length == 0) {
        Feeds = (
          <section className="feedbackgrid3">
            <p className="nores">
              No Results for "{document.querySelector("#email").value}"
            </p>
            <p>
              No Such FeedBack Found For A Give UserID! Try with different
              UserID.
            </p>
          </section>
        );
        document.querySelector(".pagebar").classList.add("hide");
      } else {
        Feeds = <section className="feedbackgrid">{Feeds}</section>;
        if (document.querySelector("#email").value.length == 0)
          document.querySelector(".pagebar").classList.remove("hide");
        else document.querySelector(".pagebar").classList.add("hide");
      }
    }

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
          <div className="flex4">
            <ion-icon id="ion1" name="search-outline"></ion-icon>
            <input
              type="search"
              className="Search"
              onChange={this.check}
              placeholder="Search"
              id="email"
              autoComplete="off"
            />
          </div>
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
          <div onClick={this.fold} className="adminflex1">
            <h1 className="UpdateCustomer">FeedBacks</h1>
            {Feeds}
          </div>
        </div>
        <div className="pagebar flex5">
          <ion-icon
            id="pageicon"
            onClick={this.PageDown}
            name="chevron-back-outline"
          ></ion-icon>
          <div className="nums">{btns}</div>
          <ion-icon
            id="pageicon"
            onClick={this.PageUp}
            name="chevron-forward-outline"
          ></ion-icon>
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
            <span className="icdel">Customer FeedBack </span>?
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
