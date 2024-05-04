import React, { useEffect, useState, MouseEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleProductUsingId } from "../api/productsApi";
import Button from "../component/Button";
import Input from "../component/Input";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { cudToCart } from "../api/cartApi";
import { Iuser } from "../types/types";

const initialState = {
  _id: "",
  name: "",
  description: "",
  stock: "",
  price: "",
  categoryName: "",
  coverPhoto: "",
  photo1: "",
  photo2: "",
  photo3: "",
  createdAt: "",
  updatedAt: "",
};
function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(initialState);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const getProductDetails = async () => {
    const productFetchResponse = await fetchSingleProductUsingId(id as string);
    if (productFetchResponse.data.success) {
      setProductDetails(productFetchResponse.data.data);
    }
  };
  const addToCartHandler = async () => {
    console.log("userData in cart ", userData);
    const data = {
      user_id: (userData as Iuser | null)?._id || "",
      product_id: productDetails._id,
      quantity: quantity,
    };
    const addToCartResponse = await cudToCart(data);

    if (addToCartResponse.data.success) {
      navigate("/products");
    }
  };
  const quantityHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    if (id === "substract") {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    } else {
      if (quantity < Number(productDetails.stock) - 1) {
        setQuantity((prev) => prev + 1);
      }
    }
  };
  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <div>
      <div className="text-center text-3xl">Product Detail</div>
      <div className="flex mt-5">
        <div className="w-[30vw]">
          <img src={productDetails.coverPhoto} alt="" />
        </div>

        <div className="space-y-4">
          <div>{productDetails.name}</div>

          <div>{productDetails.description}</div>

          <div>₹{productDetails.price}</div>
          <div>
            <div className=" font-bold">Quantity : </div>
            <div className="">
              <Button
                className=" w-10 "
                id="substract"
                onClick={quantityHandler}
              >
                -
              </Button>
              <div className="ml-4">{quantity}</div>
              <Button className=" w-10 " id="add" onClick={quantityHandler}>
                +
              </Button>
            </div>
          </div>
          <Button onClick={addToCartHandler}>Add To Cart</Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
