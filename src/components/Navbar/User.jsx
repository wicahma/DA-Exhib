import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handleDeleteLocalStorage } from "../../redux/handleApiActions";

const User = (props) => {
  // const [dataUser, setDataUser] = useState([]);
  console.log(props.dataUser);

  const handleLogout = () => {
    alert("anda telah berhasil logout!");
    props.dispatch(handleDeleteLocalStorage());
    props.dispatch({ type: "USER_LOGOUT" });
  };

  return (
    <li className="dropdown dropdown-end dropdown-hover hover:underline">
      <Link to={"/profile"} tabIndex={0} className="">
        Profile
      </Link>
      <ul
        tabIndex={0}
        className={`dropdown-content ${
          !props.validate ? "hidden" : null
        } relative px-5 py-3 shadow bg-base-100 rounded-box w-52 gap-0 items-center`}
      >
        <li className="mb-5">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#f59e0b"
                className="w-24 text-orange-500 aspect-square"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </li>
        <li className="hover:bg-stone-100 w-full justify-center p-2 rounded-xl">
          <Link to={"/profile"}>My Artwork</Link>
        </li>
        <li className="hover:bg-stone-100 w-full justify-center p-2 rounded-xl">
          <Link to={"/profile/edit"}>Edit Profile</Link>
        </li>
        <li className="hover:bg-stone-100 w-full justify-center p-2 rounded-xl">
          <Link to={"/profile/likes"}>Likes</Link>
        </li>
        <li className="w-full mt-3">
          <button
            onClick={() => handleLogout()}
            className="text-red-100 w-full bg-red-600 hover:bg-red-700 py-2 rounded-xl"
          >
            <p className="w-min m-auto">Logout</p>
          </button>
        </li>
      </ul>
    </li>
  );
};

const mapStateToProps = (state) => ({
  dataUser: state.handleAPI.dataUser,
  validate: state.handleAPI.validate,
});

export default connect(mapStateToProps)(User);
