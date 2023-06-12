import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";
import { Nav } from "../Nav";

export class WishList extends React.Component {
  state = { Orders: [], temp: [], Likes: [] };

  menu = () => {
    if (document.querySelector(".open-close").classList.contains("admingrid")) {
      document.querySelector(".open-close").classList.remove("admingrid");
      document.querySelector(".open-close").classList.add("closeadmingrid");
      document.querySelector(".sec1").classList.add("hide");
      document.querySelector(".menu").name = "menu-outline";
      document.querySelector(".menu").classList.remove("close");
      document
        .querySelector(".productsgrop2")
        .classList.remove("iproductsgrop2");
      document.querySelector(".title").classList.remove("ititle");
    } else {
      document.querySelector(".open-close").classList.remove("closeadmingrid");
      document.querySelector(".open-close").classList.add("admingrid");
      document.querySelector(".sec1").classList.remove("hide");
      document.querySelector(".menu").name = "close-outline";
      document.querySelector(".menu").classList.add("close");
      document.querySelector(".productsgrop2").classList.add("iproductsgrop2");
      document.querySelector(".title").classList.add("ititle");
    }
  };

  fold = () => {
    if (!document.querySelector(".sec1").classList.contains("hide"))
      this.menu();
  };

  RemoveItem = (i) => {
    if (parseInt(document.querySelector(".Search2" + i).value) > 1) {
      document.querySelector(".Search2" + i).value =
        String(parseInt(document.querySelector(".Search2" + i).value) - 1) +
        " in Basket";
      axios
        .post("http://localhost:56064/Api/Market/UpdateOrder", {
          UserID: this.props.location.state.Email,
          ProductID: i,
          Quantity: parseInt(document.querySelector(".Search2" + i).value),
        })
        .then(() => {});
    } else {
      axios
        .delete(
          "http://localhost:56064/Api/Market/DeleteOrder?id=" +
            this.props.location.state.Email +
            "&pid=" +
            i
        )
        .then(() => {});
      document.querySelector(".Search1" + i).value = 1;
      document.querySelector(".combo" + i).classList.remove("hide");
      document.querySelector(".qtyflex1" + i).classList.add("hide");
    }
  };

  AddItem = (i) => {
    if (parseInt(document.querySelector(".Search2" + i).value) < 8) {
      document.querySelector(".Search2" + i).value =
        String(parseInt(document.querySelector(".Search2" + i).value) + 1) +
        " in Basket";
      axios
        .post("http://localhost:56064/Api/Market/UpdateOrder", {
          UserID: this.props.location.state.Email,
          ProductID: i,
          Quantity: parseInt(document.querySelector(".Search2" + i).value),
        })
        .then(() => {});
    } else {
      axios
        .post("http://localhost:56064/Api/Market/UpdateOrder", {
          UserID: this.props.location.state.Email,
          ProductID: i,
          Quantity: parseInt(document.querySelector(".Search2" + i).value),
        })
        .then(() => {});
      document.querySelector(".Search2" + i).value = "9 in Basket FULL! ";
    }
  };

  AddtoCart = (i) => {
    document.querySelector(".Search2" + i).value =
      String(parseInt(document.querySelector(".Search1" + i).value)) +
      " in Basket";
    document.querySelector(".combo" + i).classList.add("hide");
    document.querySelector(".qtyflex1" + i).classList.remove("hide");
    axios
      .post("http://localhost:56064/Api/Market/AddOrder", {
        UserID: this.props.location.state.Email,
        ProductID: i,
        Quantity: 1,
      })
      .then(() => {});
  };

  OnlyNumbers = (i) => {
    if (
      document.querySelector(".Search1" + i).value != "" &&
      !/^[0-9]{1,3}$/i.test(document.querySelector(".Search1" + i).value)
    ) {
      if (document.querySelector(".Search1" + i).value.length != 1)
        document.querySelector(".Search1" + i).value = parseInt(
          document.querySelector(".Search1" + i).value
        );
      else document.querySelector(".Search1" + i).value = 1;
    }
    setTimeout(() => {
      if (
        document.querySelector(".Search1" + i).value == "" ||
        document.querySelector(".Search1" + i).value == 0
      )
        document.querySelector(".Search1" + i).value = 1;
    }, 1 * 1500);
  };

  componentDidMount = () => {
    axios
      .get(
        "http://localhost:56064/Api/Market/GetOrders1?uid=" +
          this.props.location.state.Email
      )
      .then((response) => {
        this.setState({
          Orders: response.data,
        });
      });
    axios
      .get("http://localhost:56064/Api/Market/GetAllProducts")
      .then((response) => {
        this.setState({
          temp: response.data,
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

  render = () => {
    let pids = this.state.Orders.map((ele) => ele["ProductID"]);

    let orders = this.state.Orders.map((i) => i.ProductID),
      quantity = this.state.Orders.map((i) => i.Quantity);

    let Products = this.state.temp.map((i, index) =>
      this.state.Likes.includes(i.ProductID) ? (
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
                  cid: this.props.location.state.cid,
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
              <ion-icon id="ionicon" name="shield-checkmark-outline"></ion-icon>
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
          <div onClick={this.fold}>
            <h1 className="title">favorites</h1>
            <section className="productsgrop2">{Products}</section>
          </div>
        </div>
      </div>
    );
  };
}
