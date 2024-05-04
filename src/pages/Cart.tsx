import React, { lazy, useEffect, useState } from "react";
import { getAllCartItems } from "../api/cartApi";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { ICartItem, Iuser } from "../types/types";
const CartItem = lazy(() => import("../component/CartItem"));
function Cart() {
  const [allCartItems, setAllCartItems] = useState([]);
  const userData = useSelector((state: RootState) => state.auth.userData);
  useEffect(() => {
    getAllCartItems((userData as Iuser | null)?._id || "").then((response) => {
      if (response.data.success) {
        const cartItemsArray = response.data.data.cartDetails;

        setAllCartItems(cartItemsArray);
      }
    });
  }, []);
  return (
    <div>
      <div>
        {allCartItems.length > 0
          ? allCartItems.map((cartItem: ICartItem) => (
              <CartItem
                key={cartItem._id}
                coverPhoto={cartItem.productDetails.coverPhoto}
                name={cartItem.productDetails.name}
                price={cartItem.productDetails.price}
                quantity={cartItem.quantity}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default Cart;
