import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";
import { Nav } from "../Nav";


export class Payment extends React.Component {
  state = { Orders: [], temp: [], Address: "" };
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

  pay = () => {
    let add = document.querySelector(".desc").value;
    if (add == "") document.querySelector(".edesc").classList.remove("hide");
    else document.querySelector(".edesc").classList.add("hide");
    if (document.querySelector(".edesc").classList.contains("hide"))
      axios
        .post(
          "http://localhost:56064/Api/Market/delivery?email=" +
            this.props.location.state.Email +
            "&date=" +
            (new Date().getFullYear() +
              "" +
              ((new Date().getMonth() + 1 + "").length == 1
                ? "0" + (new Date().getMonth() + 1)
                : new Date().getMonth() + 1) +
              new Date().getDate())
        )
        .then(() => {
          axios
            .post(
              "http://localhost:56064/Api/Market/UpdateAddress?email=" +
                this.props.location.state.Email +
                "&add=" +
                add
            )
            .then(() => {
              document.querySelector(".main").classList.add("hide");
              document.querySelector(".loading").classList.remove("hide");
              setTimeout(() => {
                this.props.history.push({
                  pathname: "/OrderHistory",
                  state: this.props.location.state,
                });
              }, 5 * 1000);
            });
        });
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
      .get(
        "http://localhost:56064/Api/Market/GetAddress?id=" +
          this.props.location.state.Email
      )
      .then((response) => {
        this.setState({
          Address: response.data,
        });
      });

    axios
      .get("http://localhost:56064/Api/Market/GetAllProducts")
      .then((response) => {
        this.setState({
          temp: response.data,
        });
      });
  };

  render = () => {
    let pids = this.state.Orders.map((ele) => ele["ProductID"]);

    let orders = this.state.Orders.map((i) => i.ProductID),
      quantity = this.state.Orders.map((i) => i.Quantity),
      subtotal = 0;

    let Products = this.state.temp.map((i, index) =>
      pids.includes(i.ProductID) ? (
        <section className="grid11" key={index}>
          <p className="head2">{i.ProductID}</p>
          <p className="head2 color3">{i.ProductName}</p>
          <p className="head2">&#8377;{i.Price}</p>
          <p className="head2">{i.Discount}%</p>
          <p className="head2">
            &#8377;
            {parseFloat(
              parseInt(i.Price) * (1 - parseFloat(i.Discount) / 100)
            ).toFixed(2)}
          </p>
          <p className="head2 pml4">
            {quantity[orders.findIndex((x) => x == i.ProductID)]}
          </p>
          <p className="head2 color3">
            &#8377;
            {parseFloat(
              quantity[orders.findIndex((x) => x == i.ProductID)] *
                parseFloat(
                  parseInt(i.Price) * (1 - parseFloat(i.Discount) / 100)
                ).toFixed(2)
            ).toFixed(2)}
          </p>
        </section>
      ) : null
    );

    this.state.temp.forEach((i) => {
      subtotal += pids.includes(i.ProductID)
        ? parseInt(
            quantity[orders.findIndex((x) => x == i.ProductID)] *
              parseFloat(
                parseInt(i.Price) * (1 - parseFloat(i.Discount) / 100)
              ).toFixed(2)
          )
        : 0;
    });

    return (
      <div>
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
              <div className="grid6">
                <div className="oname">
                  <p>Name</p>{" "}
                  <p className="ans3">{this.props.location.state.FirstName}</p>
                </div>
                <div className="field1">
                  <p>Email </p>
                  <p className="ans3">{this.props.location.state.Email}</p>
                  <p>Phone No </p>
                  <p className="ans3"> {this.props.location.state.Number}</p>
                </div>
              </div>
              <div onClick={this.fold} className="con3">
                <div className="flex11">
                  <p className="head1 pml1">ProductID</p>
                  <p className="head1 pml2">ProductName</p>
                  <p className="head1 pml">MarketPrice</p>
                  <p className="head1 pml3">Discount</p>
                  <p className="head1 pml4">OfferPrice</p>
                  <p className="head1 pml5">Quantity</p>
                  <p className="head1 pml6">Amout</p>
                </div>
                {Products}
                <div className="grid3">
                  <div className="inote">
                    <p className="note">Note:</p>
                    <p className="import">
                      If you have any queries related to payments, Kindly reach
                      out us through
                      <a className="url" href="mailto:TommyMarket@gmail.com">
                        TommyMarket@gmail.com
                      </a>
                    </p>
                  </div>
                  <div className="grid4">
                    <p className="bold">Sub-Total</p>
                    <p>&#8377;{parseFloat(subtotal).toFixed(2)}</p>
                    <p className="bold">Tax-Rate</p>
                    <p>&#8377;7.00%</p>
                    <p className="bold">Tax</p>
                    <p>&#8377;{parseFloat(0.07 * subtotal).toFixed(2)}</p>
                  </div>
                  <div></div>
                  <div className="grid5">
                    <p className="bold">Total</p>
                    <p>
                      &#8377;
                      {parseFloat(
                        parseFloat(1 + 0.07).toFixed(2) * subtotal
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex12">
                  <p className="add">Address</p>
                  <div className="flex13">
                    <textarea
                      className="input6 desc"
                      placeholder="Write Address for Delivery Here!"
                      defaultValue={this.state.Address}
                      rows="2"
                    />
                    <p className="error edesc hide">Address Not Provided!</p>
                  </div>
                </div>
                <button onClick={this.pay} className="view2">
                  <p className="viwep">Pay Now</p>
                  <ion-icon class="viewicon1" name="wallet-outline"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="loading hide">
          <ion-icon id="ion" name="hourglass-outline"></ion-icon>
          <p className="progress">Processing Your Orders, Please Wait...</p>
        </div>
      </div>
    );
  };
}
