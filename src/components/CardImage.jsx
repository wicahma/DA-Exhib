import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { IoPlay } from "react-icons/io5";
import { HiChatBubbleOvalLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";

export const CardImage = (props) => {
  const handleLike = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleComment = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  
  const handlePlaySound = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  
  return (
    <div className="group relative cursor-pointer">
      <Link to={`/explore/${props.dataG._id}`} state={{ dataArt: props.dataG }}>
        <img
          src={props.urlGambar}
          alt={props.urlGambar}
          className="bg-cover object-cover object-center rounded-2xl"
        />
        <div className="absolute pt-8 max-h-[45%] rounded-lg overflow-hidden bottom-2 transition-all translate-y-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 w-[95%] ">
          <div className="bg-white px-3 py-2 rounded-lg">
            <h4 className="font-semibold text-xs">{props.namaArt}</h4>
            <p className="text-xs">{props.deskripsi}</p>
          </div>
          <div className="absolute flex justify-between top-1 right-0 w-full">
            <div className="px-2 pt-1 font-semibold rounded-lg text-xs bg-white ">
              <p className="align-middle h-full w-full">123k Likes</p>
            </div>
            <div className="flex gap-1">
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
              <div
                onClick={(e) => handlePlaySound(e)}
                className="p-1 rounded-lg bg-orange-500 hover:bg-orange-700 hover:scale-110 transition-all active:scale-75"
              >
                <IoPlay className="text-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
