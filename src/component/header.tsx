import React from "react";
import { IoMdHome } from "react-icons/io";
import { FaArchive } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Input from "./Input";
import { FieldValues, useForm } from "react-hook-form";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { updateFilter } from "../features/filterSlice";
function Header() {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const searchFilterHandler = (data: FieldValues) => {
    data = data.search;

    dispatch(updateFilter({ data, id: "search" }));
  };
  return (
    <div className="flex justify-between shadow-md px-2 md:px-10">
      <div>
        <a href="">
          <img src="/JhStore_transparent.png" alt="" className="w-20" />
        </a>
      </div>
      <div>
        <form onSubmit={handleSubmit(searchFilterHandler)} className="flex ">
          <Input {...register("search", { required: true })} className="mt-5" />
          <Button type="submit" className="  ">
            Go
          </Button>
        </form>
      </div>

      <div className="w-1/3 flex items-center justify-end space-x-3 ">
        <NavLink to="/">
          {" "}
          <div className="">
            <div className=" flex justify-center">
              <IoMdHome />
            </div>
            <p className=" text-[.7rem] leading-3">Home</p>
          </div>{" "}
        </NavLink>
        <NavLink to="/products">
          {" "}
          <div className="">
            <div className=" flex justify-center">
              <FaArchive size={14} />
            </div>
            <p className=" text-[.7rem] leading-3">Products</p>
          </div>{" "}
        </NavLink>
        <NavLink to="/cart">
          {" "}
          <div className="">
            <div className=" flex justify-center">
              <FaCartShopping />
            </div>
            <p className=" text-[.7rem] leading-3">Cart</p>
          </div>{" "}
        </NavLink>
        <NavLink to="/wishlist">
          {" "}
          <div className="">
            <div className=" flex justify-center">
              <FaHeart />
            </div>
            <p className=" text-[.7rem] leading-3">WishList</p>
          </div>{" "}
        </NavLink>

        <NavLink to="/admin">
          {" "}
          <div className="">
            <div className=" flex justify-center">
              <FaUser />
            </div>
            <p className=" text-[.7rem] leading-3">Profile</p>
          </div>{" "}
        </NavLink>
        <NavLink to="/login">
          {" "}
          <div className="">
            <div className=" flex justify-center">
              <FaUser />
            </div>
            <p className=" text-[.7rem] leading-3">login</p>
          </div>{" "}
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
