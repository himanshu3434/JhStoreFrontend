import axios from "axios";
import { Iuser } from "../types/types";

export const createPaymentIntent = async (
  amount: number,
  userData: Iuser | null
) => {
  const createPaymentIntentURL = `${
    import.meta.env.VITE_SERVER_URL
  }/payment/create`;

  const options = {
    method: "POST",
    url: createPaymentIntentURL,

    data: { amount, userData },
  };
  const getPaymentIntentCreateResponse = await axios.request(options);

  return getPaymentIntentCreateResponse;
};
