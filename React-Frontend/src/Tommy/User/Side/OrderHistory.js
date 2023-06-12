import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";
import { Nav } from "../Nav";

export class OrderHistory extends React.Component {
  state = { history: [], tot: [], Orders: [], Likes: [] };

  menu = () => {
    if (document.querySelector(".open-close").classList.contains("admingrid")) {
      document.querySelector(".open-close").classList.remove("admingrid");
      document.querySelector(".open-close").classList.add("closeadmingrid");
      document.querySelector(".sec1").classList.add("hide");
      document.querySelector(".menu").name = "menu-outline";
      document.querySelector(".menu").classList.remove("close");
      document
        .querySelector(".productsgrop3")
        .classList.remove("iproductsgrop3");
    } else {
      document.querySelector(".open-close").classList.remove("closeadmingrid");
      document.querySelector(".open-close").classList.add("admingrid");
      document.querySelector(".sec1").classList.remove("hide");
      document.querySelector(".menu").name = "close-outline";
      document.querySelector(".menu").classList.add("close");
      document.querySelector(".productsgrop3").classList.add("iproductsgrop3");
    }
  };

  fold = () => {
    if (!document.querySelector(".sec1").classList.contains("hide"))
      this.menu();
  };

  componentDidMount = () => {
    axios
      .get(
        "http://localhost:56064/Api/Market/GetHistory?id=" +
          this.props.location.state.Email
      )
      .then((response) => {
        this.setState({
          history: response.data,
        });
      });

    axios
      .get("http://localhost:56064/Api/Market/GetProducts")
      .then((response) => {
        this.setState({
          tot: response.data,
        });
      });

    axios
      .get(
        "http://localhost:56064/Api/Market/GetLikes?id=" +
          this.props.location.state.Email
      )
      .then((response) => {
        this.setState({
          Likes: response.data.map((i) => i["ProductID"]),
        });
      });
  };

  like = (i, pid) => {
    document.querySelector("#viewicon2" + pid).name = i
      ? "heart"
      : "heart-outline";
    if (i) {
      document.querySelector(".out" + pid).classList.add("hide");
      document.querySelector(".in1" + pid).classList.remove("hide");
      axios.post("http://localhost:56064/Api/Market/UpdateLike", {
        Email: this.props.location.state.Email,
        ProductID: pid,
        Wish: i,
      });
    } else {
      document.querySelector(".out" + pid).classList.remove("hide");
      document.querySelector(".in1" + pid).classList.add("hide");
      axios.post("http://localhost:56064/Api/Market/UpdateLike", {
        Email: this.props.location.state.Email,
        ProductID: pid,
        Wish: i,
      });
    }
  };

  render = () => {
    let dic = {};
    this.state.history.forEach((ele) => {
      dic[ele.Date] = 0;
    });
    this.state.history.forEach((ele) => {
      dic[ele.Date] += 1;
    });

    let Products = [],
      Categories = [],
      temp = this.state.history.map((ele) => ele["ProductID"]);
    Object.keys(dic).forEach((cid, i) => {
      let dpids = this.state.history.map((ele) =>
        ele["Date"] == cid ? ele["ProductID"] : null
      );
      let qty = this.state.history.map((ele) =>
        ele["Date"] == cid ? ele["Quantity"] : null
      );
      Products = [];
      Products.push(
        this.state.tot.map((i, index) =>
          temp.includes(i["ProductID"]) && dpids.includes(i["ProductID"]) ? (
            <div className="productcart" key={index}>
              <img
                className="productimg"
                src={"./images/" + i.ProductID + "1.jpg"}
              />
              <div className="proinfo">
                <Link
                  to={{
                    pathname: "/Product",
                    state: {
                      ...this.props.location.state,
                      pid: i.ProductID,
                      cid: i.CategoryID,
                      pro: i,
                    },
                  }}
                  className="name lname"
                >
                  <p className="name">
                    {i.ProductName}- {i.Description}
                  </p>
                </Link>
                <p className="price">
                  MRP : {i.Discount != 0 ? <del>&#8377;{i.Price}</del> : null}
                  <span className="special">
                    &#8377;
                    {parseFloat(
                      parseInt(i.Price) * (1 - parseFloat(i.Discount) / 100)
                    ).toFixed(2)}
                  </span>
                  {!this.state.Likes.includes(i.ProductID) ? (
                    <div>
                      <ion-icon
                        onClick={() => this.like(1, i.ProductID)}
                        id={"viewicon2" + i.ProductID}
                        class={"out out" + i.ProductID}
                        name="heart-outline"
                      ></ion-icon>
                      <ion-icon
                        onClick={() => this.like(0, i.ProductID)}
                        id={"viewicon2" + i.ProductID}
                        class={"in1 in1" + i.ProductID + " hide"}
                        name="heart"
                      ></ion-icon>
                    </div>
                  ) : (
                    <div>
                      <ion-icon
                        onClick={() => this.like(1, i.ProductID)}
                        id={"viewicon2" + i.ProductID}
                        class={"out out" + i.ProductID + " hide"}
                        name="heart-outline"
                      ></ion-icon>
                      <ion-icon
                        onClick={() => this.like(0, i.ProductID)}
                        id={"viewicon2" + i.ProductID}
                        class={"in1 in1" + i.ProductID}
                        name="heart"
                      ></ion-icon>
                    </div>
                  )}
                </p>
                <div className="ordered">
                  <p>Ordered</p>
                  <p>{qty[dpids.findIndex((x) => x == i.ProductID)]}</p>
                </div>
              </div>
              {i.QualityCheck == true ? (
                <div className="float">
                  <ion-icon
                    id="ionicon"
                    name="shield-checkmark-outline"
                  ></ion-icon>
                  <p className="brand">Tommy Assured</p>
                </div>
              ) : (
                <div></div>
              )}
              {i.Discount != 0 ? (
                <div className="offer">
                  <span className="rate">{i.Discount}%</span>
                  <p className="off">OFF</p>
                </div>
              ) : null}
            </div>
          ) : null
        )
      );
      Categories.push(
        <div className="cartegoryflex2" key={i}>
          <h1 className="Categorytitel1">
            Orderes On {cid.slice(6, 8)}-{cid.slice(4, 6)}-{cid.slice(0, 4)}
          </h1>
          <section className="productsgrop3">{Products}</section>
        </div>
      );
    });
    Categories = Categories.reverse();
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
            <p className="title">Your Orders</p>
            {Categories}
          </div>
        </div>
      </div>
    );
  };
}
