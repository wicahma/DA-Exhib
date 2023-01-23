import React from "react";
import { BsFillTrash2Fill } from "react-icons/bs";
import { connect } from "react-redux";

const Comment = (props) => {
  const handleShowDelete = (localID, commentID) => {
    if (localID === undefined || localID === null) return "Loading";
    if (localID !== commentID) return null;
    return (
      <div className="shrink pr-2">
        <button
          onClick={() => props.handleDelete()}
          className="bg-red-100 p-1 rounded-full text-xl text-red-300 hover:text-red-500 hover:bg-red-200 transition-all hover:scale-110"
        >
          <BsFillTrash2Fill />
        </button>
      </div>
    );
  };
  return (
    <div className="my-5 flex justify-between flex-nowrap">
      <div className="grow">
        <h5 className="font-bold">{props.namaUser}</h5>
        <p className="pl-2 ml-2 border-l-2 border-l-black/[.20]">
          {props.komentar}
        </p>
      </div>
      {handleShowDelete(props.id, props.idUser)}
    </div>
  );
};
const mapStateToProps = (state) => ({
  id: state.handleAPI.dataUser._id,
});

export default connect(mapStateToProps)(Comment);
