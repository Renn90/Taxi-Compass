import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface userLocation {
  latitude: number;
  longitude: number;
}

export const LocationContext = createContext<userLocation | null>(null);

const LocationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [userLocation, setUserLocation] = useState<userLocation>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    const defaultLocation = { latitude: 40.7128, longitude: -74.006 };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log({ position });
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
        setUserLocation(defaultLocation);
      }
    );
  };

  return (
    <LocationContext.Provider value={userLocation}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export default LocationProvider;
