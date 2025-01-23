
import React, { Dispatch, SetStateAction, useContext, useState } from "react";

interface suggestion {
  place_formatted: string;
  mapbox_id: string;
}

interface SuggestionProps {
  suggestion: Array<suggestion>;
  setLocation: Dispatch<SetStateAction<{ from: string; to: string }>>;
  setSuggestionTaken: Dispatch<SetStateAction<boolean>>;
  suggestionType: string;
}

const Suggestion: React.FC<SuggestionProps> = ({
  suggestion,
  setLocation,
  setSuggestionTaken,
  suggestionType,
}) => {


  return (
    <div className="w-full bg-white shadow-md rounded rounded-t-none absolute top-[95%] z-[99]">
      {suggestion.map((item, index) => (
        <p
          onClick={() => {
            console.log("Suggestion clicked:", item); // Logs the clicked suggestion
            setLocation((prev) => ({
              ...prev,
              [suggestionType]: item.place_formatted,
            }));
            setSuggestionTaken(true);
          }}
          key={index}
          className="font-semibold p-2 cursor-pointer hover:bg-[lightgrey]"
        >
          {item.place_formatted}
        </p>
      ))}
    </div>
  );
};

export default Suggestion;
