import { RideDataContext } from "@/app/context/DataContext";
import { DirectionDataContext } from "@/app/context/DirectionDataContext";
import carsData from "@/app/Data/carsData";
import Image from "next/image";
import React, { useContext } from "react";

const Cars = () => {
  interface Car {
    id: number;
    name: string;
    image: string;
    charges: number;
  }

  const { directionData, setDirectionData } = useContext(DirectionDataContext);

  const rideData = useContext(RideDataContext);
  const { selectedCar, setSelectedCar, setPrice } = rideData;

  const getCost = (charges: any) => {
    return (
      charges *
      directionData.routes[0].distance *
      0.000621371192
    ).toFixed(2);
  };

  const handleSelectCar = (car: Car) => {
    setSelectedCar(car.name);
    setPrice(getCost(car.charges));
  };

  return (
    <div className="mb-4">
      <h1 className="font-bold mb-4">Select Car</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {carsData.map((car) => (
          <div
            key={car.id}
            onClick={() => handleSelectCar(car)}
            className={`border-[1px] border-grey p-2 rounded flex flex-col cursor-pointer hover:border-orange-400 ${
              selectedCar === car.name && "border-orange-400 !border-[3px]"
            }`}
          >
            <div className="min-h-[32px]">
              <Image src={car.image} alt={car.name} width={80} height={100} />
            </div>
            <div className="flex flex-col text-[grey] items-start font-medium mt-2">
              <h3>{car.name}</h3>
              <p>
                {directionData.routes ? (
                  <span
                    className="float-right font-medium
                     text-black"
                  >
                    $ {getCost(car.charges)}
                  </span>
                ) : null}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
