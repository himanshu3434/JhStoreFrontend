import React from "react";
import { NavLink } from "react-router-dom";
import { productProps } from "../../types/types";

function Product({ productDetails }: productProps) {
  console.log(productDetails);
  return (
    <div>
      <div className="bg-gray-300 text-center w-[20vw]">
        <NavLink to={`/product/${productDetails._id}`} className="">
          <img src={productDetails.coverPhoto} alt="" />
          <div>{productDetails.name}</div>

          <div>₹{productDetails.price}</div>
        </NavLink>
      </div>
    </div>
  );
}

export default Product;
