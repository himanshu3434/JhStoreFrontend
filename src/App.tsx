import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
const Admin = lazy(() => import("./pages/admin/admin"));
const Header = lazy(() => import("./component/header"));
const Home = lazy(() => import("./pages/Home"));
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
const User = lazy(() => import("./pages/admin/User"));

import Loading from "./component/Loading";
import { getCurrentUser } from "./api/userApi";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/authSlice";
function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user.data.success) {
        const userData = user.data.data.user;
        dispatch(login({ userData }));
      } else dispatch(logout());
    });
  }, []);
  return (
    <div className="">
      <Header />
      <div className="px-2 md:px-10">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/address" element={<Address />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/pay" element={<CheckOut />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/wishList" element={<WishList />} />
          </Routes>
          <Routes>
            <Route path="/admin/inventory" element={<Inventory />} />
            <Route path="/admin/orders" element={<AllOrders />} />

            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<User />} />
          </Routes>
        </Suspense>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
