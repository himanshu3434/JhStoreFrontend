import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUserApi } from "../api/userApi";
import { logout } from "../features/authSlice";
import { AxiosResponse } from "axios";

const useLogout = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const logoutUser = async () => {
    const logoutResponse = (await logoutUserApi()) as any;

    if (logoutResponse.data.success) {
      disptach(logout());
      navigate("/");
    }
  };

  return logoutUser;
};

export default useLogout;
