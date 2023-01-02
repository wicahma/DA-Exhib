import React from "react";

const dummyImage = [1,9,2,7,5,4,2,8,3,6]


export default class LikesComponent extends React.Component {
  render() {
    return (
      <div>
        <h2 className="font-bold text-3xl">Likes</h2>
        <div className="w-full divide-x-8 divide-orange-400  bg-white h-60 p-5 shadow-xl items-center rounded-2xl flex justify-between">
            <div className="shrink h-full flex items-center">
                <p className="text-5xl w-[50%] text-orange-400 break-words font-bold">Likes that you gained</p>
            </div>
            <div className="grow h-full flex items-center justify-end">
                <p className="text-5xl text-end text-orange-400 font-bold">295k</p>
            </div>

        </div>

        <div className="mt-5">
            <h2 className="font-bold text-3xl">Liked Artworks</h2>
            <div className="columns-4 gap-4 space-y-4 mt-3">
            {dummyImage.map((artwork, index) => {
              return (
                <div key={artwork} className="">
                  <img src={`https://picsum.photos/800/1${artwork}00?random=${artwork}`} className="rounded-xl" alt={index} />
                </div>)})}
        </div>
        </div>
      </div>
    );
  }
}
