import axios from "axios";

export const createPaymentIntent = async (amount: number) => {
  const createPaymentIntentURL = `${
    import.meta.env.VITE_SERVER_URL
  }/payment/create`;

  const options = {
    method: "POST",
    url: createPaymentIntentURL,

    data: { amount },
  };
  const getPaymentIntentCreateResponse = await axios.request(options);

  return getPaymentIntentCreateResponse;
};
