import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Iuser } from "../types/types";
import { RootState } from "../store/Store";
import { DiVim } from "react-icons/di";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../component/Button";
import Input from "../component/Input";
import Select from "../component/Select";
import ProfileEditForm from "../component/ProfileEditForm";

function Profile() {
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

  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const date = userData?.dob !== undefined ? new Date(userData?.dob) : null;

  const formattedDate = date !== null ? formatter.format(date) : undefined;

  const displayData = (
    <div className="    flex flex-col items-center ">
      <div className=" space-y-4 border-gray-200  border-2 p-9 ">
        <div className=" ">
          <span className="pr-8">Name</span> <span>:</span>{" "}
          <span className="pl-5">{userData?.fullName}</span>
        </div>
        <div className=" ">
          <span className=" pr-4">Number</span> <span>:</span>{" "}
          <span
            className={
              userData?.mobileNumber === undefined
                ? "text-red-500 pl-5"
                : "pl-5"
            }
          >
            {userData?.mobileNumber || "Not Added*"}
          </span>
        </div>

        <div className="">
          <span className=" pr-11">Dob </span>
          <span>:</span> <span className="pl-5">{formattedDate}</span>
        </div>
        <div className="">
          <span className="pr-9">email</span> <span>:</span>{" "}
          <span className="pl-5"> {userData?.email}</span>
        </div>
        <div className="">
          <span className=" pr-6">gender</span> <span>:</span>
          <span className="pl-5">{userData?.gender}</span>
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
        <FaRegUser size={30} />
        <div className="text-2xl  font-bold "> Profile</div>
      </div>

      {editToggle === false ? (
        displayData
      ) : (
        <ProfileEditForm
          userData={userData as Iuser}
          setEditToggle={setEditToggle}
        />
      )}
    </div>
  );
}

export default Profile;
