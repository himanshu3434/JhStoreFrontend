import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProductUsingId } from "../api/productsApi";
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

  const getProductDetails = async () => {
    const productFetchResponse = await fetchSingleProductUsingId(id as string);
    if (productFetchResponse.data.success) {
      setProductDetails(productFetchResponse.data.data);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);
  return <div>your product name is {productDetails.name}</div>;
}

export default ProductDetails;
