// globals.d.ts
declare global {
  interface Location {
    from: string;
    to: string;
  }

  interface RideDataContextType {
    selectedCar: string;
    price: string;
    paymentMethod: { id: number; name: string; image: string } | null;
    location: { from: string; to: string };
    setSelectedCar: (selectedCar: string) => void;
    setPrice: (price: string) => void;
    setPaymentMethod: (method: { id: number; name: string; image: string } | null) => void;
    source: string;
    setSource: (source: string) => void;
    setDestination: (destination: string) => void;
    destination: string;
  }
}

export {};