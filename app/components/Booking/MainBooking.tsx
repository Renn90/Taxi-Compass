"use client";
import React, { useState } from "react";
import Booking from "./Booking";
import Cars from "./Cars";
import Payment from "./Payment";

export const MainBooking = () => {
  const height =  typeof window !== "undefined" ? window.innerHeight * 0.87 : '100vh';

  return (
    <div
      className="p-4 mt-4 border-[1px] border-grey rounded m-2"
      style={{ height: height }}
    >
      <Booking />
      <Cars />
      <Payment />
    </div>
  );
};
