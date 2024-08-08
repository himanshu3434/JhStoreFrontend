import { FieldValues } from "react-hook-form";
import axios from "axios";

const addCategory = async (data: FieldValues) => {
  const categoryUrl = `${import.meta.env.VITE_SERVER_URL}/category/new`;
  const options = {
    method: "POST",
    url: categoryUrl,

    data: {
      ...data,
    },
  };
  const categoryAddResponse = await axios.request(options);

  return categoryAddResponse;
};
const fetchAllCategories = async () => {
  const categoryUrl = `${import.meta.env.VITE_SERVER_URL}/category/get`;
  const options = {
    method: "GET",
    url: categoryUrl,
  };
  const allCategories = await axios.request(options);

  return allCategories;
};

const createNewProduct = async (data: FieldValues) => {
  const createProductUrl = `${import.meta.env.VITE_SERVER_URL}/product/create`;

  const options = {
    method: "POST",
    url: createProductUrl,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  };
  const createProductResponse = await axios.request(options);

  return createProductResponse;
};

const UpdateProductDetails = async (data: FieldValues, _id: string) => {
  const updateProductDetailsUrl = `${
    import.meta.env.VITE_SERVER_URL
  }/product/update/${_id}`;

  const options = {
    method: "POST",
    url: updateProductDetailsUrl,

    data: { ...data },
  };
  const updateProductDetailResponse = await axios.request(options);

  return updateProductDetailResponse;
};

const updateProductPhotos = async (
  data: FieldValues,
  photoName: string,
  productId: string
) => {
  const updateProductPhotoUrl = `${
    import.meta.env.VITE_SERVER_URL
  }/product/update/photo/${photoName}/`;

  const formData = new FormData();
  formData.append("photo1", data.photo1[0]);
  formData.append("productId", productId);

  const options = {
    method: "POST",
    url: updateProductPhotoUrl,

    data: formData,
  };
  const updateProductPhotoResponse = await axios.request(options);

  return updateProductPhotoResponse;
};

export {
  addCategory,
  fetchAllCategories,
  createNewProduct,
  UpdateProductDetails,
  updateProductPhotos,
};
