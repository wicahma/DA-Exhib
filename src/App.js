import { Fragment, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  useLocation,
  Route,
} from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Explore from "./pages/Explore/Explore";
import Registration from "./pages/Registration/Registration";
import ProfileComponent from "./components/Profile/ProfileComponent";
import LikesComponent from "./components/Profile/LikesComponent";
import ArtworkComponent from "./components/Profile/ArtworkComponent";
import Upload from "./pages/Profile/Upload";
import CIDetail from "./components/CIDetail";
import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem("dataUser"));

    dataUser
      ? props.dispatch({ type: "SET_USER", payload: dataUser })
      : console.log("data tidak ada");
  }, []);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Navigate to={"/home"} />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/registration" exact element={<Registration />} />
        <Route path="/explore" exact element={<Explore />}>
          <Route path=":id" exact element={<CIDetail />} />
        </Route>
        <Route path="/profile" exact element={<Profile />}>
          <Route index element={<ArtworkComponent />} />
          <Route path="edit" element={<ProfileComponent />} />
          <Route path="likes" element={<LikesComponent />} />
          <Route path="upload-art" element={<Upload />} />
        </Route>
      </Routes>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  dataUser: state.handleAPI.dataUser,
});

export default connect(mapStateToProps)(App);
