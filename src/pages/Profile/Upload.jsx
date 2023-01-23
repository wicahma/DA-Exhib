import axios from "axios";
import React, { Fragment } from "react";
import { useRef } from "react";
import { BsFileEarmarkImage } from "react-icons/bs";
import { MdOutlineDeleteForever } from "react-icons/md";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.imgFile = React.createRef();
    this.state = {
      upload: {
        name: "",
        desc: "",
      },
      files: [],
      file: null,
      url: "",
      error: "",
      uploadStatus: false,
      uploadMsg: "",
    };
  }

  handleInputChange = (data) => {
    let file = data.target.files[0];
    let blobURL = URL.createObjectURL(file);
    document.querySelector("#art-preview").src = blobURL;
    document.querySelector("#nama-file").innerText = file.name;
    document.querySelector("#input-image").classList.remove("opacity-50");
    const img = {
      preview: URL.createObjectURL(this.imgFile.current.files[0]),
      data: this.imgFile.current.files[0],
    };
    this.setState(
      {
        file: img,
        error: "",
      },
      console.log(this.state.file)
    );
  };

  handleSubmit = async (token) => {
    if (this.state.upload.name === "")
      return this.setState({ error: "Isi kolom nama" });
    if (this.state.upload.desc === "")
      return this.setState({ error: "Isi kolom deskripsi" });
    if (this.state.file === null)
      return this.setState({ error: "Tambahkan Karya Seni terlebih dahulu!" });
    let formData = new FormData();
    formData.append("file", this.state.file.data);
    // var config = {
    //   onUploadProgress: function (progressEvent) {
    //     var percentCompleted = Math.round(
    //       (progressEvent.loaded * 100) / progressEvent.total
    //     );
    //     console.log(percentCompleted);
    //   },
    // };
    axios
      .post(`${process.env.REACT_APP_API_POINT}arts/upload-file`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        axios
          .post(
            `${process.env.REACT_APP_API_POINT}arts`,
            {
              name: this.state.upload.name,
              desc: this.state.upload.desc,
              imageUrl: `https://drive.google.com/uc?export=view&id=${res.data.idArt}`,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then(() => this.setState({ uploadStatus: true }))
          .catch((err) =>
            this.setState({
              uploadMsg: "Art gagal diupload, coba dalam beberapa saat lagi",
            })
          );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleDeleteData = (id) => {
    const data = document.querySelector(id);
    data.value = null;
    document.querySelector("#art-preview").src = "";
    document.querySelector("#nama-file").innerText =
      "Tidak ada file yang dipilih.";
    document.querySelector("#input-image").classList.add("opacity-50");
    this.setState({
      file: null,
    });
  };

  handleOnChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    this.setState({
      upload: { ...this.state.upload, [id]: value },
      error: "",
    });
  };

  render() {
    return (
      <Fragment>
        {this.state.uploadStatus ? <Navigate to="/explore" replace /> : null}
        <h3 className="mx-auto text-3xl font-bold">Upload</h3>
        <form action="put" className="grid grid-cols-4 gap-4">
          <div
            id="input-image"
            className="col-span-4 border-2 hover:border-orange-500 opacity-50 hover:opacity-100 transition-all border-dashed rounded-2xl flex flex-col items-center relative"
          >
            <input
              type="file"
              ref={this.imgFile}
              className="opacity-0 absolute bg-black w-full h-full"
              onChange={(e) => this.handleInputChange(e)}
            />
            <div className="text-gray-500 flex flex-col my-5 font-medium  items-center">
              <BsFileEarmarkImage className="text-7xl mb-2" />
              <p
                id="nama-file"
                className="font-light text-sm bg-gray-500 rounded-full w-max text-white mb-2 px-3"
              >
                Tidak ada file yang dipilih.
              </p>
              <p>
                <span className="px-[3px] py-[2px] rounded-md bg-orange-400 text-white">
                  .jpg
                </span>{" "}
                &{" "}
                <span className="px-[3px] py-[2px] rounded-md bg-orange-400 text-white">
                  .png
                </span>{" "}
                allowed
              </p>
              <p>5Mb Max File Size.</p>
            </div>
            <label
              htmlFor="input-image"
              className="bg-orange-400 py-1 px-4 rounded-full mb-5 text-white text-sm"
            >
              Select Image
            </label>
            <button
              type="button"
              onClick={() => this.handleDeleteData("#input-image")}
              className="text-2xl absolute top-2 right-2 transition-colors rounded-full p-1 text-red-600 aspect-square bg-red-300 hover:bg-red-600 hover:text-red-50"
            >
              <MdOutlineDeleteForever />
            </button>
          </div>

          <input
            type="text"
            id="name"
            onChange={(e) => this.handleOnChange(e)}
            placeholder="Art Name"
            className="col-span-4 rounded-xl w-full focus:border-orange-500 focus:ring-orange-500"
          />

          <textarea
            id="desc"
            name="art-description"
            onChange={(e) => this.handleOnChange(e)}
            type="text"
            placeholder="Art Description"
            className="col-span-2 rounded-xl w-full focus:border-orange-500 focus:ring-orange-500 caret-orange-500 min-h-[214px]"
          />
          <div className="col-span-2 h-full font-semibold">
            <p>Art Preview</p>
            <img
              src=""
              id="art-preview"
              className="min-h-[89%] border border-gray-500 rounded-xl"
              controls
            ></img>
          </div>
          {this.state.error === "" ? null : (
            <div className="col-span-4 text-sm text-white">
              <p className="bg-red-600 w-max px-3 rounded-md">
                {this.state.error}
              </p>
            </div>
          )}
          {this.state.uploadMsg === "" ? null : (
            <div className="col-span-4 text-sm text-white">
              <p className="bg-red-600 w-max px-3 rounded-md">
                {this.state.uploadMsg}
              </p>
            </div>
          )}
          <label className="col-span-3 gap-2 flex flex-row items-center">
            <input
              type="checkbox"
              name="Agreement"
              id="agreement"
              className="rounded-md focus:ring-orange-500 text-orange-500"
            />

            <span className="text-xs font-medium cursor-pointer select-none">
              By checking this box, I agree with DaExhib user agreement & I
              admit that this work is purely my creation
            </span>
          </label>

          <div className="col-span-1 text-end">
            <button
              type="button"
              onClick={() => this.handleSubmit(this.props.user.token)}
              className="px-3 py-1 text-white bg-orange-500 hover:bg-orange-600 transition-colors rounded-full"
            >
              Upload Artwork
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

const mapstateToProps = (state) => ({
  user: state.handleAPI.dataUser,
});

export default connect(mapstateToProps)(Upload);
