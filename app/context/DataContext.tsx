import React, { createContext, useState, ReactNode } from "react";

const RideDataContext = createContext<RideDataContextType>({
  selectedCar: "",
  price: "",
  paymentMethod: null,
  location: { from: "", to: "" },
  setSelectedCar: () => {},
  setPrice: () => {},
  setPaymentMethod: () => {},
  source: "",
  setSource: () => {},
  setDestination: () => {},
  destination: "",
});

interface DataContextProps {
  children: ReactNode;
}

const DataContext = ({ children }: DataContextProps) => {
  const [selectedCar, setSelectedCar] = useState("");
  const [price, setPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<{ id: number; name: string; image: string } | null>(null);
  const [location, setLocation] = useState({ from: "", to: "" });
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  
  return (
    <RideDataContext.Provider
      value={{
        selectedCar,
        price,
        paymentMethod,
        location,
        setSelectedCar,
        setPrice,
        setPaymentMethod,
        source,
        setSource,
        setDestination,
        destination,
      }}
    >
      {children}
    </RideDataContext.Provider>
  );
};

export { RideDataContext, DataContext };