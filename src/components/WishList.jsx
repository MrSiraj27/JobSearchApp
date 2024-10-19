import React from "react";
import { useSelector } from "react-redux";

const WishList = () => {
  const favs = useSelector((state) => state.WisList.favourites);
  //console.log(favs);

  const bgColors = [
    "#f3eaff", // Lavender Light
    "#d9e3ea", // Light Grayish Blue
    "#d7f7d4", // Light Mint Green
    "#f0f2f5", // Very Light Gray
    "#e7cdf6", // Pale Lavender
    "#fde5e5", // Light Peach
  ];

  return (
    <>
      {favs.length > 0 ? (
        <div className="flex flex-wrap gap-4 mt-7 p-4 justify-center">
          {favs.map((job, idx) => (
            <div
              className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6"
              style={{ backgroundColor: bgColors[idx % bgColors.length] }}
              key={idx}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {job.title}
              </h2>

              <div className="flex justify-between mb-4 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Min Salary</p>
                  <p className="text-lg font-semibold text-green-600">
                    ${job.min}/Month
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Max Salary</p>
                  <p className="text-lg font-semibold text-green-600">
                    ${job.max}/Month
                  </p>
                </div>
              </div>

              <button className="bg-[#2d2e32] mt-3 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300 ease-in-out">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p> No favourites!</p>
      )}
    </>
  );
};

export default WishList;
