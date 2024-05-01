import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login as storeLogin } from "../features/authSlice";
import { FieldValues, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { loginUser } from "../api/userApi";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const login = async (data: FieldValues) => {
    setError("");

    try {
      const session = await loginUser(data);

      if (session) {
        console.log("session", session);
        console.log("data", session.data.data.user);
        const userData = session.data.data.user;
        dispatch(storeLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className=" w-[350px] h-[400px] rounded-xl p-5 mt-10 mb-10 ml-auto mr-auto bg-gray-500 text-white">
        <div className="text-3xl mb-4 text-center text-bold ">
          <h1 className="">Sign in</h1>
        </div>
        <div>
          <div>
            {error && <div>Error Problem :{error}</div>}
            <form onSubmit={handleSubmit(login)}>
              <div>
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
                  placeholder="Enter your Password address"
                  {...register("password", {
                    required: true,
                  })}
                ></Input>

                <Button type="submit">Log In</Button>
              </div>
            </form>
          </div>

          <div
            className="flex justify-center  mt-5 pt-5
          "
          >
            <p>Don't have a Account ? </p>
            <Link to="/signup">
              <div className="pl-1 underline text-blue-200">Sign Up</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
