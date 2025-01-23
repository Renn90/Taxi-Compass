import { RideDataContext } from "@/app/context/DataContext";
import cards from "@/app/Data/cards";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

interface Card {
  id: number;
  image: string;
  name: string;
}

const Payment = () => {
  const router = useRouter();
  const rideData = useContext(RideDataContext);

  if (!rideData) {
    return <div>Loading...</div>;
  }

  const {
    setPaymentMethod,
    paymentMethod,
    selectedCar,
    price,
    source,
    destination,
  } = rideData;

  const handleBook = () => {
    if (paymentMethod && selectedCar && price && source && destination) {
      if (paymentMethod.name === "Cash") {
        router.push("/success");
      } else {
        router.push("/payment");
      } // Redirect to payment page
      const orderData = {
        selectedCar,
        price,
        source,
        destination,
        paymentMethod,
      };
      sessionStorage.setItem("orderData", JSON.stringify(orderData));
    } else {
      console.log({ paymentMethod, selectedCar, price, source, destination });
      alert("Please fill in all the required fields.");
    }
  };

  return (
    <div>
      <h1 className="font-bold my-4">Payment Methods</h1>
      <div className="flex flex-wrap justify-between items-center">
        {cards.map((card: Card) => (
          <div
            key={card.id}
            onClick={() => setPaymentMethod(card)}
            className={`border-[1px] min-h-[40px] border-grey px-2 rounded flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 ${
              paymentMethod?.id === card.id && "border-orange-400 !border-[3px]"
            }`}
          >
            <Image src={card.image} alt={card.name} width={40} height={100} />
          </div>
        ))}
      </div>
      <button
        onClick={handleBook}
        className="w-full mt-3 p-2 bg-primary rounded font-semibold"
      >
        Book
      </button>
    </div>
  );
};

export default Payment;
