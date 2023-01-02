import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../../logo.png";

const Registration = (props) => {
  let [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  let [errMsg, setStatus] = useState("");
  let [succes, setSucces] = useState(false);

  let elPass = useRef();
  let elRePass = useRef();

  const handleFormChange = (el) => {
    let val = el.target.value;
    let name = el.target.id;
    let userNew = { ...user };
    userNew[name] = val;
    setUser((user = userNew));
    setStatus("");
  };

  const handlePassUnsame = (e) => {
    user.password === e.target.value
      ? setStatus("")
      : setStatus("Password tidak sama!");
  };
  const handleRegistUserAPI = (data) =>
    axios
      .post(`${process.env.REACT_APP_API_POINT}users/register`, data)
      .then((res) => {
        console.log(res);
        setSucces(true);
      })
      .catch((err) => {
        setSucces(false);
        setStatus("Akun gagal untuk dibuat!");
      });

  const handleSubmit = (e) => {
    // console.log(e);
    let allChecked = 0;
    if (elPass.current.value !== elRePass.current.value) {
      allChecked--;
      return setStatus("Password tidak sama!");
    }
    for (const value of Object.values(user)) {
      value !== "" ? allChecked++ : setStatus("Isi data yang masih kosong");
    }
    allChecked === 3 && !errMsg
      ? handleRegistUserAPI(user)
      : console.log("masih beda");
  };
  if (succes) {
    // setSucces("Silahkan tunggu, anda akan diarahkan ke halaman login");
    return <Navigate replace to={"/login"} />;
  } else {
    return (
      <div className="flex h-screen">
        <div className="w-5/12 bg-white flex grow justify-center items-center">
          <div className="w-[340px]">
            <div className="flex gap-5 justify-center">
              <img
                src={logo}
                alt="Da Exhib Logo"
                className="h-9 brightness-0"
              />
              <h2 className="text-3xl">
                <span className="font-bold">Da</span>Exhib
              </h2>
            </div>
            <div className="text-center mt-5 border-zinc-800 p-2 rounded-2xl border-2">
              <h2 className="text-3xl font-bold">Register</h2>
              <p>
                Let’s create an account so you can interact and upland an Art.
              </p>
              <form action="" className="grid grid-cols-2 gap-2 mt-5">
                <input
                  type="text"
                  onChange={(e) => handleFormChange(e)}
                  id="username"
                  placeholder="Username"
                  className="col-span-2 rounded-xl w-full focus:border-orange-500 focus:ring-orange-500"
                />

                <input
                  type="email"
                  onChange={(e) => handleFormChange(e)}
                  id="email"
                  placeholder="E-Mail"
                  className="col-span-2 rounded-xl w-full focus:border-orange-500 focus:ring-orange-500"
                />
                <input
                  type="password"
                  id="password"
                  ref={elPass}
                  onChange={(e) => handleFormChange(e)}
                  placeholder="Password"
                  autoComplete="password"
                  className="col-span-2 rounded-xl w-full focus:border-orange-500 focus:ring-orange-500"
                />
                <input
                  type="password"
                  ref={elRePass}
                  autoComplete="re-password"
                  onChange={(e) => handlePassUnsame(e)}
                  placeholder="Re-Password"
                  className="col-span-2 rounded-xl w-full focus:border-orange-500 focus:ring-orange-500"
                />
                <p className="col-span-2 text-xs mx-auto transition-all rounded-md px-2 font-semibold text-red-100 bg-red-500 w-max">
                  {errMsg}
                </p>
                <p className="col-span-2 text-xs mx-auto transition-all rounded-md px-2 font-semibold text-green-100 bg-green-500 w-max">
                  {succes}
                </p>
                <button
                  onClick={(e) => handleSubmit(e)}
                  type="button"
                  className="col-span-2 h-10 rounded-xl w-full text-white flex items-center justify-center hover:bg-orange-600 bg-orange-500"
                >
                  Create Account
                </button>
              </form>
              <p className="text-start leading-5 my-3 text-sm">
                Already have an account? here, go to{" "}
                <Link
                  to={"/login"}
                  className="font-semibold underline text-orange-400 hover:text-orange-600"
                >
                  Login page
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-7/12 bg-slate-100 hidden lg:block overflow-hidden relative">
          <div className="absolute -left-[150px] top-1/2 -translate-y-1/2 h-[300px] aspect-square bg-orange-600 blur-[10rem]" />
          <div className="grid grid-cols-2 content-center gap-4 h-[120%] w-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div></div>
            <div className="h-[600px] bg-orange-500 rounded-tr-[150px] rounded-bl-[150px]"></div>
            <div className="h-[350px] border-zinc-800 rounded-tr-[150px] border-4 p-2 flex items-end">
              <p className="font-bold break-words leading-none text-[2.5rem]">
                Create the new Inspiration
              </p>
            </div>
            <div className="h-[300px] bg-orange-400 rounded-br-[150px] p-2">
              <p className="font-bold leading-none text-[2.5rem] text-white">
                Explore Thousand of Artwork
              </p>
            </div>
            <div className="h-[500px] bg-orange-500 rounded-tl-[150px]"></div>
          </div>
        </div>
      </div>
    );
  }
};

export default Registration;
