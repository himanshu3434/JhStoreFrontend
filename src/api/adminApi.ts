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

  console.log("adminApi", data);
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

export { addCategory, fetchAllCategories, createNewProduct };
