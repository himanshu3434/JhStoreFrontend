import React, { useEffect, useState } from "react";
import { FaRegAddressBook, FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Iuser } from "../types/types";
import { RootState } from "../store/Store";
import { DiVim } from "react-icons/di";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../component/Button";
import Input from "../component/Input";
import Select from "../component/Select";
import ProfileEditForm from "../component/ProfileEditForm";
import AddressEditForm from "../component/AddressEditForm";

function Address() {
  let userData = useSelector(
    (state: RootState) => state.auth.userData
  ) as Iuser | null;
  const [isLoading, setIsLoading] = useState(true);
  const [editToggle, setEditToggle] = useState(false);
  useEffect(() => {
    if (userData !== undefined) {
      setIsLoading(false);
    }
  }, [userData]);
  const dispatch = useDispatch();

  const displayData = (
    <div className="    flex flex-col items-center ">
      <div className=" space-y-4 border-gray-200  border-2 p-9 ">
        <div className=" ">
          <span className="pr-6">Address</span> <span>:</span>{" "}
          <span
            className={
              userData?.state === undefined ? "text-red-500 pl-5" : "pl-5"
            }
          >
            {userData?.address || "Not Added*"}
          </span>
        </div>
        <div className=" ">
          <span className=" pr-11">State</span> <span>:</span>{" "}
          <span
            className={
              userData?.state === undefined ? "text-red-500 pl-5" : "pl-5"
            }
          >
            {userData?.state || "Not Added*"}
          </span>
        </div>

        <div className="">
          <span className="pr-6">Country</span> <span>:</span>{" "}
          <span
            className={
              userData?.country === undefined ? "text-red-500 pl-5" : "pl-5"
            }
          >
            {" "}
            {userData?.country || "Not Added*"}
          </span>
        </div>
        <div className="">
          <span className=" pr-6">pincode</span> <span>:</span>
          <span
            className={
              userData?.pincode === undefined ? "text-red-500 pl-6" : "pl-6"
            }
          >
            {userData?.pincode || "Not Added*"}
          </span>
        </div>

        <Button
          type="submit"
          className="bg-sky-500 w-full py-2  mt-2 rounded-lg text-white"
          onClick={() => setEditToggle(true)}
        >
          Edit
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="flex space-x-2 justify-center pt-6">
        <FaRegAddressBook size={30} />
        <div className="text-2xl  font-bold "> Address</div>
      </div>

      {editToggle === false ? (
        displayData
      ) : (
        <AddressEditForm
          userData={userData as Iuser}
          setEditToggle={setEditToggle}
        />
      )}
    </div>
  );
}

export default Address;
