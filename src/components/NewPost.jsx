import React from "react";
import { Link } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";

const NewPost = (props) => {
  let location = useLocation()
  console.log(location)
  return (

    <div className="fixed bottom-5 right-10 bg-orange-500 hover:bg-orange-600 transition-colors rounded-full z-50">
      <Link to={'/profile/upload-art'} className="flex items-center gap-2 py-2 px-4 hover:scale-110 transition-transform font-medium text-white">
        Upload <BsFillPlusCircleFill />
      </Link>
    </div>
  );
};

let PostButton = NewPost

export default PostButton

