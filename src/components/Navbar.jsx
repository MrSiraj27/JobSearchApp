import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import WishList from "./WishList";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const state = useSelector((state) => state.WisList);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="sticky z-10 w-full top-0">
        <div className="logo flex items-center justify-between bg-[#e9e9e9] p-4 rounded-xl">
          <Link
            to={`/`}
            style={{ fontFamily: "Gilroy-bold" }}
            className="text-[#6572e9] text-3xl"
          >
            Jobfiy
          </Link>
          <div className="relative">
            <div onClick={toggleModal} className="cursor-pointer">
              <CiHeart className="text-4xl" />
              <p className="absolute top-[-10px] text-red-600 right-0 text-1xl">
                {state.count}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="bg-white rounded-lg p-6 w-full h-[90%] sm:w-[95%] sm:h-[95%] overflow-auto relative"
          >
            <h2 className="text-xl mb-4">Wish List</h2>

            {/* Render your WishList component inside */}
            <WishList />

            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-black text-2xl"
              onClick={toggleModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
