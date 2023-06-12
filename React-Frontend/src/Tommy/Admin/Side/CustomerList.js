import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

export class CustomerList extends React.Component {
  state = { Customers: [], tot: [] };

  check = () => {
    if (document.querySelector("#email").value.length != 0)
      axios
        .get(
          "http://localhost:56064/Api/Market/SearchCustomer?id=" +
            document.querySelector("#email").value
        )
        .then((response) => {
          this.setState({ Customers: response.data });
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
      document.querySelectorAll(".customerListGrid2").forEach((ele) => {
        ele.style = "padding: 20px 20px 20px 40px;";
      });
    } else {
      document.querySelector(".open-close").classList.remove("closeadmingrid");
      document.querySelector(".open-close").classList.add("admingrid");
      document.querySelector(".sec1").classList.remove("hide");
      document.querySelector(".menu").name = "close-outline";
      document.querySelector(".menu").classList.add("close");
      document.querySelectorAll(".customerListGrid2").forEach((ele) => {
        ele.style = "padding: 20px 8px 20px 8px;";
      });
    }
  };
  fold = () => {
    if (!document.querySelector(".sec1").classList.contains("hide"))
      this.menu();
  };
  pinhide = (i) => {
    document.getElementById("pin" + i).type =
      document.getElementById("pin" + i).type === "password"
        ? "text"
        : "password";
    document.getElementById("pinin" + i).value =
      document.getElementById("pin" + i).type === "password" ? "Show" : "Hide";
  };
  passhide = (i) => {
    document.getElementById("pass" + i).type =
      document.getElementById("pass" + i).type === "password"
        ? "text"
        : "password";
    document.getElementById("passin" + i).value =
      document.getElementById("pass" + i).type === "password" ? "Show" : "Hide";
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
        "http://localhost:56064/Api/Market/AdminDeleteCustomer?id=" +
          this.state.id
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
      Customers: [...this.state.tot.slice(i * 4, i * 4 + 4)],
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
      Customers: [...this.state.tot.slice(i * 4, i * 4 + 4)],
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
      Customers: [...this.state.tot.slice(i * 4, i * 4 + 4)],
    });
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:56064/Api/Market/CustomersDetails")
      .then((response) => {
        this.setState({
          Customers: response.data.slice(0, 4),
          tot: response.data,
        });
      });
    {
    }
  };

  render = () => {
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

    let Customers1 = this.state.Customers.map((cus, i) => (
      <div className="customerListGrid2" key={i}>
        <div className="customerListGrid3">
          <label className="lable">CustomerID</label>
          <label className="lable">{cus.Email}</label>
        </div>
        <div className="customerListGrid3">
          <label className="lable">FirstName</label>
          <label className="lable">{cus.FirstName}</label>
        </div>
        <div className="customerListGrid3">
          <label className="lable">Last Name</label>
          <label className="lable">{cus.LastName}</label>
        </div>
        <div className="customerListGrid3">
          <label className="lable">Number</label>
          <label className="lable">{cus.Number}</label>
        </div>
        <div className="customerListGrid4">
          <label className="lable">PIN</label>
          <input
            className="input3"
            type="password"
            defaultValue={cus.Pin}
            id={"pin" + i}
            disabled
          />
          <input
            type="submit"
            className="sub2 s"
            id={"pinin" + i}
            onClick={() => this.pinhide(i)}
            value="show"
          />
        </div>
        <div className="customerListGrid5">
          <label className="lable">Password</label>
          <input
            className="input3"
            type="password"
            id={"pass" + i}
            defaultValue={cus.Password}
            disabled
          />
          <input
            type="submit"
            className="sub2 s"
            id={"passin" + i}
            onClick={() => this.passhide(i)}
            value="show"
          />
        </div>
        <input
          type="submit"
          className="sub2 s idel"
          onClick={() => this.show(cus.Email)}
          value="Delete"
        />
      </div>
    ));
    let Customers = <div className="swap customerListGrid1">{Customers1}</div>;
    if (this.state.tot.length != 0) {
      if (Customers1.length == 0) {
        Customers = (
          <section className="feedbackgrid3">
            <p className="nores">
              No Results for "{document.querySelector("#email").value}"
            </p>
            <p>
              No Such Customer Profile Found For A Give UserID! Try with
              different UserID.
            </p>
          </section>
        );
        document.querySelector(".pagebar").classList.add("hide");
      } else {
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
            <h1 className="Customer">Customers</h1>
            {Customers}
          </div>
          <div></div>
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
            <span className="icdel">Customer Account </span>?
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
