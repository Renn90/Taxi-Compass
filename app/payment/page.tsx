"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { use, useContext, useEffect, useState } from "react";
import CheckoutForm from "../components/Payment/CheckoutForm";
import { RideDataContext } from "../context/DataContext";
import { useRouter } from "next/navigation";

// Define the type for Stripe Elements options
interface StripeElementsOptions {
  mode: "payment" | "subscription" | "setup";
  amount: number;
  currency: string;
}

const Page = () => {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [options, setOptions] = useState<StripeElementsOptions | null>(null);

  const orderData =
    typeof window !== 'undefined' && sessionStorage.getItem("orderData");
  const { selectedCar, price, source, destination, paymentMethod } = orderData
    ? JSON.parse(orderData)
    : {};
  const router = useRouter();

  useEffect(() => {
    if (!selectedCar || !price || !source || !destination) {
      router.push("/");
    }
  }, [selectedCar, price, source, destination]);

  console.log({ selectedCar, price, source, destination });

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
      console.error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not set.");
      return;
    }

    const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    setStripePromise(stripe);

    // Set options for Stripe Elements
    setOptions({
      mode: "payment",
      amount: Number(price) * 100 || 1, // Convert dollars to cents
      currency: "usd",
    });
  }, []);

  if (!stripePromise || !options) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        Loading Stripe...
      </div>
    );
  }

  return (
    <>
      {price && source && destination && selectedCar && (
        <div className="max-w-[550px] h-[90vh] flex justify-center items-center mx-auto w-full">
          {stripePromise && (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
