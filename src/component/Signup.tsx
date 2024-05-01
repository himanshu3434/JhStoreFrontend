import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login as storeLogin } from "../features/authSlice";
import { FieldValues, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import Select from "./Select";
import { loginUser, registerUser } from "../api/userApi";
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const signup = async (data: FieldValues) => {
    setError("");
    try {
      const session = await registerUser(data);
      console.log("session register ", session);
      if (session.data.success) {
        console.log("data signup ", data);
        const userLogin = await loginUser(data);
        console.log("userLogin register ", userLogin);
        if (userLogin.data.success) {
          const userData = userLogin.data.data;
          console.log("userData register ", userData);
          dispatch(storeLogin({ userData }));
        }
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-[350px] h-[450px] rounded-xl p-5 mt-10 mb-10 ml-auto mr-auto bg-gray-500 text-white">
        <div className="text-3xl mb-4 text-center text-bold">
          <h1>Sign up </h1>
        </div>

        <div>
          {error && <div>Error Problem :{error}</div>}
          <form onSubmit={handleSubmit(signup)}>
            <div>
              <Input
                label="Full Name "
                placeholder="Enter your Full Name"
                {...register("fullName", {
                  required: true,
                })}
              />

              <Input
                label="Email "
                type="email"
                placeholder="Enter your Email address"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              ></Input>
              <Input
                label="Password "
                type="password"
                placeholder="Enter your Password "
                {...register("password", {
                  required: true,
                })}
              ></Input>

              <Select
                options={["Male", "Female", "Other"]}
                label="Gender"
                {...register("gender", { required: true })}
                className=""
              />
              <Input
                label="DOB "
                type="date"
                placeholder="enter you Date"
                {...register("dob", {
                  required: true,
                })}
              ></Input>

              <Button type="submit">Create Account</Button>
            </div>
          </form>
        </div>

        <div
          className="flex justify-center  mt-5 
          "
        >
          <p>Already have a Account ? </p>
          <Link to="/login">
            <div className="pl-1 underline text-blue-200">Sign in</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
