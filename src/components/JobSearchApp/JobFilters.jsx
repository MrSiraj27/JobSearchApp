import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filter, filterSalaries } from "../../Redux/Slices/Jobs";
import toast, { Toaster } from "react-hot-toast";
import LocationFilter from "../LocationFilter";

const JobFilters = () => {
  const [minSal, setMinSal] = useState({});
  const [maxSal, setMaxSal] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(filter({ value: e.target.value }));
  };

  const handleMinChangeSalaries = (e) => {
    setMinSal({
      name: e.target.name,
      salary_min: Number(e.target.value),
    });
  };

  const handleMaxChangeSalaries = (e) => {
    setMaxSal({
      salary_max: Number(e.target.value),
    });
  };

  const handleReset = () => {
    setMinSal({
      name: "",
      salary_min: 0,
    });
    setMaxSal({
      salary_max: 0,
    });
    dispatch(filterSalaries({ salary_min: 0, salary_max: 0 }));
  };

  const handleDispatch = () => {
    // console.log(minSal);
    if (!minSal.salary_min && !maxSal.salary_max) {
      toast.error("Inputs Fields Cannot Be Empty!");
    } else if (!minSal.salary_min) {
      toast.error("Please Enter Minimum Salary");
    } else if (!maxSal.salary_max) {
      toast.error("Please Enter Maximum Salary");
    } else {
      dispatch(filterSalaries({ min: minSal, max: maxSal }));
    }
  };

  return (
    <>
      <div className="sticky top-14">
        <div className="p-2">
          <h2 className="text-[#2d2e32] text-2xl">Filters</h2>
          <div className="mt-5">Work Schedule</div>
          <div className="inputs mt-3">
            <div>
              <input
                className="cursor-pointer"
                type="checkbox"
                id="fulltime"
                name="fulltime"
                value="full_time"
                onChange={handleChange}
              />
              <label htmlFor="fulltime"> Full Time</label>
              <br />
            </div>
            <div className="mt-2">
              <input
                className="cursor-pointer"
                type="checkbox"
                id="parttime"
                name="parttime"
                value="part_time"
                onChange={handleChange}
              />
              <label htmlFor="parttime"> Part Time</label>
              <br />
            </div>
          </div>
        </div>

        {/* filter based in salaries */}
        <div className="p-2">
          <div className="flex items-center justify-between">
            <div className="mt-5 text-2xl">Salaries</div>
            <div className="mt-5 cursor-pointer" onClick={handleReset}>
              Reset
            </div>
          </div>
          <div className="input_cont mt-4 flex gap-1">
            <div className="individual_inputs">
              <label htmlFor="min_salary"> Min Salary</label>
              <input
                className={`cursor-pointer border-2 rounded-3xl px-3 w-full py-0`}
                id="min_salary"
                name="min_salary"
                value={minSal.salary_min || ""}
                onChange={handleMinChangeSalaries}
              />
            </div>
            <div className="individual_inputs">
              <label htmlFor="max_salary"> Max Salary</label>
              <input
                className="cursor-pointer border-2 rounded-3xl px-3 w-full py-0"
                id="max_salary"
                name="max_salary"
                value={maxSal.salary_max || ""}
                onChange={handleMaxChangeSalaries}
              />
            </div>
          </div>
          <button
            onClick={handleDispatch}
            className="px-4 py-2 rounded-lg text-white mt-2  w-full bg-[#2d2e32] hover:bg-[#000000]"
          >
            Filter
          </button>
        </div>
        {/* filter based on loacation */}
        <LocationFilter />
      </div>
    </>
  );
};

export default JobFilters;
