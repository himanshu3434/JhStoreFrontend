import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Iuser, productProps } from "../../types/types";
import Button from "../Button";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { cudToCart } from "../../api/cartApi";

function Product({ productDetails }: productProps) {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const navigate = useNavigate();
  const addToCartProductHandler = async () => {
    const data = {
      user_id: (userData as Iuser | null)?._id || "",
      product_id: productDetails._id,
      quantity: 1,
    };
    const addToCartResponse = await cudToCart(data);

    if (addToCartResponse.data.success) {
      navigate("/products");
    }
  };

  return (
    <div>
      <div className="">
        <div className="  w-[22vw] shadow-lg rounded-lg ">
          <NavLink to={`/product/${productDetails._id}`} className="">
            <div className="space-y-2 px-2">
              <div className="">
                <img src={productDetails.coverPhoto} alt="" />
              </div>
              <div className="  overflow-ellipsis overflow-hidden h-5 whitespace-nowrap">
                {productDetails.name}
              </div>

              <div className="flex gap-2 items-center">
                <div>
                  <span className="text-lg ">₹</span>
                  {productDetails.price}
                </div>
                <div className="text-xs line-through opacity-50 text-gray-500">
                  ₹{productDetails.price + productDetails.price / 2}
                </div>
                <div className=" text-xs   bg-teal-300 text-white px-2 py-1 rounded-lg">
                  Save 50%
                </div>
              </div>
            </div>
          </NavLink>
          <Button
            className=" hover:bg-yellow-300 w-full bg-yellow-400 text-black font-semibold mt-2 h-[7vh]"
            onClick={addToCartProductHandler}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Product;
