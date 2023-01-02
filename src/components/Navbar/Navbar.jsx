import React, { Fragment } from "react";
import logo from "../../logo.png";
import "./navbar.css";
import blurNavbar from "./blur.svg";
import { Link, NavLink, useLocation } from "react-router-dom";
import User from "./User";
import { connect } from "react-redux";
import PostButton from "../NewPost";

const Navbar = (props) => {
  const location = useLocation().pathname;
  switch (location) {
    case "/login":
      return null;
    case "/registration":
      return null;

    default:
      return (
        <Fragment>
          <nav className=" fixed top-0 px-10 w-full bg-white z-30">
            <div className="navbar py-2 relative after:content-[''] after:absolute after:w-full after:h-1 after:bg-stone-800 after:rounded-full after:-bottom-1 ">
              <div className="flex-1">
                <a className="normal-case text-xl">
                  <img src={logo} alt="Logo DaExhib" className="h-10" />
                </a>
              </div>
              <div className="flex-none relative">
                <img src={blurNavbar} className="absolute scale-[2] w-full object-cover h-[30px] overflow-hidden" />
                <ul className="menu menu-horizontal gap-5 p-0">
                  <li>
                    <NavLink to={"/home"} className="hover:underline">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/explore"} className="hover:underline">
                      Explore
                    </NavLink>
                  </li>
                  <User />
                </ul>
              </div>
            </div>
          </nav>
          <div className="w-full h-16"></div>
          <PostButton />
        </Fragment>
      );
  }
};



export default Navbar;
