import { UserButton } from "@clerk/nextjs";
import React from "react";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center p-4 shadow-sm">
      <ul className="flex items-center space-x-4">
        <li className="hover:opacity-85 cursor-pointer">
          <h1 className="font-bold text-xl text-primary">
            Taxi
            <span
              className="
          text-secondary text-xl"
            >
              .
            </span>
            Compass
          </h1>
        </li>
        {/* <span className="items-center space-x-4 hidden md:flex">
          <li className="hover:opacity-85 cursor-pointer">Home</li>
          <li className="hover:opacity-85 cursor-pointer">History</li>
          <li className="hover:opacity-85 cursor-pointer">Help</li>
        </span> */}
      </ul>
      <UserButton />
    </div>
  );
};

export default NavBar;
