import React from "react";
import exploreBg from "./explore-bg.svg";
import { connect } from "react-redux";
import { fetchAPI } from "../../redux/handleApiActions";
import { CardImage } from "../../components/CardImage";
import { Outlet } from "react-router-dom";
import axios from "axios";

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [],
      likes: [],
      usrImg: [],
    };
  }

  getAPI = (stateName, url) => {
    this.props.dispatch(fetchAPI(url));
    this.setState(
      {
        [stateName]: this.props.dataAPI,
      }
      // () => console.log(this.state.image)
    );
  };

  componentDidMount() {
    console.log("mengambil data API");
    this.getAPI("image", "art")
  }

  renderPost = (listImg = []) => {
    if (this.props.loading) return <p>Loading Image</p>;
    if (this.props.hasErrors) return <p>Ups, ada kesalahan sedikit, hehe..</p>;
    return listImg.map((data) => (
      <CardImage
        dataG={data}
        key={data.id}
        urlGambar={data.urlGambar}
        namaArt={data.namaArt}
        deskripsi={data.deskripsi}
      />
    ));
  };

  render() {
    return (
      <div>
        <div className="w-full h-min relative">
          <img
            src={exploreBg}
            className="absolute z-[-1] -top-[200px] -left-[200px] w-[1000px]"
          />
          <h3 className="font-serif text-5xl text-center">Explore</h3>
          <p className="text-center pb-10">
            Explore hundred of artwork from many people that have lorem ipsum
            dolor sit.
          </p>
          <div className="absolute -bottom-5 left-1/2 w-full -translate-x-1/2">
            <form action="get" className="w-1/3 mx-auto">
              <input
                type="text"
                placeholder="Search Artwork's by name"
                className="rounded-xl border-none focus:border-0 focus:ring-0 shadow-md  bg-gray-50 focus:shadow-xl transition-shadow w-full"
              />
            </form>
          </div>
        </div>
        <div className="w-full bg-white pt-10 p-5">
          <div className="content w-full gap-4 space-y-4 sm:columns-2 md:columns-3 lg:columns-4 md:px-[5%] px-0 lg:px-[10%] mx-auto">
            {this.renderPost(this.props.dataAPI)}
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.handleAPI.loading,
  dataAPI: state.handleAPI.dataAPI,
  hasErrors: state.handleAPI.hasErrors,
});

export default connect(mapStateToProps)(Explore);
