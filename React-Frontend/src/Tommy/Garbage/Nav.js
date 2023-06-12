import React from "react";
import { Link } from "react-router-dom";

export class Nav extends React.Component {
  render() {
    return (
      <div className="nav">
        <Link to="/Login" className="nav-link">
          Login
        </Link>
        <Link to="/SignUp" className="nav-link">
          SiginUp
        </Link>
      </div>
    );
  }
}
