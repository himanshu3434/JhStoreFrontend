import React, { MouseEvent, useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { cudToCart } from "../api/cartApi";
import { RootState } from "../store/Store";
import { ICartItem, Iuser } from "../types/types";
import Button from "./Button";

type cartItemWithDelete = {
  cartItem: ICartItem;
  setDeleteCartItem: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  setSubTotal: React.Dispatch<React.SetStateAction<number>>;
  setQuantityChange: React.Dispatch<React.SetStateAction<boolean>>;
};
function CartItem({
  cartItem,
  setDeleteCartItem,
  setSubTotal,
  setQuantityChange,
}: cartItemWithDelete) {
  const userData = useSelector((state: RootState) => state.auth.userData);

  const [cartItemQuantity, setCarItemQuantity] = useState(cartItem.quantity);
  const cartQuantityHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    //  console.log("in addd ", "  ", id);
    let data = {
      user_id: (userData as Iuser | null)?._id as string,
      product_id: cartItem.productDetails._id,
      quantity: 0,
    };
    if (id === "substract") {
      data.quantity = -1;

      if (cartItemQuantity === 1) {
        const newDeleteItem = [cartItem.productDetails._id, cartItemQuantity];
        setDeleteCartItem(newDeleteItem);
      } else {
        await cudToCart(data);
        setSubTotal((prev) => prev - cartItem.productDetails.price);
        setCarItemQuantity((prev) => prev - 1);
        setQuantityChange((prev) => !prev);
      }
    } else {
      if (cartItemQuantity < Number(cartItem.productDetails.stock)) {
        //  console.log("in addd ", data, "  ");
        data.quantity = 1;
        await cudToCart(data);
        setSubTotal((prev) => prev + cartItem.productDetails.price);
        setCarItemQuantity((prev) => prev + 1);
        setQuantityChange((prev) => !prev);
      }
    }
  };
  return (
    <div>
      <div className="flex relative shadow-md py-4">
        <Button
          className="absolute right-1 top-1"
          onClick={() =>
            setDeleteCartItem([cartItem.productDetails._id, cartItemQuantity])
          }
        >
          <RxCross2 size={25} color="gray" />
        </Button>
        <div>
          <img
            src={cartItem.productDetails.coverPhoto}
            alt=""
            className="w-[10rem] "
          />
        </div>
        <div className="space-y-8">
          <div className="font-semibold  text-xl ">
            {cartItem.productDetails.name}
          </div>
          <div className="text-lg">
            <span className="text-xl">₹</span>
            {cartItem.productDetails.price}
          </div>
        </div>
        <div className=" flex items-center justify-end 0 flex-1">
          <div className=" flex space-x-5 w-[10vw] justify-center items-center  bg-slate-200  rounded-md px-2 py-1 shadow-sm ">
            <Button className="  " id="substract" onClick={cartQuantityHandler}>
              <LuMinus />
            </Button>
            <div className="">{cartItemQuantity}</div>
            <Button className="  " id="add" onClick={cartQuantityHandler}>
              <LuPlus />
            </Button>
          </div>
          <Button />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
