import React, { ChangeEvent, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";
import { FaBorderAll, FaRegAddressCard, FaRegUser } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { GrLogin } from "react-icons/gr";
import { FiEdit2 } from "react-icons/fi";
import { GrLogout } from "react-icons/gr";
import Input from "./Input";
import { FieldValues, useForm } from "react-hook-form";
import Button from "./Button";
import { TbLogin } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../features/filterSlice";
import { RootState } from "../store/Store";
import { Iuser } from "../types/types";
import useLogout from "../hooks/useLogout";
import { GoChecklist } from "react-icons/go";
import { getAllCartItems } from "../api/cartApi";

function Header() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const logout = useLogout();
  const navigate = useNavigate();

  //this is for mobile navbar currently not used
  const searchFilterHandler = (data: FieldValues) => {
    data = data.search;
    dispatch(updateFilter({ data, id: "search" }));
  };
  const userData = useSelector(
    (state: RootState) => state.auth.userData
  ) as Iuser | null;
  const handlerLogout = async () => {
    await logout();
  };

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      const data = search;
      dispatch(updateFilter({ data, id: "search" }));
      if (data.length !== 0) navigate("/products");
    }, 500);

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [search]);

  const ProfileHover = (
    <div>
      <div className=" bg-white shadow-md p-4 rounded-lg ">
        {userData && userData.role === "admin" ? (
          <Link to="/admin">
            <div className="flex  items-center my-2 space-x-2 hover:text-gray-500">
              <GrUserAdmin />
              <div>Admin Panel</div>
            </div>
          </Link>
        ) : null}
        {userData && (
          <Link to="/profile">
            <div className="flex items-center  my-2 space-x-2 hover:text-gray-500">
              <FiEdit2 />
              <div>Edit Profile</div>
            </div>
          </Link>
        )}
        {userData && (
          <Link to="/orders">
            <div className="flex items-center  my-2 space-x-2 hover:text-gray-500">
              <GoChecklist />
              <div>Orders</div>
            </div>
          </Link>
        )}
        {userData && (
          <Link to="/address">
            <div className="flex items-center  my-2 space-x-2 hover:text-gray-500">
              <FaRegAddressCard />
              <div>Address</div>
            </div>
          </Link>
        )}

        {userData && (
          <div
            className="flex   items-center   my-2 space-x-2 hover:text-gray-500"
            onClick={handlerLogout}
          >
            <GrLogout />
            <div>Logout</div>
          </div>
        )}
        {userData === null ? (
          <Link to="/login">
            <div className="flex   items-center   my-2 space-x-2 hover:text-gray-500">
              <TbLogin size={20} />
              <div>Login</div>
            </div>
          </Link>
        ) : null}
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
          </Link>{" "}
          <div className="group   hover:border-b-2 border-pink-500  cursor-pointer ">
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
          <Link to="/cart">
            {" "}
            <div className="group    hover:border-b-2 border-cyan-500">
              {/* {totalQuantity !== 0 ? (
                <div className="absolute right-3 top-4 bg-red-600 text-white rounded-full px-1 text-xs">
                  {totalQuantity}
                </div>
              ) : null} */}
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

// useEffect(() => {
//   const getCartItemsQuantity = async () => {
//     console.log("userData  in header", userData);
//     const getAllCartItemsResponse = await getAllCartItems(
//       userData?._id || ""
//     );

//     if (getAllCartItemsResponse.data.success) {
//       const quantityGrandtotal =
//         getAllCartItemsResponse.data.data.totalQuantity;
//       setTotalQuantity(quantityGrandtotal);

//       console.log("quantityGrandtotal", quantityGrandtotal);
//     }
//   };
//   if (userData !== null) getCartItemsQuantity();
// }, []);
