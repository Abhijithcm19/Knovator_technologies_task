import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="flex justify-between items-center p-3 mx-auto bg-amber-500">
      <div className="flex gap-4">
        <Link to="/" className="pl-6 flex gap-1 items-center">
          <AiFillHome className="text-2xl" />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/cart" className="pr-6 flex gap-1 items-center">
          <BsCart4 className="text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default Nav;
