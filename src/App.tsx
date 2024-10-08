import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./component/header"));
const Cart = lazy(() => import("./pages/Cart"));
const Products = lazy(() => import("./pages/Products"));

const Inventory = lazy(() => import("./pages/admin/Inventory"));
const Login = lazy(() => import("./component/Login"));
const Signup = lazy(() => import("./component/Signup"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const CheckOut = lazy(() => import("./component/CheckOut"));
const Profile = lazy(() => import("./pages/Profile"));
const Order = lazy(() => import("./pages/Order"));
const Address = lazy(() => import("./pages/Address"));
const AllOrders = lazy(() => import("./pages/admin/AllOrders"));

const UpdateProduct = lazy(() => import("./pages/admin/UpdateProduct"));
const User = lazy(() => import("./pages/admin/User"));

import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./api/userApi";
import AuthLayout from "./component/AuthLayout";
import { login, logout } from "./features/authSlice";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GenericLoader from "./component/SkeletonLoading/GenericLoader";
import HomeSkeleton from "./component/SkeletonLoading/HomeSkeleton";
import ProductsSkeleton from "./component/SkeletonLoading/ProductsSkeleton";
import { RootState } from "./store/Store";
import { Iuser } from "./types/types";
import axios from "axios";
import CategoryForm from "./component/admin/CategoryForm";
import ProductForm from "./component/admin/ProductForm";
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
    axios.defaults.withCredentials = true;
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
  return (
    <div className="">
      <Header />
      {loading ? (
        <HomeSkeleton />
      ) : (
        <div>
          <div>
            <Suspense fallback={<HomeSkeleton />}>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </Suspense>
            <Suspense fallback={<GenericLoader />}>
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
                <Route path="/test" element={<HomeSkeleton />} />
              </Routes>
            </Suspense>
          </div>

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

          <div className="px-2 md:px-5">
            <Suspense fallback={<GenericLoader />}>
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

                <Route
                  path="/admin/inventory/create/category"
                  element={
                    <AuthLayout
                      authentication
                      userStatus={userStatus}
                      isAdmin={userData?.role === "admin" ? true : false}
                      adminOnly={true}
                    >
                      <CategoryForm />
                    </AuthLayout>
                  }
                />
                <Route
                  path="/admin/inventory/create/product"
                  element={
                    <AuthLayout
                      authentication
                      userStatus={userStatus}
                      isAdmin={userData?.role === "admin" ? true : false}
                      adminOnly={true}
                    >
                      <ProductForm />
                    </AuthLayout>
                  }
                />
                <Route path="/testing" element={<ProductsSkeleton />}>
                  {" "}
                </Route>
              </Routes>
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
