import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";
import { Nav } from "../Nav";

export class Product extends React.Component {
  state = { Product: [], Orders: [], tot: [], Likes: [] };

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
        .then(() => {
          this.componentDidMount();
        });
    } else {
      axios
        .delete(
          "http://localhost:56064/Api/Market/DeleteOrder?id=" +
            this.props.location.state.Email +
            "&pid=" +
            i
        )
        .then(() => {
          this.componentDidMount();
        });
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
      .then(() => {
        this.componentDidMount();
      });
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

  componentDidMount = () => {
    axios
      .get(
        "http://localhost:56064/Api/Market/GetProduct?id=" +
          this.props.location.state.pid
      )
      .then((response) => {
        this.setState({
          Product: response.data,
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

  changeimg = (i) => {
    document.querySelector(".proimg").src =
      "./images/" + this.props.location.state.pro.ProductID + +i + ".jpg";
  };

  render = () => {
    let orders = this.state.Orders.map((i) => i.ProductID),
      quantity = this.state.Orders.map((i) => i.Quantity);
    console.log(this.props.location.state);
    let Products = [],
      temp = [];
    this.state.tot.forEach((ele) => {
      if (
        ele["CategoryID"] == this.props.location.state.cid &&
        this.props.location.state.pid != ele["ProductID"]
      )
        temp.push(ele);
    });
    temp = temp.slice(0, 4);

    Products.push(
      temp.map((i, index) => (
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
      ))
    );
    console.log(this.state.Likes);
    return (
      <div className="main">
        <div onClick={this.fold} className="nav1">
          <Link
            to={{
              pathname: "/Home",
              state: {
                ...this.props.location.state,
                catid: this.props.location.state.catid,
                catname: this.props.location.state.catname,
              },
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
          <div onClick={this.fold} className="cartegoryflex">
            <div>
              <section className="productgrid">
                <div>
                  <img
                    className="proimg"
                    src={
                      "./images/" +
                      this.props.location.state.pro.ProductID +
                      "1.jpg"
                    }
                  />
                  <div className="flex15">
                    <img
                      className="proimgs"
                      src={
                        "./images/" +
                        this.props.location.state.pro.ProductID +
                        "1.jpg"
                      }
                      onClick={() => this.changeimg(1)}
                    />
                    <img
                      className="proimgs"
                      src={
                        "./images/" +
                        this.props.location.state.pro.ProductID +
                        "2.jpg"
                      }
                      onClick={() => this.changeimg(2)}
                    />
                    <img
                      className="proimgs"
                      src={
                        "./images/" +
                        this.props.location.state.pro.ProductID +
                        "3.jpg"
                      }
                      onClick={() => this.changeimg(3)}
                    />
                  </div>
                </div>
                <div className="proflex">
                  <p className="productname">
                    {this.props.location.state.pro.ProductName}
                    <span className="productsdescription">
                      - {this.props.location.state.pro.Description}
                    </span>
                  </p>
                  {this.props.location.state.pro.QualityCheck == true ? (
                    <div className="float1">
                      <ion-icon
                        id="ionicon"
                        name="shield-checkmark-outline"
                      ></ion-icon>
                      <p className="brand">Tommy Assured</p>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <p className="proprice">
                    MRP:
                    <del className="proprice">
                      Rs {this.props.location.state.pro.Price}
                    </del>
                  </p>
                  <p className="proprice1">
                    Price: Rs{" "}
                    {parseFloat(
                      parseInt(this.props.location.state.pro.Price) *
                        (1 -
                          parseFloat(this.props.location.state.pro.Discount) /
                            100)
                    ).toFixed(2)}
                    {!(
                      this.state.Likes.includes(
                        this.props.location.state.pro.ProductID
                      ) || this.state.Likes.length == 0
                    ) ? (
                      <div>
                        <ion-icon
                          onClick={() =>
                            this.like(
                              1,
                              this.props.location.state.pro.ProductID
                            )
                          }
                          id={
                            "viewicon2" +
                            this.props.location.state.pro.ProductID
                          }
                          class={
                            "out out" + this.props.location.state.pro.ProductID
                          }
                          name="heart-outline"
                        ></ion-icon>
                        <ion-icon
                          onClick={() =>
                            this.like(
                              0,
                              this.props.location.state.pro.ProductID
                            )
                          }
                          id={
                            "viewicon2" +
                            this.props.location.state.pro.ProductID
                          }
                          class={
                            "in1 in1" +
                            this.props.location.state.pro.ProductID +
                            " hide"
                          }
                          name="heart"
                        ></ion-icon>
                      </div>
                    ) : (
                      <div>
                        <ion-icon
                          onClick={() =>
                            this.like(
                              1,
                              this.props.location.state.pro.ProductID
                            )
                          }
                          id={
                            "viewicon2" +
                            this.props.location.state.pro.ProductID
                          }
                          class={
                            "out out" +
                            this.props.location.state.pro.ProductID +
                            " hide"
                          }
                          name="heart-outline"
                        ></ion-icon>
                        <ion-icon
                          onClick={() =>
                            this.like(
                              0,
                              this.props.location.state.pro.ProductID
                            )
                          }
                          id={
                            "viewicon2" +
                            this.props.location.state.pro.ProductID
                          }
                          class={
                            "in1 in1" + this.props.location.state.pro.ProductID
                          }
                          name="heart"
                        ></ion-icon>
                      </div>
                    )}
                  </p>
                  <p className="save">
                    You Save: {this.props.location.state.pro.Discount}%
                    <br />
                    <span className="inclusive"> (Inclusive of all taxes)</span>
                  </p>
                  <div
                    className={
                      "combo combo" +
                      this.props.location.state.pro.ProductID +
                      (!orders.includes(this.props.location.state.pro.ProductID)
                        ? ""
                        : " hide")
                    }
                  >
                    <div className="qtyflex">
                      <ion-icon id="ion2" name="file-tray-stacked-outline" />
                      <pre className="qty"> Qty</pre>
                      <input
                        type="text"
                        className={
                          "Search1 Search1" +
                          this.props.location.state.pro.ProductID
                        }
                        onInput={() =>
                          this.OnlyNumbers(
                            this.props.location.state.pro.ProductID
                          )
                        }
                        defaultValue={1}
                        autoComplete="off"
                        maxLength={1}
                      />
                    </div>
                    <input
                      type="button"
                      value="Add"
                      onClick={() =>
                        this.AddtoCart(this.props.location.state.pro.ProductID)
                      }
                      className="addtocart"
                    />
                  </div>
                  <div>
                    <div
                      className={
                        "qtyflex1 qtyflex1" +
                        this.props.location.state.pro.ProductID +
                        (orders.includes(
                          this.props.location.state.pro.ProductID
                        )
                          ? ""
                          : " hide")
                      }
                    >
                      <ion-icon
                        id="ion2"
                        onClick={() =>
                          this.RemoveItem(
                            this.props.location.state.pro.ProductID
                          )
                        }
                        name="remove-outline"
                      />
                      <input
                        type="text"
                        className={
                          "Search2 Search2" +
                          this.props.location.state.pro.ProductID
                        }
                        value={
                          quantity[
                            orders.findIndex(
                              (x) =>
                                x == this.props.location.state.pro.ProductID
                            )
                          ] + " in Basket"
                        }
                        autoComplete="off"
                        disabled
                      />
                      <ion-icon
                        id="ion2"
                        onClick={() =>
                          this.AddItem(this.props.location.state.pro.ProductID)
                        }
                        name="add-outline"
                      />
                    </div>
                  </div>
                  {this.props.location.state.pro.DeliveryType == "normal" ? (
                    <p className="protype">
                      Standard Delivery:
                      <br />
                      Tomorrow Morning
                    </p>
                  ) : (
                    <p className="protype">
                      Express Delivery:
                      <br />
                      Today 3:30PM - 5:30PM
                    </p>
                  )}
                </div>
              </section>
              <section className="detail">
                <p className="productname size">
                  {this.props.location.state.pro.ProductName} -{" "}
                  {this.props.location.state.pro.Description}
                </p>
                <hr />
                <p className="ldesc">
                  {this.props.location.state.pro.DetailInfo}
                </p>
              </section>
              <section>
                <p className="similarpro">Similar Products</p>
                <div className="cartegoryflex1">
                  <h1 className="Categorytitel">
                    {this.props.location.state.catname}
                  </h1>
                  <Link
                    to={{
                      pathname: "/Products",
                      state: {
                        ...this.props.location.state,
                        catid: parseInt(this.props.location.state.cid),
                      },
                    }}
                    className="linkview"
                  >
                    <button className="view">
                      <p className="viwep">View All</p>
                      <ion-icon
                        class="viewicon"
                        name="caret-forward-outline"
                      ></ion-icon>
                    </button>
                  </Link>
                  <section className="productsgrop">{Products}</section>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
