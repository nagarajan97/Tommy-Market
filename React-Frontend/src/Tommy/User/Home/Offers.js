import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";
import { Nav } from "../Nav";

export class Offers extends React.Component {
  state = { tot: [], Orders: [], Likes: [] };
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

  changeslide = (pos) => {
    document.querySelector(".slide").src = "./images/image0" + pos + ".jpg";
    document
      .querySelectorAll(".sliderbtn")
      .forEach((ele) => ele.classList.remove("active1"));
    document.querySelectorAll(".sliderbtn")[pos].classList.add("active1");
  };

  previous = () => {
    let pos;
    document.querySelectorAll(".sliderbtn").forEach((ele) => {
      if (ele.classList.contains("active1")) pos = ele.id;
    });
    document
      .querySelectorAll(".sliderbtn")
      .forEach((ele) => ele.classList.remove("active1"));
    if (pos == 0) {
      pos = document.querySelectorAll(".sliderbtn").length - 1;
      document.querySelectorAll(".sliderbtn")[pos].classList.add("active1");
      document.querySelector(".slide").src = "./images/image0" + pos + ".jpg";
    } else {
      pos = pos - 1;
      document.querySelectorAll(".sliderbtn")[pos].classList.add("active1");
      document.querySelector(".slide").src = "./images/image0" + pos + ".jpg";
    }
  };

  next = () => {
    let pos;
    document.querySelectorAll(".sliderbtn").forEach((ele) => {
      if (ele.classList.contains("active1")) pos = parseInt(ele.id);
    });
    document
      .querySelectorAll(".sliderbtn")
      .forEach((ele) => ele.classList.remove("active1"));
    if (pos == document.querySelectorAll(".sliderbtn").length - 1) {
      pos = 0;
      document.querySelectorAll(".sliderbtn")[pos].classList.add("active1");
      document.querySelector(".slide").src = "./images/image0" + pos + ".jpg";
    } else {
      pos = pos + 1;
      document.querySelectorAll(".sliderbtn")[pos].classList.add("active1");
      document.querySelector(".slide").src = "./images/image0" + pos + ".jpg";
    }
  };

  componentDidMount = () => {
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

    axios
      .get(
        "http://localhost:56064/Api/Market/GetOrders?userid=" +
          this.props.location.state.Email
      )
      .then((response) => {
        this.setState({
          Orders: response.data,
        });
      });
    for (var i = 1; i < 99999; i++) window.clearInterval(i);
    setInterval(this.next, 1000 * 3);
  };

  render = () => {
    let Products = [],
      Categories = [],
      orders = this.state.Orders.map((i) => i.ProductID),
      quantity = this.state.Orders.map((i) => i.Quantity),
      offitems = [];

    this.state.tot.forEach((ele) => {
      if (ele.OffersAviable) {
        offitems.push(ele.ProductID);
      }
    });

    Products.push(
      this.state.tot.map((i, index) =>
        offitems.includes(i.ProductID) ? (
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
              {i.DeliveryType == "normal" ? (
                <p className="type">
                  Standard Delivery:
                  <br />
                  Tomorrow Morning
                </p>
              ) : (
                <p className="type">
                  Express Delivery:
                  <br />
                  Today 3:30PM - 7:30PM
                </p>
              )}
              <div
                className={
                  "combo combo" +
                  i.ProductID +
                  (!orders.includes(i.ProductID) ? "" : " hide")
                }
              >
                <div className="qtyflex">
                  <ion-icon id="ion2" name="file-tray-stacked-outline" />
                  <pre className="qty"> Qty</pre>
                  <input
                    type="text"
                    className={"Search1 Search1" + i.ProductID}
                    onInput={() => this.OnlyNumbers(i.ProductID)}
                    defaultValue={1}
                    autoComplete="off"
                    maxLength={1}
                  />
                </div>
                <input
                  type="button"
                  value="Add"
                  onClick={() => this.AddtoCart(i.ProductID)}
                  className="addtocart"
                />
              </div>
              <div>
                <div
                  className={
                    "qtyflex1 qtyflex1" +
                    i.ProductID +
                    (orders.includes(i.ProductID) ? "" : " hide")
                  }
                >
                  <ion-icon
                    id="ion2"
                    onClick={() => this.RemoveItem(i.ProductID)}
                    name="remove-outline"
                  />
                  <input
                    type="text"
                    className={"Search2 Search2" + i.ProductID}
                    value={
                      quantity[orders.findIndex((x) => x == i.ProductID)] +
                      " in Basket"
                    }
                    autoComplete="off"
                    disabled
                  />
                  <ion-icon
                    id="ion2"
                    onClick={() => this.AddItem(i.ProductID)}
                    name="add-outline"
                  />
                </div>
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
      <div className="cartegoryflex">
        <section className="slider">
          <img className="slide" src="./images/image00.jpg" />
          <ion-icon
            id="pageicon"
            name="chevron-back-outline"
            onClick={this.previous}
            class="back"
          ></ion-icon>
          <ion-icon
            id="pageicon"
            onClick={this.next}
            name="chevron-forward-outline"
            class="front"
          ></ion-icon>
          <div className="Homesliderflex">
            <input
              type="button"
              id={0}
              onClick={() => this.changeslide(0)}
              className="sliderbtn active1"
            />
            <input
              type="button"
              id={1}
              onClick={() => this.changeslide(1)}
              className="sliderbtn"
            />
            <input
              type="button"
              id={2}
              onClick={() => this.changeslide(2)}
              className="sliderbtn"
            />
          </div>
        </section>
        <h1 className="Categorytitel2 cml">OFFER ZONE</h1>
        <section className="productsgrop3">{Products}</section>
      </div>
    );

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
          <div onClick={this.fold} className="homepage">
            {Categories}
          </div>
        </div>
      </div>
    );
  };
}
