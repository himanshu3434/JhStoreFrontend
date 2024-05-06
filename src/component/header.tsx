import React, { ChangeEvent, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

import { Link } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { GrLogin } from "react-icons/gr";
import { FiEdit2 } from "react-icons/fi";
import { GrLogout } from "react-icons/gr";
import Input from "./Input";
import { FieldValues, useForm } from "react-hook-form";
import Button from "./Button";
import { TbLogin } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { updateFilter } from "../features/filterSlice";
function Header() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  //this is for mobile navbar currently not used
  const searchFilterHandler = (data: FieldValues) => {
    data = data.search;
    dispatch(updateFilter({ data, id: "search" }));
  };

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      const data = search;
      dispatch(updateFilter({ data, id: "search" }));
    }, 500);

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [search]);

  const ProfileHover = (
    <div>
      <div className=" bg-white shadow-md p-4 ">
        <Link to="/admin">
          <div className="flex  items-center my-2 space-x-2">
            <GrUserAdmin />
            <div>Admin Panel</div>
          </div>
        </Link>
        <Link to="/admin">
          <div className="flex items-center  my-2 space-x-2">
            <FiEdit2 />
            <div>Edit Profile</div>
          </div>
        </Link>
        <Link to="/admin">
          <div className="flex   items-center   my-2 space-x-2">
            <GrLogout />
            <div>Logout</div>
          </div>
        </Link>
        <Link to="/admin">
          <div className="flex   items-center   my-2 space-x-2">
            <TbLogin size={20} />
            <div>Login</div>
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between shadow-b-md sm:px-5 py-5  shadow-md">
        <div className=" flex  items-center text-2xl font-bold text-sky-500 hover:text-sky-600">
          <Link to="/">JHStore</Link>
        </div>
        <div className="flex items-center flex-1 justify-center">
          <div className="flex  relative items-center ">
            {" "}
            <IoSearchOutline className="absolute left-2 text-gray-400" />
            <Input
              className="rounded-lg outline-none pr-2  pl-9 py-1 text-gray-600 ring-2 ring-gray-200 focus:ring-gray-400 w-[30rem] h-[2.5rem]"
              placeholder="Search Items"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(String(e.target.value))
              }
            />
          </div>
        </div>

        <div className=" flex items-center justify-end space-x-8 ">
          <Link to="/products">
            {" "}
            <div className="   group hover:border-b-2 border-sky-500">
              <div className="  flex justify-center text-gray-500  group-hover:text-sky-600">
                <FiArchive size={20} />
              </div>
              <p className=" text-[.7rem] leading-2  font-semibold      group-hover:text-sky-600">
                Products
              </p>
            </div>{" "}
          </Link>

          <Link to="/admin">
            {" "}
            <div className="group   hover:border-b-2 border-pink-500 ">
              <div className=" flex justify-center  text-gray-500 group-hover:text-pink-500">
                <FaRegUser size={20} />
              </div>
              <p className=" text-[.7rem] leading-2 font-semibold    group-hover:text-pink-500">
                Profile
              </p>
              <div className="invisible absolute group-hover:visible  pt-5 right-20 z-30  ">
                {ProfileHover}
              </div>
            </div>{" "}
          </Link>

          <Link to="/cart">
            {" "}
            <div className="group   hover:border-b-2 border-cyan-500">
              <div className=" flex justify-center text-gray-500 group-hover:text-cyan-500">
                <FiShoppingCart size={20} />
              </div>
              <p className=" text-[.7rem] leading-2   font-semibold   group-hover:text-cyan-500">
                Cart
              </p>
            </div>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
