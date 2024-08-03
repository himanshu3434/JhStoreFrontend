import React, {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { createPaymentIntent } from "../api/paymentApi";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Button from "./Button";
import { orderCreate } from "../api/orderApi";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
function CheckOutForm({ allCartItems, discount }: any) {
  const stripe = useStripe();
  const elements = useElements();
  console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    console.log("elements  ", elements);
    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: "if_required",
    });

    if (error) console.log("error  ", error);
    else {
      console.log("payment intent   ", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        let subTotal = paymentIntent.amount / 100;
        let transaction_id = paymentIntent.payment_method;

        const orderCreateResponse = await orderCreate(
          allCartItems,
          discount,
          subTotal,
          transaction_id
        );

        console.log("order created success ", orderCreateResponse);
      }
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <Button
            type="submit"
            className="hover:bg-blue-300 w-full bg-blue-400 text-white font-semibold my-2 h-[7vh] rounded-lg"
          >
            Submit{" "}
          </Button>
        </form>
      </div>
    </>
  );
}

function CheckOut() {
  const location = useLocation();
  const { allCartItems, subTotal, discount } = location.state;
  const [clientSecret, setClientSecret] = useState(undefined);

  useEffect(() => {
    createPaymentIntent((subTotal - discount) * 100).then((response) => {
      if (response.data.success) {
        setClientSecret(response.data.data.clientSecret);
      }
    });
  }, []);

  return clientSecret === undefined ? null : (
    <div className="w-[40vw] h-[60vh] mx-auto ">
      <h1 className="font-semibold text-3xl mb-10 mt-3 uppercase text-center  ">
        Payment Gateway
      </h1>
      <div className="shadow-md p-3 rounded-lg">
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckOutForm allCartItems={allCartItems} discount={discount} />
        </Elements>
      </div>
    </div>
  );
}

export default CheckOut;
