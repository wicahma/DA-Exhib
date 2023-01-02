import axios from "axios";
import React, { useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import { Link, useLocation } from "react-router-dom";
import Comment from "./Comment";
import "react-multi-carousel/lib/styles.css";
import "./component.css";
import { useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { HiChatBubbleOvalLeft } from "react-icons/hi2";
import { connect } from "react-redux";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

// @ Get Comments
const useKomentar = (dataArt, comment) => {
  let [komentarByArt, setKomentarByArt] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_POINT}komentar?idArt=${dataArt.id}`)
      .then((res) => {
        console.log(res);
        setKomentarByArt(res.data);
      })
      .catch((err) => console.log(err));
  }, [comment]);
  return komentarByArt;
};

// @ Get Art By User
const useUser = (dataArt) => {
  let [dataArtPengguna, setArtPengguna] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_POINT}arts/user/${dataArt.creatorID}`)
      .then((res) => {
        setArtPengguna(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [dataArt.idPengguna]);
  return dataArtPengguna;
};

// @ Get Likes By Art
const useLikes = (dataArt) => {
  let [dataLikes, setLikes] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_POINT}arts/${dataArt.namaPengguna}`)
      .then((res) => {
        setLikes(res.data);
      })
      .catch((err) => console.log(err));
  }, [dataArt.idPengguna]);
  return dataLikes;
};



const CIDetail = (props) => {
  let [showComment, setComment] = useState(false);
  let [myComment, setMyComment] = useState();
  let [render, setRender] = useState();
  const location = useLocation();
  const dataArt = location.state.dataArt;

  const user = useUser(dataArt);
  const [creator, setCreator] = useState();
  // const likes = useLikes(dataArt);
  const komentar = useKomentar(dataArt, showComment);

  const carouselRef = useRef();
  const oneImage = useRef();

  useEffect(() => {
    if (user === undefined) return user;
    let selected = user.findIndex((data) => data._id === dataArt._id);
    console.log(carouselRef);
    setTimeout(() => {
      if (selected >= 0) {
        carouselRef.current.goToSlide(selected + 2, true);
      }
    }, 500);
    axios
      .get(`${process.env.REACT_APP_API_POINT}users/name/${dataArt.creatorID}`)
      .then((res) => {
        setCreator(res.data.username);
      })
      .catch(() => {
        setCreator(null);
      });
  }, [user]);

  const handleSendComment = (comment) => {
    console.log("sudah dikirim");
    console.log(comment.target.id);
    // console.log(oneImage.current.id);
    axios
      .post("${process.env.REACT_APP_API_POINT}/komentar", {
        idPengguna: "123",
        idArt: parseInt(comment.target.id),
        komentar: myComment,
        namaPengguna: "Teguh Dwi Cahya Kusuma",
        uploadAt: "22-10-2022",
      })
      .then((res) => {
        console.log(res);
        setMyComment("");
        setComment(false);
        setComment(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = () => {
    console.log("sudah di klik");
  };

  const handleLike = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const handleComment = (e) => {
    // comments.current.classList[0] === ''
    !showComment ? setComment(true) : setComment(false);
    console.log(props.validate);
    // e.stopPropagation();
    // e.preventDefault();
  };

  return (
    <>
      <Link
        to={"/explore"}
        onClick={() => handleDelete()}
        className="fixed w-screen h-screen z-20 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 backdrop-blur-sm"
      ></Link>
      <div className="bg-white gap-5 scroll-mb-10 lg:w-[70%] w-full lg:h-[70%] h-[75%]  rounded-tr-3xl sm:rounded-br-3xl sm:rounded-bl-3xl p-3 z-50 fixed sm:top-1/2 sm:-translate-y-1/2 bottom-0  left-1/2 -translate-x-1/2">
        <div className="absolute -top-8 bg-white px-3 py-2 rounded-tl-2xl font-bold text-sm">
          <h3>
            Collection of: <span className="font-medium">{creator}</span>
          </h3>
        </div>
        <Carousel
          swipeable={false}
          additionalTransfrom={false}
          ref={carouselRef}
          // focusOnSelect={true}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          // autoPlay={props.deviceType !== "mobile" ? true : false}
          // autoPlay={false}
          // autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={100}
          containerClass="h-full"
          deviceType={props.deviceType}
          dotListClass="nahh"
          itemClass="w-full h-full"
          sliderClass="h-full"
        >
          {user === undefined ? (
            <div>Loading</div>
          ) : (
            user.map((user) => {
              return (
                <div
                  key={user._id}
                  ref={oneImage}
                  className="grid md:grid-cols-2 grid-cols-1 gap-4 h-full"
                >
                  <div className="gambar w-full overflow-y-auto col-span-1  bg-opacity-10 rounded-2xl">
                    <img
                      src={user.imageUrl}
                      alt={user.imageUrl}
                      className="bg-cover object-cover object-center rounded-2xl my-auto"
                    />
                  </div>
                  <div className="col-span-1 space-y-5 overflow-y-auto  h-full">
                    <div className="deskripsi ">
                      <h2 className="font-bold text-2xl">{user.name}</h2>
                      <p>{user.desc}</p>
                    </div>
                    <div>
                      <audio className="w-full h-10" controls>
                        <source type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                    <div className="flex flex-row-reverse text-2xl gap-1">
                      <div
                        onClick={(e) => handleLike(e)}
                        className="p-1 rounded-lg bg-red-500 hover:bg-red-700 hover:scale-110 transition-all active:scale-75"
                      >
                        <AiFillHeart className="text-red-200" />
                      </div>
                      <div
                        onClick={(e) => handleComment(e)}
                        className="p-1 rounded-lg bg-slate-500 hover:bg-slate-700 hover:scale-110 transition-all active:scale-75"
                      >
                        <HiChatBubbleOvalLeft className="text-slate-200" />
                      </div>
                      <div className="grow text-xl font-bold bg-red-500 rounded-lg text-red-100 px-3">
                        <p>{0} Likes</p>
                      </div>
                    </div>
                    <div className={showComment ? "block" : "hidden"}>
                      <h3 className="font-bold text-xl">Comment</h3>
                      <div className="bg-white shadow-xl overflow-hidden relative p-4 rounded-xl">
                        {!props.validate ? (
                          <div className="absolute h-full w-full left-0 top-0 flex flex-wrap text-center content-center gap-2 justify-center items-center backdrop-blur-sm text-md font-medium z-50">
                            <p className="w-full">
                              Silahkan login untuk menambahkan komentar.
                            </p>
                            <div className="flex gap-3">
                              <Link
                                to={"/login"}
                                className="px-5 py-1 text-sm rounded-full border border-stone-700 hover:bg-orange-500 hover:text-white hover:border-orange-500"
                              >
                                Login
                              </Link>
                              <Link
                                to={"/registration"}
                                className="px-5 py-1 text-sm rounded-full border border-stone-700 bg-stone-700 hover:bg-stone-900 hover:border-stone-900 text-white"
                              >
                                Create Account
                              </Link>
                            </div>
                          </div>
                        ) : null}
                        <form className="flex flex-col relative">
                          <label htmlFor="komentar">Masukkan Komentar</label>
                          <input
                            id="komentar"
                            onChange={(e) => setMyComment(e.target.value)}
                            type="text"
                            className="mb-10"
                          />
                          <button
                            type="button"
                            id={user.id}
                            onClick={(e) => handleSendComment(e)}
                            className="bg-orange-500 absolute right-0 bottom-0 rounded-full w-min mt py-1 px-4"
                          >
                            Send
                          </button>
                        </form>
                      </div>
                      <div className="">
                        {/* {komentar
                            .filter((komentar) => komentar.idArt === user.id)
                            .map((data) => {
                              return (
                                <Comment
                                  namaUser={data.namaPengguna}
                                  komentar={data.komentar}
                                />
                              );
                            })} */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </Carousel>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  validate: state.handleAPI.validate,
});

export default connect(mapStateToProps)(CIDetail);
