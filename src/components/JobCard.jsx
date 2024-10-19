import React, { useMemo, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { useDispatch } from "react-redux";
import { add_to_wish_list, remove_from_list } from "../Redux/Slices/WishList";
import Loader from "./Loader";
import toast, { Toaster } from "react-hot-toast";

const JobCard = ({ jobData, index }) => {
  const dispatch = useDispatch();
  const [heart, setHeart] = useState(false); // Maintain a single heart state
  const [isLoading, setisLoading] = useState(false);

  if (!jobData) {
    return <Loader />; // Optional: handle null or undefined jobData
  }

  const toggleHeart = (title, min, max, url) => {
    // Toggle the heart state only if it's not loading
    if (!isLoading) {
      setisLoading(true);

      // Dispatch add or remove based on the current heart state
      if (!heart) {
        dispatch(
          add_to_wish_list({ title: title, min: min, max: max, url: url })
        );

        setTimeout(() => {
          toast("Added");
        }, 2000);
      } else {
        dispatch(remove_from_list({ title }));

        setTimeout(() => {
          toast("Removed");
        }, 2000);
      }

      setHeart(!heart); // Toggle heart state

      // After 3 seconds, re-enable the heart button
      setTimeout(() => {
        setisLoading(false);
      }, 2000);
    }
  };

  const bgColors = [
    "#f3eaff", // Lavender Light
    "#d9e3ea", // Light Grayish Blue
    "#d7f7d4", // Light Mint Green
    "#f0f2f5", // Very Light Gray
    "#e7cdf6", // Pale Lavender
    "#fde5e5", // Light Peach
  ];

  return (
    <div
      className="rounded-lg w-full sm:w-[49%] p-2"
      style={{ backgroundColor: bgColors[index % bgColors.length] }}
    >
      <div className="salary flex justify-between">
        <div>
          <p className="text-[0.8rem]" style={{ fontFamily: "Gilroy-light" }}>
            Max Salary
          </p>
          <strong className="sm:text-2xl text-[17px]">
            ${jobData.salary_max}
          </strong>
          /Month
        </div>
        <div>
          <p className="text-[0.8rem]" style={{ fontFamily: "Gilroy-light" }}>
            Min Salary
          </p>
          <strong className="sm:text-2xl text-[17px]">
            ${jobData.salary_min}
          </strong>
          /Month
        </div>
      </div>

      <div className="job_title mt-8 flex justify-between">
        <div>
          <h1 className="text-2xl">{jobData.title}</h1>
          <span style={{ fontFamily: "Gilroy-light" }}>
            {jobData.location.display_name}
          </span>
        </div>
        <div className="url">
          <a
            className="text-2xl bg-[#ffffff] px-3 py-2 rounded-md"
            href={jobData.redirect_url}
            target="_blank"
            rel="noopener noreferrer" // For security
          >
            ↗
          </a>
        </div>
      </div>

      <div className="location mt-4 flex gap-3 items-center text-[#b1b2c0]">
        <IoLocationSharp />
        <p>{jobData.location.area.join(", ")}</p>{" "}
        {/* Display all location areas */}
      </div>

      <div className="job_type mt-3 flex items-center gap-4">
        <p className="border-2 border-slate-400 px-3 py-1 w-fit rounded-2xl capitalize">
          {jobData.contract_time || jobData.contract_type}
        </p>
        <p className="border-2 border-slate-400 px-3 py-1 w-fit rounded-2xl capitalize">
          {jobData.contract_type}
        </p>
      </div>

      <div className="apply_now mt-4 flex items-center justify-between">
        <a
          href={jobData.redirect_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            //onClick={() => notify()}
            className="px-4 py-2 rounded-lg text-white  sm:w-80 bg-[#2d2e32]"
          >
            Apply Now
          </button>
        </a>
        {/* // <Toaster /> */}
        <div
          className={`border-slate-400 border-2 px-3 py-1 w-fit rounded-2xl text-3xl ${
            isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          onClick={
            !isLoading
              ? () =>
                  toggleHeart(
                    jobData.title,
                    jobData.salary_min,
                    jobData.salary_max,
                    jobData.redirect_url
                  )
              : null
          } // Disable click when loading
          disabled={isLoading} // Disable button during loading
        >
          {isLoading ? <Loader /> : heart ? <IoMdHeart /> : <CiHeart />}
        </div>
        <Toaster />
      </div>
      {/* <div className="loader"></div> */}
    </div>
  );
};

export default JobCard;
