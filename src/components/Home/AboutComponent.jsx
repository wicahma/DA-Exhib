import React from "react";

export const AboutComponent = (props) => {
  return (
    <div className="col-span-1">
      <div className="relative">
        <img
          src={`https://picsum.photos/800/1000?random=${props.ImgUrl}`}
          className="w-full h-[380px] rounded-tr-[200px] rounded-tl-[200px] object-cover"
          alt="Tentang Kami"
        />
        <div className="absolute top-[280px] p-3 -left-5">
          <p className="px-2 text-xl rounded-br-[15px] font-bold w-full rounded-tl-[15px] bg-yellow-400 ">
            {props.role}
          </p>
          <div className="bg-white p-1 font-medium mt-1 rounded-md w-max">
            <p className="text-xs pl-1 pr-2">{props.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
