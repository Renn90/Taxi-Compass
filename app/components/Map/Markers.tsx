import { DestinationCordiContext } from "@/app/context/DestinationCordiContext";
import { SourceCordiContext } from "@/app/context/SourceCordiContext";
import { UserLocationContext } from "@/app/context/UserLocationContext";
import React, { useContext } from "react";
import { Map, Marker } from "react-map-gl";

function Markers() {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  const { soruceCordinates, setSourceCordinates } =
    useContext(SourceCordiContext);
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordiContext
  );

  return (
    <div>
      {/* Source marker  */}
      {soruceCordinates.length != 0 ? (
        <Marker
          longitude={soruceCordinates?.lng}
          latitude={soruceCordinates?.lat}
          anchor="bottom"
        >
          <img src="./location.png" className="w-10 h-10" />
        </Marker>
      ) : null}

      {/* Destination Marker  */}

      {destinationCordinates.length != 0 ? (
        <Marker
          longitude={destinationCordinates?.lng}
          latitude={destinationCordinates?.lat}
          anchor="bottom"
        >
          <img src="./location.png" className="w-10 h-10" />
        </Marker>
      ) : null}
    </div>
  );
}

export default Markers;
