import React from "react";

function CartItem({ coverPhoto = "", name = "", price = 0, quantity = 0 }) {
  return (
    <div>
      <div className="flex h-[20vh] ">
        <div>
          <img src={coverPhoto} alt="" className="w-[10vw] " />
        </div>
        <div>
          <div>{name}</div>
          <div>{price}</div>
          <div>{quantity}</div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
