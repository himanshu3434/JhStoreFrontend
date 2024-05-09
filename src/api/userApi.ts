import axios from "axios";
import { FieldValues } from "react-hook-form";
axios.defaults.withCredentials = true;
const loginUser = async (data: FieldValues) => {
  const loginUrl = `${import.meta.env.VITE_SERVER_URL}/user/login`;
  const createOptions = {
    method: "POST",
    url: loginUrl,

    data: {
      ...data,
    },
  };

  const session = await axios.request(createOptions);

  return session;
};

const registerUser = async (data: FieldValues) => {
  const loginUrl = `${import.meta.env.VITE_SERVER_URL}/user/registerUser`;
  const createOptions = {
    method: "POST",
    url: loginUrl,

    data: {
      ...data,
    },
  };

  const session = await axios.request(createOptions);

  return session;
};

const getCurrentUser = async () => {
  const getCurrentUserUrl = `${
    import.meta.env.VITE_SERVER_URL
  }/user/getCurrentUser`;
  const options = {
    method: "GET",
    url: getCurrentUserUrl,
  };

  const session = await axios.request(options);

  return session;
};

const logoutUserApi = async () => {
  const logoutUserUrl = `${import.meta.env.VITE_SERVER_URL}/user/logout`;
  const options = {
    method: "POST",
    url: logoutUserUrl,
  };

  const logoutUserResponse = await axios.request(options);

  return logoutUserResponse;
};

export { loginUser, registerUser, getCurrentUser, logoutUserApi };
