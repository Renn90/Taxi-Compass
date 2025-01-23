"use client";
import { useEffect, useState } from "react";
import { MainBooking } from "./components/Booking/MainBooking";
import MapBoxMap from "./components/Map/MapBoxMap";
import { DestinationCordiContext } from "./context/DestinationCordiContext";
import { DirectionDataContext } from "./context/DirectionDataContext";
import { SourceCordiContext } from "./context/SourceCordiContext";
import { UserLocationContext } from "./context/UserLocationContext";
import LocationProvider from "./store/LocationContext";
import { DataContext } from "./context/DataContext";

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>();
  const [soruceCordinates, setSourceCordinates] = useState<any>([]);
  const [destinationCordinates, setDestinationCordinates] = useState<any>([]);
  const [directionData, setDirectionData] = useState<any>([]);

  useEffect(() => {
    getUserLocation();
  }, []);

    useEffect(() => {
      // Clear orderData when the component mounts
      sessionStorage.removeItem("orderData");
    }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };


  return (
    <div>
      <DataContext>
        <LocationProvider>
          <UserLocationContext.Provider
            value={{ userLocation, setUserLocation }}
          >
            <SourceCordiContext.Provider
              value={{ soruceCordinates, setSourceCordinates }}
            >
              <DestinationCordiContext.Provider
                value={{ destinationCordinates, setDestinationCordinates }}
              >
                <DirectionDataContext.Provider
                  value={{ directionData, setDirectionData }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="col-span-1">
                      <MainBooking />
                    </div>
                    <div className="col-span-2">
                      <MapBoxMap />
                    </div>
                  </div>
                </DirectionDataContext.Provider>
              </DestinationCordiContext.Provider>
            </SourceCordiContext.Provider>
          </UserLocationContext.Provider>
        </LocationProvider>
      </DataContext>
    </div>
  );
}
