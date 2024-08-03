import React, { useEffect, useState, ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { useNavigate } from "react-router-dom";
import { Iuser } from "../types/types";
type authType = {
  children?: ReactElement;
  userStatus: boolean;
  authentication: boolean;
  isAdmin: boolean;
  adminOnly: boolean;
};
function AuthLayout({
  children,
  authentication = true,
  userStatus = false,
  isAdmin = false,
  adminOnly = false,
}: authType) {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && userStatus !== authentication) navigate("/login");
    else if (authentication === false && userStatus !== authentication)
      navigate("/");

    if (adminOnly == true && isAdmin === false) navigate("/");
    setLoading(false);
  }, []);

  return loading ? <div>Loading </div> : <div> {children}</div>;
}

export default AuthLayout;
