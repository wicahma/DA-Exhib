import axios from "axios";
import React, { useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import { Link, useLocation, useParams } from "react-router-dom";
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
const useKomentar = (dataArt, token, comment) => {
  let [komentarByArt, setKomentarByArt] = useState([]);
  console.log("get comment goes brr..");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_POINT}comments/${dataArt._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setKomentarByArt(res.data);
      })
      .catch((err) => console.log(err));
  }, [token, comment]);
  return komentarByArt;
};

// @ Get Art By User
const useArtByUser = (dataArt) => {
  let [dataArtPengguna, setArtPengguna] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_POINT}arts/user/${dataArt.creatorID}`)
      .then((res) => {
        setArtPengguna(res.data);
        // console.log(res);
      })
      .catch((err) => console.log(err));
  }, [dataArt.creatorID]);
  return dataArtPengguna;
};

// @ Get Likes By Arts
const useLikes = (dataArt, token) => {
  let [dataLikes, setLikes] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_POINT}likes/${dataArt.namaPengguna}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setLikes(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [token]);
  return dataLikes;
};

const CIDetail = (props) => {
  let [showComment, setComment] = useState(false);
  let [commentRefresh, setCommentRefresh] = useState(false);
  let [myComment, setMyComment] = useState();
  let [render, setRender] = useState();
  const location = useLocation();
  const dataArt = location.state.dataArt;

  const userArt = useArtByUser(dataArt);
  const [creator, setCreator] = useState();
  // const likes = useLikes(dataArt);
  const komentar = useKomentar(dataArt, props.user.token, commentRefresh);

  const carouselRef = useRef();
  const oneImage = useRef();

  useEffect(() => {
    if (userArt === undefined) return userArt;
    let selected = userArt.findIndex((data) => data._id === dataArt._id);
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
  }, [userArt]);

  const handleSendComment = (comment) => {
    // console.log("sudah dikirim");
    console.log(comment.target.id);
    // console.log(oneImage.current.id);
    axios
      .post(
        `${process.env.REACT_APP_API_POINT}comments/${comment.target.id}`,
        {
          comment: myComment,
        },
        {
          headers: { Authorization: `Bearer ${props.user.token}` },
        }
      )
      .then((res) => {
        console.log(res);
        setMyComment("");
        commentRefresh !== false
          ? setCommentRefresh(false)
          : setCommentRefresh(true);
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
    !showComment ? setComment(true) : setComment(false);
    console.log(props.validate);
  };

  const handleDeleteComment = (artID, commentID) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_POINT}comments/${artID}/${commentID}`,
        {
          headers: { Authorization: `Bearer ${props.user.token}` },
        }
      )
      .then((res) => {
        commentRefresh !== false
          ? setCommentRefresh(false)
          : setCommentRefresh(true);
      })
      .catch((err) => console.log(err));
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
          transitionDuration={500}
          containerClass="h-full"
          deviceType={props.deviceType}
          dotListClass="nahh"
          itemClass="w-full h-full"
          sliderClass="h-full"
        >
          {userArt === undefined ? (
            <div>Loading</div>
          ) : (
            userArt.map((images) => {
              return (
                <div
                  key={images._id}
                  ref={oneImage}
                  className="grid md:grid-cols-2 grid-cols-1 gap-4 h-full"
                >
                  <div className="gambar w-full overflow-y-auto col-span-1  bg-opacity-10 rounded-2xl">
                    <img
                      src={images.imageUrl}
                      alt={images.imageUrl}
                      className="bg-cover object-cover object-center rounded-2xl my-auto"
                    />
                  </div>
                  <div className="col-span-1 gambar-side space-y-5 overflow-y-auto  h-full">
                    <div className="deskripsi ">
                      <h2 className="font-bold text-2xl">{images.name}</h2>
                      <p>{images.desc}</p>
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
                            id={images._id}
                            onClick={(e) => handleSendComment(e)}
                            className="bg-orange-500 absolute right-0 bottom-0 rounded-full w-min mt py-1 px-4"
                          >
                            Send
                          </button>
                        </form>
                      </div>
                      <div className="">
                        {komentar !== undefined &&
                          komentar.map((data) => {
                            return (
                              <Comment
                                key={data._id}
                                namaUser={data.userID.username}
                                idUser={data.userID._id}
                                komentar={data.comment}
                                handleDelete={() =>
                                  handleDeleteComment(images._id, data._id)
                                }
                              />
                            );
                          })}
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
  user: state.handleAPI.dataUser,
});

export default connect(mapStateToProps)(CIDetail);
