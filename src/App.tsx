import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./component/header"));
const Cart = lazy(() => import("./pages/Cart"));
const Products = lazy(() => import("./pages/Products"));
const WishList = lazy(() => import("./pages/WishList"));
const Inventory = lazy(() => import("./pages/admin/Inventory"));
const Login = lazy(() => import("./component/Login"));
const Signup = lazy(() => import("./component/Signup"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const CheckOut = lazy(() => import("./component/CheckOut"));
const Profile = lazy(() => import("./pages/Profile"));
const Order = lazy(() => import("./pages/Order"));
const Address = lazy(() => import("./pages/Address"));
const AllOrders = lazy(() => import("./pages/admin/AllOrders"));

const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const UpdateProduct = lazy(() => import("./pages/admin/UpdateProduct"));
const User = lazy(() => import("./pages/admin/User"));

import Loading from "./component/Loading";
import { getCurrentUser } from "./api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./features/authSlice";
import AuthLayout from "./component/AuthLayout";

import { Iuser } from "./types/types";
import { RootState } from "./store/Store";
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const userStatus = useSelector((state: RootState) => state.auth.status) as
    | boolean
    | false;
  const userData = useSelector(
    (state: RootState) => state.auth.userData
  ) as Iuser | null;

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (user.data.success) {
          const userData = user.data.data.user;

          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return loading ? (
    <div>Loading .....</div>
  ) : (
    <div className="">
      <Header />
      <div>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </div>

      <div className="px-2 md:px-5">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/login"
              element={
                <AuthLayout
                  authentication={false}
                  userStatus={userStatus}
                  isAdmin={userData?.role === "admin" ? true : false}
                  adminOnly={false}
                >
                  <Login />
                </AuthLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthLayout
                  authentication={false}
                  userStatus={userStatus}
                  isAdmin={userData?.role === "admin" ? true : false}
                  adminOnly={false}
                >
                  <Signup />
                </AuthLayout>
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/profile"
              element={
                <AuthLayout
                  authentication
                  userStatus={userStatus}
                  isAdmin={userData?.role === "admin" ? true : false}
                  adminOnly={false}
                >
                  <Profile />
                </AuthLayout>
              }
            />
            <Route
              path="/orders"
              element={
                <AuthLayout
                  authentication
                  userStatus={userStatus}
                  isAdmin={userData?.role === "admin" ? true : false}
                  adminOnly={false}
                >
                  <Order />
                </AuthLayout>
              }
            />
            <Route
              path="/address"
              element={
                <AuthLayout
                  authentication
                  userStatus={userStatus}
                  isAdmin={userData?.role === "admin" ? true : false}
                  adminOnly={false}
                >
                  <Address />
                </AuthLayout>
              }
            />

            <Route
              path="/cart"
              element={
                <AuthLayout
                  authentication
                  userStatus={userStatus}
                  isAdmin={userData?.role === "admin" ? true : false}
                  adminOnly={false}
                >
                  <Cart />
                </AuthLayout>
              }
            />
            <Route
              path="/pay"
              element={
                <AuthLayout
                  authentication
                  userStatus={userStatus}
                  isAdmin={userData?.role === "admin" ? true : false}
                  adminOnly={false}
                >
                  <CheckOut />
                </AuthLayout>
              }
            />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            {/* <Route path="/wishList" element={<WishList />} /> */}
          </Routes>
          <Routes>
            <Route
              path="/admin"
              element={
                <AuthLayout
                  authentication
                  userStatus={userStatus}
                  isAdmin={userData?.role === "admin" ? true : false}
                  adminOnly={true}
                >
                  <User />
                </AuthLayout>
              }
            />
            <Route
              path="/admin/inventory"
              element={
                <AuthLayout
                  authentication
                  userStatus={userStatus}
                  isAdmin={userData?.role === "admin" ? true : false}
                  adminOnly={true}
                >
                  <Inventory />
                </AuthLayout>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AuthLayout
                  authentication
                  userStatus={userStatus}
                  isAdmin={userData?.role === "admin" ? true : false}
                  adminOnly={true}
                >
                  <AllOrders />
                </AuthLayout>
              }
            />

            {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}
            <Route
              path="/admin/users"
              element={
                <AuthLayout
                  authentication
                  userStatus={userStatus}
                  isAdmin={userData?.role === "admin" ? true : false}
                  adminOnly={true}
                >
                  <User />
                </AuthLayout>
              }
            />
            <Route
              path="/admin/updateProduct"
              element={
                <AuthLayout
                  authentication
                  userStatus={userStatus}
                  isAdmin={userData?.role === "admin" ? true : false}
                  adminOnly={true}
                >
                  <UpdateProduct />
                </AuthLayout>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
