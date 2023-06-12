import React from "react";
import { Link } from "react-router-dom";

export class Nav extends React.Component {
  render() {
    return (
      <div className="sec1 hide sideflex">
        <p className="menu1">MENU</p>
        <Link
          to={{
            pathname: "/Verify",
            state: { ...this.props.nav },
          }}
          className="sidein"
        >
          Profile
        </Link>

        <Link
          to={{
            pathname: "/MyOrders",
            state: { ...this.props.nav },
          }}
          className="sidein"
        >
          My Orders
        </Link>

        <Link
          to={{
            pathname: "/OrderHistory",
            state: { ...this.props.nav },
          }}
          className="sidein"
        >
          Order History
        </Link>

        <Link
          to={{
            pathname: "/WishList",
            state: { ...this.props.nav },
          }}
          className="sidein"
        >
          My WishList
        </Link>

        <Link
          to={{
            pathname: "/Games",
            state: { ...this.props.nav },
          }}
          className="sidein"
        >
          Games
        </Link>

        <Link
          to={{
            pathname: "/FeedBack",
            state: { ...this.props.nav },
          }}
          className="sidein"
        >
          FeedBack
        </Link>

        <Link
          to={{
            pathname: "/ContactUs",
            state: { ...this.props.nav },
          }}
          className="sidein"
        >
          ContactUs
        </Link>
      </div>
    );
  }
}
