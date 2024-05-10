import React, { lazy, useEffect, useState } from "react";
import { cudToCart, getAllCartItems } from "../api/cartApi";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { ICartItem, Iuser } from "../types/types";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
const CartItem = lazy(() => import("../component/CartItem"));
function Cart() {
  const [allCartItems, setAllCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const navigate = useNavigate();
  const [deleteCartItem, setDeleteCartItem] = useState(["", 0]);
  const userData = useSelector((state: RootState) => state.auth.userData);
  const deleteIfRequiredAndGetAllCartItemsHandler = async () => {
    if (deleteCartItem[0] !== "") {
      const data = {
        user_id: (userData as Iuser | null)?._id as string,
        product_id: deleteCartItem[0] as string,
        quantity: -deleteCartItem[1],
      };
      await cudToCart(data);
    }

    const response = await getAllCartItems(
      (userData as Iuser | null)?._id || ""
    );
    if (response.data.success) {
      console.log("cart item data ", response.data.data);
      const cartItemsArray = response.data.data.cartDetails;
      const total = response.data.data.subTotal;
      setSubTotal(total);
      setAllCartItems(cartItemsArray);
    }
  };
  useEffect(() => {
    deleteIfRequiredAndGetAllCartItemsHandler();
  }, [deleteCartItem]);
  return (
    <div>
      <div className=" font-bold  text-4xl mt-5 flex items-center justify-center">
        <div className="mr-2">Cart</div>
        <FiShoppingCart className="" />
      </div>
      <div className="flex  mt-4">
        <div className="flex-1">
          {allCartItems.length > 0
            ? allCartItems.map((cartItem: ICartItem) => (
                <CartItem
                  key={cartItem._id}
                  cartItem={cartItem}
                  setDeleteCartItem={setDeleteCartItem}
                />
              ))
            : null}
        </div>
        <div className="w-[10rem] text-center">
          <div className="font-semibold text-xl mb-4">Subtotal</div>
          <div>₹ {subTotal}</div>
          <Button
            type="button"
            className="bg-sky-500 text-white py-2 px-4 rounded-lg mt-4"
            onClick={() =>
              navigate("/pay", { state: { allCartItems, subTotal } })
            }
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
