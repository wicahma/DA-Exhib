import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handleDeleteLocalStorage } from "../../redux/handleApiActions";

const User = (props) => {
  // const [dataUser, setDataUser] = useState([]);
  console.log(props.dataUser);

  const handleLogout = () => {
    alert("anda telah berhasil logout!")
    props.dispatch(handleDeleteLocalStorage())
    props.dispatch({type: "USER_LOGOUT"})
  }

  return (
    <li className="dropdown dropdown-end dropdown-hover hover:underline">
      <Link to={"/profile"} tabIndex={0} className="">
        Profile
      </Link>
      <ul
        tabIndex={0}
        className={`dropdown-content ${!props.validate ? "hidden" : null} relative px-5 py-3 shadow bg-base-100 rounded-box w-52 gap-0 items-center`}
      >
        <li className="mb-5">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src="https://placeimg.com/192/192/people" />
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
          <button onClick={() => handleLogout()} className="text-red-100 w-full bg-red-600 hover:bg-red-700 py-2 rounded-xl">
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
