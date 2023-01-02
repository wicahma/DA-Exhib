import React from "react";

const dummyImage = [1,9,2,7,5,4,2,8,3,6]

export default class ArtworkComponent extends React.Component {
  render() {
    return (
      <div className="w-full">
        <h2 className="font-bold text-3xl mb-5">My Artworks</h2>
        <div className="columns-4 gap-4 space-y-4">
            {dummyImage.map((artwork, index) => {
              return (
                <div key={artwork} className="">
                  <img src={`https://picsum.photos/800/1${artwork}00?random=${artwork}`} className="rounded-xl" alt={index} />
                </div>)})}
        </div>
      </div>
    );
  }
}
