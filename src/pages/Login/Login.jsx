import React, { useRef, useState, useEffect } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import logo from "../../logo.png";
import { fetchAPIUser, handleLoginCheck } from "../../redux/handleApiActions";
import { connect, useDispatch } from "react-redux";
import axios from "axios";

const Login = (props) => {
  const userRef = useRef();
  const errRef = useRef();

  let [user, setUser] = useState({ email: "", password: "" });
  let [errMsg, setStatus] = useState("");
  let [succes, setSucces] = useState(false);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  const handleFormChange = (el) => {
    let val = el.target.value;
    let name = el.target.type;
    let userNew = { ...user };
    userNew[name] = val;
    setUser((user = userNew));
    setStatus("");
  };

  const handleLogin = (e) => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_POINT}users/login`, {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        localStorage.setItem("dataUser", JSON.stringify(res.data));
        setStatus(<Navigate replace to="/home" />);
        props.dispatch({ type: "SET_USER", payload: res.data });
      })
      .catch(() => {
        setStatus("Akun tidak ditemukan!");
      });
  };

  return (
    <div className="flex h-screen">
      <div className="w-5/12 bg-white flex grow justify-center items-center">
        <div className="w-[340px]">
          <div className="flex gap-5 justify-center">
            <img src={logo} alt="Da Exhib Logo" className="h-9  brightness-0" />
            <h2 className="text-3xl">
              <span className="font-bold">Da</span>Exhib
            </h2>
          </div>
          <div className="text-center mt-5 border-zinc-800 p-2 rounded-2xl border-2">
            <h2 className="text-3xl font-bold">Login</h2>
            <p>
              Hey, enter your details information to get sign in to your
              account.
            </p>
            <form className="grid grid-cols-2 gap-2 mt-5">
              <input
                type="email"
                placeholder="E-Mail"
                autoComplete="off"
                ref={userRef}
                value={user.email}
                className="col-span-2 rounded-xl w-full focus:border-orange-500 focus:ring-orange-500"
                onChange={(e) => handleFormChange(e)}
              />
              <input
                type="password"
                autoComplete="Current password"
                placeholder="Password"
                onChange={(e) => handleFormChange(e)}
                value={user.password}
                className="col-span-2 rounded-xl w-full focus:border-orange-500 focus:ring-orange-500"
              />
              <p className="max-h-min col-span-2 text-sm font-bold text-red-500 ">
                {errMsg}
              </p>
              <button
                type="button"
                onClick={(e) => handleLogin(e)}
                className="col-span-1 pointer-events-auto h-10 rounded-xl w-full text-white flex items-center justify-center hover:bg-orange-600 bg-orange-500"
              >
                Login
              </button>
              <Link
                to={"/registration"}
                className="col-span-1 h-10 rounded-xl w-full text-black flex items-center justify-center hover:bg-orange-400 hover:text-white border border-orange-400"
              >
                Create Account
              </Link>
            </form>
            <p className="text-start leading-5 my-3 text-sm">
              You forgot the password? dont worry{" "}
              <Link className="font-semibold underline text-orange-400 hover:text-orange-600">
                click here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="w-7/12 bg-slate-100 hidden lg:block overflow-hidden relative">
        <div className="absolute -left-[150px] top-1/2 -translate-y-1/2 h-[300px] aspect-square bg-orange-400 blur-[10rem]" />
        <div className="grid grid-cols-2 content-center gap-4 h-[120%] w-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div></div>
          <div className="h-[600px] bg-orange-500 rounded-tr-[150px] rounded-bl-[150px]"></div>
          <div className="h-[350px] border-zinc-800 rounded-tr-[150px] border-4 p-2 flex items-end">
            <p className="font-bold break-words leading-none text-[2.5rem]">
              Create the new Inspiration
            </p>
          </div>
          <div className="h-[300px] bg-orange-700 rounded-br-[150px] p-2">
            <p className="font-bold leading-none text-[2.5rem] text-white">
              Explore Thousand of Artwork
            </p>
          </div>
          <div className="h-[500px] bg-orange-500 rounded-tl-[150px]"></div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dataUser: state.handleAPI.dataUser,
});

export default connect(mapStateToProps)(Login);
