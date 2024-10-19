import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterJobLocation } from "../Redux/Slices/Jobs";
import toast, { Toaster } from "react-hot-toast";

const LocationFilter = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleReset = () => {
    setInput("");
    dispatch(filterJobLocation({ value: "" }));
  };

  const handleDispatch = () => {
    if (input == "") {
      toast.error("Please Enter Location...");
    } else {
      dispatch(filterJobLocation({ value: input }));
    }
  };

  const handleLocation = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <div className="p-2">
        <div className="flex items-center justify-between">
          <div className="mt-5 text-2xl">Location</div>
          <div className="mt-5 cursor-pointer" onClick={handleReset}>
            Reset
          </div>
        </div>
        <div className="individual_inputs mt-3">
          <input
            className={`cursor-pointer border-2 rounded-3xl px-3 w-full py-0`}
            id="min_salary"
            name="min_salary"
            placeholder="Enter Location"
            value={input || ""}
            onChange={handleLocation}
          />
        </div>
        <button
          onClick={handleDispatch}
          className="px-4 py-2 rounded-lg text-white mt-2  w-full bg-[#2d2e32] hover:bg-[#000000]"
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default LocationFilter;
