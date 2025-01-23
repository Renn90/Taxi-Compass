"use client";
import { useEffect, useState, useContext, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { SourceCordiContext } from "@/app/context/SourceCordiContext";
import { DestinationCordiContext } from "@/app/context/DestinationCordiContext";
import { RideDataContext } from "@/app/context/DataContext";

const MAPBOX_RETRIEVE_URL = "https://api.mapbox.com/search/searchbox/v1/retrieve/";

interface AddressSuggestion {
  mapbox_id: string;
  full_address?: string;
  place_formatted?: string;
  context?: {
    street?: { name: string };
    postcode?: { name: string };
    place?: { name: string };
    region?: { name: string };
    country?: { name: string };
  };
}

interface Coordinates {
  lng: number;
  lat: number;
}

interface AddressList {
  suggestions: AddressSuggestion[];
}

const Booking: React.FC = () => {
  const rideData = useContext(RideDataContext);
  const { source, setSource, destination, setDestination } = rideData;
  const [sourceChange, setSourceChange] = useState<boolean>(false);
  const [destinationChange, setDestinationChange] = useState<boolean>(false);

  const { soruceCordinates, setSourceCordinates } = useContext(SourceCordiContext);
  const { destinationCordinates, setDestinationCordinates } = useContext(DestinationCordiContext);

  const [addressList, setAddressList] = useState<AddressList | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sessionToken, setSessionToken] = useState<string>("");

  useEffect(() => {
    setSessionToken(uuidv4());
  }, []);

  // Debounce function to limit API calls
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const getAddressList = async (query: string) => {
    if (!query || query.trim() === "") {
      setAddressList(null);
      return;
    }

    setIsLoading(true);
    setAddressList(null);

    try {
      const res = await fetch(`/api/search-address?q=${encodeURIComponent(query)}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch address list");

      const result: AddressList = await res.json();
      setAddressList(result);
    } catch (error) {
      console.error("Error fetching address list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedGetAddressList = useCallback(debounce(getAddressList, 300), []);

  useEffect(() => {
    if (sourceChange || destinationChange) {
      const query = sourceChange ? source : destination;
      debouncedGetAddressList(query);
    }
  }, [source, destination, sourceChange, destinationChange]);

  const onAddressClick = async (item: AddressSuggestion, isSource: boolean) => {
    const setAddress = isSource ? setSource : setDestination;
    const setCoordinates = isSource ? setSourceCordinates : setDestinationCordinates;

    const address = item.full_address || item.place_formatted || constructAddress(item.context);
    setAddress(address);
    setAddressList(null);
    setSourceChange(false);
    setDestinationChange(false);

    try {
      const res = await fetch(
        `${MAPBOX_RETRIEVE_URL}${item.mapbox_id}?session_token=${sessionToken}&access_token=${process.env.NEXT_PUBLIC_MAPBOXACCESSTOKEN}`
      );

      if (!res.ok) throw new Error("Failed to fetch coordinates");

      const result = await res.json();
      setCoordinates({
        lng: result.features[0].geometry.coordinates[0],
        lat: result.features[0].geometry.coordinates[1],
      });
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const constructAddress = (context: AddressSuggestion["context"]) => {
    if (!context) return "";

    const { street, postcode, place, region, country } = context;
    const addressParts = [
      street?.name,
      postcode?.name,
      place?.name,
      region?.name,
      country?.name,
    ].filter(Boolean);

    return addressParts.join(", ");
  };

  return (
    <div className="mb-4">
      <div className="relative mb-3">
        <label className="text-gray-400 text-[13px]">Where From?</label>
        <input
          type="text"
          className="bg-white p-3 border-[1px] w-full rounded-md outline-none focus:border-primary text-[14px]"
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            setSourceChange(true);
            setDestinationChange(false);
          }}
        />

        {sourceChange && addressList?.suggestions && addressList.suggestions.length > 0 && (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-20">
            {addressList.suggestions.map((item, index) => (
              <h2
                key={index}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => onAddressClick(item, true)}
              >
                {item.full_address || item.place_formatted || constructAddress(item.context)}
              </h2>
            ))}
          </div>
        )}

        {isLoading && sourceChange && (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-20">
            <p className="p-3 text-gray-500">Loading suggestions...</p>
          </div>
        )}
      </div>
      <div className="relative">
        <label className="text-gray-400 text-[13px]">Where To?</label>
        <input
          type="text"
          className="bg-white p-3 border-[1px] w-full rounded-md outline-none focus:border-primary text-[14px]"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
            setDestinationChange(true);
            setSourceChange(false);
          }}
        />

        {destinationChange && addressList?.suggestions && addressList.suggestions.length > 0 && (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
            {addressList.suggestions.map((item, index) => (
              <h2
                key={index}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => onAddressClick(item, false)}
              >
                {item.full_address || item.place_formatted || constructAddress(item.context)}
              </h2>
            ))}
          </div>
        )}

        {isLoading && destinationChange && (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
            <p className="p-3 text-gray-500">Loading suggestions...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;