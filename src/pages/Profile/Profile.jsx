import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  Link,
  Navigate,
  NavigationType,
  NavLink,
  Outlet,
} from "react-router-dom";
import { handleDeleteLocalStorage } from "../../redux/handleApiActions";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.dataUser,
    };
  }

  handleLogout = () => {
    alert("anda telah berhasil logout!");
    this.props.dispatch(handleDeleteLocalStorage());
    this.props.dispatch({ type: "USER_LOGOUT" });
  };

  render() {
    console.log("ini adalah data user", this.state.user);
    if (!this.props.validate) {
      return <Navigate replace to={"/home"} />;
    } else {
      return (
        <Fragment>
          <div className="">
            <div className="w-full h-40 overflow-hidden relative">
              <img
                src="https://picsum.photos/1200/800?random=13"
                className="w-screen absolute top-1/2 -translate-y-1/2 blur-[1rem]"
              />
            </div>
          </div>

          <div className="w-[80%] h-max mx-auto grid grid-cols-12 gap-10">
            <div className="w-full left-0 aspect-square overflow-hidden absolute">
              <div className="absolute left-40  top-0 -translate-y-1/2 h-[300px] aspect-square bg-orange-600 blur-[10rem]" />
            </div>

            <div className="col-span-3 relative">
              {/* <img
                src={`https://placeimg.com/192/192/people/1`}
                alt="user-profile"
                className="rounded-full h-[130px] aspect-square absolute left-1/2 -translate-x-1/2 -top-[65px]"
              /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#f59e0b"
                className="h-[130px] bg-white rounded-full aspect-square absolute  left-1/2 -translate-x-1/2 -top-[65px]"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>

              <div className="absolute -top-[4.3rem] left-[73%] w-max bg-white p-1 px-3 rounded-xl">
                <h3 className="text-2xl font-bold break-keep">
                  {this.state.user.username}
                </h3>
              </div>

              <div className="bg-white  min-h-full absolute w-full top-28 rounded-xl p-4">
                <ul className="space-y-1 ">
                  <li>
                    <NavLink
                      to={"/profile"}
                      className="hover:pl-2 transition-all"
                    >
                      My Artworks
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/profile/edit"}
                      className={`hover:pl-2 transition-all ${({ value }) =>
                        console.log("ini adalah value", value)}`}
                    >
                      Edit Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/profile/likes"}
                      className="hover:pl-2 transition-all"
                    >
                      Likes
                    </NavLink>
                  </li>
                </ul>
                <div className="h-[1px] rounded-full w-full bg-gray-500 my-5" />
                <ul className="space-y-1">
                  <li>
                    <button onClick={() => this.handleLogout()}>Logout</button>
                  </li>
                  <li>
                    <button href="#" className="text-red-500">
                      Delete Account
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-span-9 py-5 px-10 bg-white z-20 w-full">
              <Outlet />
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  dataUser: state.handleAPI.dataUser,
  validate: state.handleAPI.validate,
});

export default connect(mapStateToProps)(Profile);
