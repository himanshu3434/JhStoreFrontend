import React, { lazy, useEffect, useState } from "react";
import { getAllCartItems } from "../api/cartApi";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { ICartItem, Iuser } from "../types/types";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";
const CartItem = lazy(() => import("../component/CartItem"));
function Cart() {
  const [allCartItems, setAllCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.userData);
  useEffect(() => {
    getAllCartItems((userData as Iuser | null)?._id || "").then((response) => {
      if (response.data.success) {
        const cartItemsArray = response.data.data.cartDetails;
        const total = response.data.data.subTotal;
        setSubTotal(total);
        setAllCartItems(cartItemsArray);
      }
    });
  }, []);
  return (
    <div className="flex  space-x-80">
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
      <div>
        <div>Subtotal</div>
        <div>₹ {subTotal}</div>
        <Button
          type="button"
          onClick={() =>
            navigate("/pay", { state: { allCartItems, subTotal } })
          }
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart;
