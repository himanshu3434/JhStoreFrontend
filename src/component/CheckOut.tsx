import React, {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
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
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { Iuser } from "../types/types";
import { toastError, toastInfo, toastSuccess } from "../utils/toast";
import { RotatingLines } from "react-loader-spinner";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
function CheckOutForm({ allCartItems, discount }: any) {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
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

    if (error) {
      console.log("error  ", error);
      setLoading(false);
    } else {
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

        if (orderCreateResponse.data.success) {
          toastSuccess("Order Placed Successfully");

          navigate("/orders");
        } else {
          toastError("Order Failed");
        }
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
            onClick={() => setLoading(true)}
          >
            {loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <RotatingLines
                  visible={true}
                  width="24"
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                />
              </div>
            ) : (
              "Submit"
            )}
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
  const userData = useSelector(
    (state: RootState) => state.auth.userData
  ) as Iuser | null;
  useEffect(() => {
    createPaymentIntent((subTotal - discount) * 100, userData).then(
      (response) => {
        if (response.data.success) {
          setClientSecret(response.data.data.clientSecret);
        }
      }
    );
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
