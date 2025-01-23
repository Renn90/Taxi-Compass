import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPaymentElementReady, setIsPaymentElementReady] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe is not loaded yet. Please try again.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    elements.submit();
    try {
      // Create Payment Intent
      const response = await fetch("/api/payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ amount: 58 }), // Amount in dollars
      });
      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret } = await response.json();

      // Confirm Payment
      const { error } = await stripe.confirmPayment({
        clientSecret,
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`, // Dynamic return URL
        },
      });

      if (error) {
        setErrorMessage(error.message || "Payment failed. Please try again.");
      }
    } catch (err: any) {
      setErrorMessage(
        err.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full overflow-x-hidden overflow-y-scroll my-auto"
    >
      {errorMessage && (
        <p className="text-red-500 mt-2 text-center">{errorMessage}</p>
      )}
      <PaymentElement
        onReady={() => {
          setIsPaymentElementReady(true);
        }}
      />
      <button
        type="submit"
        className="bg-primary w-full p-2 mt-4 rounded"
        disabled={!stripe || !elements || isLoading || !isPaymentElementReady}
      >
        {isLoading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;
