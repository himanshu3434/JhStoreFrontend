import React from "react";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <div className="flex justify-between shadow-md px-2 md:px-10">
      <div>
        <a href="">
          <img src="/public/JhStore_transparent.png" alt="" className="w-20" />
        </a>
      </div>
      <div className="w-1/3 flex items-center justify-end space-x-3 ">
        <div>search</div>

        <NavLink to="/">Home </NavLink>
        <NavLink to="/products">Products </NavLink>
        <NavLink to="/cart">Cart </NavLink>
        <NavLink to="/wishlist">WishList </NavLink>

        <NavLink to="/admin">Profile</NavLink>
      </div>
    </div>
  );
}

export default Header;
