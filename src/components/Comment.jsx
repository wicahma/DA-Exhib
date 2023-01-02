import React from "react";

const Comment = (props) => {
  return (
    <div className="my-5">
      <h5 className="font-bold">{props.namaUser}</h5>
      <p className="pl-2 ml-2 border-l-2 border-l-black/[.20]">{props.komentar}</p>
    </div>
  );
};

export default Comment;
