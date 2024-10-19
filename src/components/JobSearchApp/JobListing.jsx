import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FetchJobs } from "../../Redux/Slices/Jobs";
import JobCard from "../JobCard";
import SearchBar from "./SearchBar";
import Loader from "../Loader";

const JobListing = () => {
  const dispatch = useDispatch();
  const { filteredJobs, isLoading } = useSelector((state) => state.Jobs);

  useEffect(() => {
    dispatch(FetchJobs());
  }, []);
  console.log(filteredJobs, "Jobs");
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex justify-between flex-wrap">
        <h2 className="text-2xl text-[#2d2e32]">Jobs</h2>
        <SearchBar />
      </div>
      <div className="flex flex-wrap p-3 gap-4 ">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, indx) => (
            <JobCard key={job.id} jobData={job} index={indx} />
          ))
        ) : (
          <p>Not Such Job Is Avaible!</p>
        )}
      </div>
    </>
  );
};

export default JobListing;
