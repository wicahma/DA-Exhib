import React from "react";
import exploreBg from "./explore-bg.svg";
import { connect } from "react-redux";
import { fetchAPI } from "../../redux/handleApiActions";
import { CardImage } from "../../components/CardImage";
import { Outlet } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import axios from "axios";

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [],
      imageSearch: null,
      likes: [],
      usrImg: [],
      search: "",
    };
  }

  getAPI = (stateName, url) => {
    this.props.dispatch(fetchAPI(url));
    this.setState({
      [stateName]: this.props.dataAPI,
    });
  };

  componentDidMount() {
    this.getAPI("image", "arts/all");
  }

  renderPost = (listImg = []) => {
    if (this.props.loading) return <p>Loading Image</p>;
    if (this.props.hasErrors) return <p>Ups, ada kesalahan sedikit, hehe..</p>;
    return listImg.map((data) => (
      <CardImage
        dataG={data}
        key={data._id}
        urlGambar={data.imageUrl}
        namaArt={data.name}
        deskripsi={data.desc}
      />
    ));
  };

  handleSearch = (data, token) => {
    if (token === undefined || data === "") return null;

    axios
      .get(`${process.env.REACT_APP_API_POINT}arts/search/${data}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => this.setState({ imageSearch: res.data }));
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
            <form action="get" className="w-1/3 mx-auto flex gap-3">
              <input
                type="text"
                onChange={(e) => {
                  this.setState({ search: e.target.value });
                }}
                placeholder="Search Artwork's by name"
                className="rounded-xl border-none focus:border-0 focus:ring-0 shadow-md  bg-gray-50 focus:shadow-xl transition-shadow w-full"
              />
              <button
                type="button"
                onClick={() =>
                  this.handleSearch(this.state.search, this.props.user.token)
                }
                className="rounded-xl border-none hover:bg-orange-400 active:scale-90 hover:text-white px-3 hover:scale-110 transition-all  shadow-md  bg-gray-50"
              >
                <FiSearch />
              </button>
            </form>
          </div>
        </div>
        <div className="w-full bg-white pt-10 p-5">
          {this.state.imageSearch === null ? null : (
            <>
              <h3 className="text-center text-xl font-bold mb-2">
                Hasil Pencarian untuk: {this.state.search}
              </h3>
              <div className="content w-full gap-4 space-y-4 mb-10 sm:columns-2 md:columns-3 lg:columns-4 md:px-[5%] px-0 lg:px-[10%] mx-auto">
                {this.state.imageSearch.length === 0 ? (
                  <p> Karya Seni tidak ditemukan</p>
                ) : (
                  this.state.imageSearch.map((data) => {
                    return (
                      <CardImage
                        dataG={data}
                        key={data._id}
                        urlGambar={data.imageUrl}
                        namaArt={data.name}
                        deskripsi={data.desc}
                      />
                    );
                  })
                )}
              </div>
              <h3 className="text-center mb-2 text-xl font-bold">
                Anda mungkin juga suka
              </h3>
            </>
          )}
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
  user: state.handleAPI.dataUser,
  hasErrors: state.handleAPI.hasErrors,
});

export default connect(mapStateToProps)(Explore);
