import axios from "axios";
import React from "react";
import { connect } from "react-redux";

class ArtworkComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artwork: null,
    };
  }

  getArtworks = (token) => {
    axios
      .get(`${process.env.REACT_APP_API_POINT}arts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => this.setState({ artwork: res.data }))
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    this.getArtworks(this.props.user.token);
  }

  render() {
    return (
      <div className="w-full">
        <h2 className="font-bold text-3xl mb-5">My Artworks</h2>
        <div className="columns-4 gap-4 space-y-4">
          {this.state.artwork === null ? (
            <div>Loading...</div>
          ) : (
            this.state.artwork.map((artwork, index) => {
              return (
                <div key={artwork._id} className="">
                  <img
                    src={artwork.imageUrl}
                    className="rounded-xl"
                    alt={index}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.handleAPI.dataUser,
});

export default connect(mapStateToProps)(ArtworkComponent);
