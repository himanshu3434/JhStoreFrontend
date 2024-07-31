import axios from "axios";
import { ICartItem } from "../types/types";
import { PaymentMethod } from "@stripe/stripe-js";

export const orderCreate = async (
  allCartItems: ICartItem[],
  discount: number,
  subTotal: number,
  transaction_id: string | null | PaymentMethod,
  paymentMode = "Card"
) => {
  const orderCreateUrl = `${import.meta.env.VITE_SERVER_URL}/order/create`;

  const options = {
    method: "POST",
    url: orderCreateUrl,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      allCartItems,
      discount,
      subTotal,
      transaction_id,
      paymentMode,
    },
  };
  const getOrderCreateResponse = await axios.request(options);

  return getOrderCreateResponse;
};

export const getAllUserOrders = async () => {
  const getAllUserOrdersUrl = `${
    import.meta.env.VITE_SERVER_URL
  }/order/allOrder`;

  const options = {
    method: "GET",
    url: getAllUserOrdersUrl,
  };
  const getAllUserOrdersResponse = await axios.request(options);

  return getAllUserOrdersResponse;
};

export const fetchAllOrders = async (page: number) => {
  const fetchAllOrdersUrl = `${
    import.meta.env.VITE_SERVER_URL
  }/order/allOrderAdmin/${page}`;

  const options = {
    method: "GET",
    url: fetchAllOrdersUrl,
  };
  const getAllOrdersResponse = await axios.request(options);

  return getAllOrdersResponse;
};
