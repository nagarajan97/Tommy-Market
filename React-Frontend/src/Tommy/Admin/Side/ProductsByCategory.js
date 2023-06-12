import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

export class ProductsByCategory extends React.Component {
  state = { Products: [], tot: [] };

  check = () => {
    if (document.querySelector("#email").value.length == 4)
      axios
        .get(
          "http://localhost:56064/Api/Market/SearchProduct?id=" +
            document.querySelector("#email").value
        )
        .then((response) => {
          this.setState({ Products: response.data });
        });
    else this.componentDidMount();
  };

  menu = () => {
    if (document.querySelector(".open-close").classList.contains("admingrid")) {
      document.querySelector(".open-close").classList.remove("admingrid");
      document.querySelector(".menu").classList.remove("imenu");
      document.querySelector(".productListGrid1").classList.remove("ipd1");
      document.querySelector(".productListGrid2").classList.remove("ipd2");
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
      document.querySelector(".menu").classList.add("imenu");
      document.querySelector(".productListGrid1").classList.add("ipd1");
      document.querySelector(".productListGrid2").classList.add("ipd2");
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
        "http://localhost:56064/Api/Market/AdminDeleteProduct?id=" +
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
      Products: [...this.state.tot.slice(i * 6, i * 6 + 6)],
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
    if (pos == Math.ceil(this.state.tot.length / 6)) {
      document.querySelectorAll(".num")[0].classList.add("active");
      i = 0;
    } else {
      document.querySelectorAll(".num")[pos].classList.add("active");
      i = pos;
    }
    this.setState({
      Products: [...this.state.tot.slice(i * 6, i * 6 + 6)],
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
        [Math.ceil(this.state.tot.length / 6) - 1].classList.add("active");
      i = Math.ceil(this.state.tot.length / 6) - 1;
    } else {
      document.querySelectorAll(".num")[pos - 2].classList.add("active");
      i = pos - 2;
    }
    this.setState({
      Products: [...this.state.tot.slice(i * 6, i * 6 + 6)],
    });
  };

  componentDidMount = () => {
    if (document.querySelector("#email").value.length <= 4)
      axios
        .get("http://localhost:56064/Api/Market/ProductsDetails")
        .then((response) => {
          this.setState({
            Products: response.data.slice(0, 6),
            tot: response.data,
            f: 0,
          });
        });
    else
      this.setState({
        Products: [],
        tot: [],
      });
  };

  render = () => {
    console.log(this.props.location.state);

    let arr = [];
    for (let i = 0; i < this.state.tot.length / 6; i++) arr.push(i);
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

    let Products1 = this.state.Products.map((pods, i) => (
      <div className="productListGrid2" key={i}>
        <div className="productListFlex1">
          <label className="lable diff">Product ID</label>
          <label className="lable Ans">{pods.ProductID}</label>
        </div>
        <div className="productListFlex1">
          <label className="lable diff">Product Name</label>
          <label className="lable Ans">{pods.ProductName}</label>
        </div>
        <div className="productListFlex1">
          <label className="lable diff">Price</label>
          <label className="lable Ans">{pods.Price}/-</label>
        </div>
        <div className="productListFlex1">
          <label className="lable diff">Discount</label>
          <label className="lable Ans">{pods.Discount}%</label>
        </div>
        <div className="productListFlex1">
          <label className="lable diff">Quality Check</label>
          <label className="lable1 Ans">
            {pods.QualityCheck ? "CHECKED" : "UNCHECKED"}
          </label>
        </div>
        <div className="productListFlex1">
          <label className="lable diff">Special Offers</label>
          <label className="lable1 Ans">
            {pods.OffersAviable ? "AVAILABLE" : "UNAVAILABLE"}
          </label>
        </div>
        <div className="productListFlex1">
          <label className="lable diff">Delivery Type</label>
          <label className="lable1 Ans cap ans">{pods.DeliveryType}</label>
        </div>
        <div className="productListFlex1">
          <label className="lable diff">Category ID</label>
          <label className="lable Ans">{pods.CategoryID}</label>
        </div>
        <input
          type="submit"
          className="sub2 s full idel"
          onClick={() => this.show(pods.ProductID)}
          value="Delete"
        />
      </div>
    ));
    let Products = <div className="productListGrid1">{Products1}</div>;
    if (this.state.tot.length != 0) {
      if (Products1.length == 0) {
        Products = (
          <section className="feedbackgrid3">
            <p className="nores">
              No Results for Category "{document.querySelector("#email").value}"
            </p>
            <p>
              No Such Product Found For A Given Category ID! Try with different
              Category ID.
            </p>
          </section>
        );
        if (this.state.f == 0) {
          document.querySelector(".pagebar").classList.add("hide");
          document.querySelector(".searchhide").classList.add("hide");
        }
      } else {
        if (document.querySelector("#email").value.length == 0) {
          document.querySelector(".pagebar").classList.remove("hide");
          document.querySelector(".searchhide").classList.remove("hide");
        } else {
          document.querySelector(".pagebar").classList.add("hide");
          document.querySelector(".searchhide").classList.remove("hide");
        }
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
            <h1 className="Customer searchhide">Products By Category</h1>
            {Products}
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
            <span className="icdel">Product</span>?
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
