import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";
import { Nav } from "../Nav";

export class Home extends React.Component {
  state = {
    Products: [],
    tot: [],
    Cats: [],
    Orders: [],
    Search: [],
    Likes: [],
    Latest: [],
  };

  check = () => {
    if (document.querySelector("#productname").value.length != 0)
      axios
        .get(
          "http://localhost:56064/Api/Market/ShowProduct?id=" +
            document.querySelector("#productname").value
        )
        .then((response) => {
          this.setState({ Search: response.data });
        });
    else this.componentDidMount();
  };

  menu = () => {
    if (document.querySelector(".open-close").classList.contains("admingrid")) {
      document.querySelector(".open-close").classList.remove("admingrid");
      document.querySelector(".open-close").classList.add("closeadmingrid");
      document.querySelector(".sec1").classList.add("hide");
      document.querySelector(".menu").name = "menu-outline";
      document.querySelector(".menu").classList.remove("imenu");
      document.querySelector(".slider").classList.remove("islider");
      document.querySelectorAll(".productsgrop").forEach((ele) => {
        ele.classList.remove("iproductsgrop");
      });
    } else {
      document.querySelector(".open-close").classList.remove("closeadmingrid");
      document.querySelector(".open-close").classList.add("admingrid");
      document.querySelector(".sec1").classList.remove("hide");
      document.querySelector(".menu").name = "close-outline";
      document.querySelector(".menu").classList.add("imenu");
      document.querySelector(".slider").classList.add("islider");
      document.querySelectorAll(".productsgrop").forEach((ele) => {
        ele.classList.add("iproductsgrop");
      });
    }
  };
  fold = () => {
    if (!document.querySelector(".sec1").classList.contains("hide"))
      this.menu();
  };

  changeslide = (pos) => {
    document.querySelector(".slide").src = "./images/image" + pos + ".jpg";
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
      document.querySelector(".slide").src = "./images/image" + pos + ".jpg";
    } else {
      pos = pos - 1;
      document.querySelectorAll(".sliderbtn")[pos].classList.add("active1");
      document.querySelector(".slide").src = "./images/image" + pos + ".jpg";
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
      document.querySelector(".slide").src = "./images/image" + pos + ".jpg";
    } else {
      pos = pos + 1;
      document.querySelectorAll(".sliderbtn")[pos].classList.add("active1");
      document.querySelector(".slide").src = "./images/image" + pos + ".jpg";
    }
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
      .get("http://localhost:56064/Api/Market/GetProducts")
      .then((response) => {
        this.setState({
          Products: response.data.slice(0, 4),
          tot: response.data,
        });
      });

    axios
      .get("http://localhost:56064/Api/Market/GetLatest")
      .then((response) => {
        this.setState({
          Latest: response.data,
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
      .get("http://localhost:56064/Api/Market/GetCatogories")
      .then((response) => {
        this.setState({
          Cats: response.data,
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
    this.state.Cats.forEach((ele) => {
      dic[ele.CategoryID] = 0;
    });
    this.state.tot.forEach((ele) => {
      dic[ele.CategoryID] += 1;
    });
    let Products = [],
      Categories = [],
      temp = [],
      orders = this.state.Orders.map((i) => i.ProductID),
      quantity = this.state.Orders.map((i) => i.Quantity),
      offitems = [],
      Latest = [],
      temp3 = [];

    this.state.tot.forEach((ele) => {
      if (ele.OffersAviable) {
        offitems.push(ele.ProductID);
      }
    });

    this.state.tot.forEach((ele) => {
      if (this.state.Latest.includes(ele.ProductID)) {
        Latest.push(ele.ProductID);
      }
    });

    offitems = offitems.splice(0, 4);
    Latest = Latest.splice(0, 4);
    for (let i = 0; i < 2; i++) {
      if (i == 0) temp3 = offitems;
      else temp3 = Latest;
      Products.push(
        this.state.tot.map((i, index) =>
          temp3.includes(i.ProductID) ? (
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
          {i == 0 ? (
            <section className="slider">
              <img className="slide" src="./images/image0.jpg" />
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
          ) : null}
          {i == 0 ? (
            <h1 className="Categorytitel2">OFFER ZONE</h1>
          ) : (
            <h1 className="Categorytitel2">Latest Product</h1>
          )}
          <Link
            to={{
              pathname: i == 0 ? "/Offers" : "/Latest",
              state: {
                ...this.props.location.state,
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
      );
      Products = [];
    }

    if (this.state.Products.length != 0) {
      Object.keys(dic).forEach((cid, i) => {
        Products = [];
        temp = [];
        this.state.tot.forEach((ele) => {
          if (ele.CategoryID == cid) temp.push(ele);
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
                      cid: cid,
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
          ))
        );
        this.state.Cats.forEach((ele) => {
          if (cid == ele.CategoryID) {
            Categories.push(
              <div className="cartegoryflex" key={i}>
                <h1 className="Categorytitel">{ele.CategoryName}</h1>
                <Link
                  to={{
                    pathname: "/Products",
                    state: {
                      ...this.props.location.state,
                      catid: ele.CategoryID,
                      catname: ele.CategoryName,
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
            );
          }
        });
      });
    }

    let Pros = this.state.Search.map((i, index) => (
      <div className="productcart" key={index}>
        <img className="productimg" src={"./images/" + i.ProductID + "1.jpg"} />
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
              Today 3:30PM - 5:30PM
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
    ));

    if (
      this.state.Products.length != 0 &&
      this.state.Search.length == 0 &&
      document.querySelector("#productname").value.length != 0
    ) {
      document.querySelector(".sproductsgrop").classList.add("bline");
      Categories = (
        <section className="feedbackgrid3">
          <p className="nores">
            No Results for ProductName "
            {document.querySelector("#productname").value}"
          </p>
          <p>
            No Such Products Found For A Give ProductName! Try with different
            ProductName.
          </p>
        </section>
      );
    } else {
      if (
        this.state.Products.length != 0 &&
        document.querySelector("#productname").value.length != 0
      ) {
        document.querySelector(".sproductsgrop").classList.remove("bline");
        Categories = <section className="productsgrop">{Pros}</section>;
      }
    }

    return (
      <div className="main sproductsgrop">
        <div onClick={this.fold} className="nav1">
          <p>Welcome back, {this.props.location.state.FirstName}</p>
          <div className="flex4">
            <ion-icon id="ion1" name="search-outline"></ion-icon>
            <input
              type="search"
              className="Search"
              onChange={this.check}
              placeholder="Search"
              id="productname"
              autoComplete="off"
            />
          </div>
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
