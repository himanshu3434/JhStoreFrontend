import React, { ChangeEvent, lazy, useEffect, useState } from "react";
import { cudToCart, getAllCartItems } from "../api/cartApi";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { ICartItem, Iuser } from "../types/types";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import Input from "../component/Input";
import { checkCoupon } from "../api/couponApi";
const CartItem = lazy(() => import("../component/CartItem"));
function Cart() {
  const [allCartItems, setAllCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const navigate = useNavigate();
  const [deleteCartItem, setDeleteCartItem] = useState(["", 0]);
  const [coupon, setCoupon] = useState("");
  const [validCouponId, setValidCouponId] = useState("");
  const [discount, setDiscount] = useState(0);

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
  useEffect(() => {
    const checkCouponTimeout = setTimeout(async () => {
      if (coupon !== "") {
        const couponCheckResponse = await checkCoupon(coupon);
        if (
          couponCheckResponse.data.success &&
          couponCheckResponse.data.data.valid
        ) {
          setValidCouponId(couponCheckResponse.data.data.dbCoupon._id);
          setDiscount(couponCheckResponse.data.data.dbCoupon.amount);
        } else {
          console.log("invalid coupon");
          setValidCouponId("");
          setDiscount(0);
        }
      } else {
        setValidCouponId("");
        setDiscount(0);
      }
    }, 500);

    return () => {
      clearTimeout(checkCouponTimeout);
    };
  }, [coupon]);

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
                  setSubTotal={setSubTotal}
                />
              ))
            : null}
        </div>
        <div className="w-[10rem] text-center">
          <div className="font-semibold text-xl mb-4">Bill Details</div>
          <div>
            <span>Subtotal: </span>₹ {subTotal}
          </div>
          <div>
            <span>Shipping: </span>Free
          </div>
          <div>
            <span>Discount</span>: ₹ {discount > 0 ? -discount : discount}
          </div>

          <div>
            <span>Total: </span>₹ {subTotal - discount}
          </div>

          {subTotal > 0 && (
            <div>
              <div>
                <Input
                  label="Add Coupon :"
                  type="text"
                  className={
                    validCouponId === ""
                      ? "bg-white text-black   "
                      : "bg-green-200 text-black "
                  }
                  placeholder="Enter Coupon Code"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCoupon(e.target.value)
                  }
                />
              </div>
              <Button
                type="button"
                className="bg-sky-500 text-white py-2 px-4 rounded-lg mt-4"
                onClick={() =>
                  navigate("/pay", {
                    state: { allCartItems, subTotal, discount },
                  })
                }
              >
                Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
