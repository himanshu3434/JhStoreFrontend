import { Suspense, lazy, useState } from "react";
import { Route, Routes } from "react-router-dom";
const Admin = lazy(() => import("./pages/admin/admin"));
const Header = lazy(() => import("./component/header"));
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Products = lazy(() => import("./pages/Products"));
const WishList = lazy(() => import("./pages/WishList"));
import Loading from "./component/Loading";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
      <Header />
      <div className="px-2 md:px-10">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="/wishList" element={<WishList />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
