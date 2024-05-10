import axios from "axios";

interface ICartItem {
  user_id: string;
  product_id: string;
  quantity: number;
}

export const cudToCart = async (data: ICartItem) => {
  const cudCartUrl = `${import.meta.env.VITE_SERVER_URL}/cart/add`;

  const options = {
    method: "POST",
    url: cudCartUrl,

    data: data,
  };
  const cudCartResponse = await axios.request(options);

  return cudCartResponse;
};

export const getAllCartItems = async (user_id: string) => {
  const getAllCartItemsUrl = `${
    import.meta.env.VITE_SERVER_URL
  }/cart/get/${user_id}`;

  const options = {
    method: "GET",
    url: getAllCartItemsUrl,
  };
  const getCartResponse = await axios.request(options);

  return getCartResponse;
};

export const getCartItemQuantity = async (
  user_id: string,
  product_id: string
) => {
  console.log("api in the product  ", product_id);
  const getCartItemQuantityUrl = `${
    import.meta.env.VITE_SERVER_URL
  }/cart/get/item/${user_id}/${product_id}`;

  const options = {
    method: "GET",
    url: getCartItemQuantityUrl,
  };
  const getCartQuantityResponse = await axios.request(options);

  return getCartQuantityResponse;
};
