import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {

    return (
        <div class="topnav">
            <NavLink exact to="/" activeClassName="active">
                <i className="fa fa-fw fa-home"></i> Home
            </NavLink>
            <NavLink to="/about" activeClassName="active">
                <i className="fa fa-fw fa-info"></i> About
            </NavLink>
        </div>
    );
}

export default Navbar;