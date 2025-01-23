import { SignIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <SignIn />
    </div>
  );
};

export default page;
