import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import carousel from "./carousel.png";

export const Hero = (props) => {
  return (
    <Fragment>
      <div className="grid px-10 grid-cols-5 mt-6 gap-10 h-[850px] mb-14">
        <div className="md:col-span-2 col-span-5 space-y-10 overflow-hidden">
          <h2 className="font-serif text-8xl">
            <span className="text-orange-500">Da Exhib</span> Art Gallery
          </h2>
          <p className="mt-5">
            Dengan tujuan untuk menyatukan para kreator Seini yang ada di dunia,
            dibuatlah Art Gallery ini Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <div className="relative h-[54%]">
            <ul
              className="flex gap-4 absolute left-0 text-xs font-semibold"
              style={{ writingMode: `vertical-rl`, textOrientation: `mixed` }}
            >
              <li className="w-[15px]">Instagram</li>
              <li className="w-[15px]">Twitter</li>
              <li className="w-[15px]">Facebook</li>
            </ul>
            <img
              className="absolute  right-0 md:w-3/5 w-[95%] h-full bg-cover rounded-tl-[220px] object-cover object-center"
              src="https://picsum.photos/1200?random=3"
              alt="gambar"
            />
          </div>
        </div>
        <div className="col-span-3 hidden md:block">
          <div className="columns-2 gap-10 space-y-5">
            <div className="h-[250px] overflow-hidden rounded-br-[220px]">
              <img
                className="w-full h-full bg-cover object-cover object-center"
                src="https://picsum.photos/1200?random=1"
                alt=""
              />
            </div>
            <div className="h-[600px] overflow-hidden rounded-tr-[220px]">
              <img
                className="w-full h-full bg-cover object-cover object-center"
                src="https://picsum.photos/1200?random=4"
                alt=""
              />
            </div>
            <div className="h-[600px] overflow-hidden rounded-tr-[220px]">
              <img
                className="w-full h-full bg-cover object-cover object-center"
                src="https://picsum.photos/1200?random=5"
                alt=""
              />
            </div>
            <div className="h-[250px] overflow-hidden">
              <img
                className="w-full h-full bg-cover object-cover object-center"
                src="https://picsum.photos/1200?random=6"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full h-[1080px] bg-cover bg-center flex flex-col justify-center items-center font-serif text-5xl text-white bg-stone-900"
        style={{ backgroundImage: `url(${carousel})` }}
      >
        <p>Explore Thousand</p>
        <p>of Art</p>
      </div>
      <div>
        <div className="w-full h-[250px] flex justify-center items-center flex-col">
          <p className="font-serif text-7xl">Join Now</p>
          <div className="flex gap-3">
            <Link
              to={"/login"}
              className="px-5 py-1 rounded-full border-2 border-stone-700 hover:bg-stone-900 hover:text-white hover:border-stone-900"
            >
              Login
            </Link>
            <Link
              to={"/registration"}
              className="px-5 py-1 rounded-full border-2 border-stone-700 bg-stone-700 hover:bg-stone-900 hover:border-stone-900 text-white"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
