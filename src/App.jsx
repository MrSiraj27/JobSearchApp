import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobFilters from "./components/JobSearchApp/JobFilters";
import JobListing from "./components/JobSearchApp/JobListing";
import Navbar from "./components/Navbar";
import WishList from "./components/WishList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        {/* Routes for different pages */}
        <Routes>
          {/* Job Search page with filters and listing */}
          <Route
            path="/"
            element={
              <div className="flex flex-wrap gap-4 p-4">
                {/* Job Filters Section */}
                <div className="w-full sm:w-[20%]  h-auto border-2 rounded-lg mt-3">
                  <JobFilters />
                </div>

                {/* Job Listing Section */}
                <div className="w-full sm:w-[75%] h-auto mt-3">
                  <JobListing />
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
