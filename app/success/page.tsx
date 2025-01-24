"use client";
import React, { useContext, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DirectionDataContext } from "../context/DirectionDataContext";

const page = () => {
  const directionDataCtx = useContext(DirectionDataContext);
  const directionData = directionDataCtx ? directionDataCtx.directionData : "";

  const orderData =
    typeof window !== "undefined" && sessionStorage.getItem("orderData");
  const { selectedCar, price, source, destination, paymentMethod } = orderData
    ? JSON.parse(orderData)
    : {};

  const invalidData = !selectedCar || !price || !source || !destination;

  useEffect(() => {
    if (invalidData) {
      router.push("/");
    }
  }, [selectedCar, price, source, destination]);

  const router = useRouter();

  const returnHome = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("orderData");
    }
    router.push("/");
  };

  return (
    <>
      {!invalidData && (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
          <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
            <h1 className="text-2xl font-bold text-primary mb-4">
              {`${
                paymentMethod?.name === "Cash" ? "Booking" : "Payment"
              } Successful!`}
            </h1>
            <p className="text-gray-700 mb-6">
              Thank you for choosing our cab service. Your ride has been
              confirmed.
            </p>

            {/* Ride Details */}
            <div className="bg-gray-50 p-4 rounded-lg text-left">
              <h2 className="text-xl font-semibold mb-2">Ride Details</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Ride From:</span>{" "}
                  {source || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Ride To:</span>{" "}
                  {destination || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Selected Ride:</span>{" "}
                  {selectedCar || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Cost:</span> ${price || "N/A"}
                </p>
                {paymentMethod?.name === "Cash" && (
                  <p className="text-red-500 italic font-medium">
                    Your Payment Method Is Cash, Please Ensure to Pay the exact
                    amount to the driver
                  </p>
                )}
                {/* {directionData && (
              <p>
                <span className="font-medium">Estimated Arrival:</span>{" "}
                {`${(directionData.routes[0].duration / 60).toFixed(2)} Min` ||
                  "N/A"}
              </p>
            )} */}
              </div>
            </div>
            <div
              onClick={returnHome}
              className="mt-6 w-full bg-primary text-white cursor-pointer py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors"
            >
              Return to Home
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
