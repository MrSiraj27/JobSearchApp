import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const FetchJobs = createAsyncThunk("Fetch_jobs", async () => {
  const response = await fetch(
    "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=494ab4da&app_key=39ce24ad2489d821737ec4edecf0cbb6"
  );

  const data = await response.json();
  return data.results || [];
});

export const JobsSlice = createSlice({
  name: "Jobs Slice",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    filterCriteria: [],
    filteredJobs: [],
  },
  reducers: {
    filter: (state, action) => {
      const { value } = action.payload;

      //  console.log(value, "searhc");

      // Toggle filter value
      if (state.filterCriteria.includes(value)) {
        state.filterCriteria = state.filterCriteria.filter(
          (criteria) => criteria !== value
        );
      } else {
        state.filterCriteria.push(value);
      }

      // Apply filtering based on the part time and fulll time
      state.filteredJobs =
        state.filterCriteria.length > 0
          ? state.data.filter((job) =>
              state.filterCriteria.includes(job.contract_time)
            )
          : state.data; // Show all jobs if no filter is active
    },

    searchFilter: (state, action) => {
      const { value } = action.payload;

      // console.log(value, "searhc");

      if (value.trim() !== "") {
        state.filteredJobs = state.data.filter((job) =>
          job.title.toLowerCase().includes(value.toLowerCase())
        );
      } else {
        state.filteredJobs = state.data;
      }
    },

    filterSalaries: (state, action) => {
      const { min, max } = action.payload;
      // const { name, salary_min, salary_max } = action.payload;
      // console.log(name, salary_min, salary_max, "from redux");

      if (min?.salary_min > 0 && max?.salary_max) {
        state.filteredJobs = state.data.filter(
          (job) =>
            job.salary_min >= min.salary_min && job.salary_max <= max.salary_max
        );
      } else {
        state.filteredJobs = state.data;
      }
    },

    filterJobLocation: (state, action) => {
      const { value } = action.payload;
      // console.log(value, "from job loc");

      if (value.trim() !== "") {
        state.filteredJobs = state.data.filter((job) =>
          job.location.area
            .join(", ")
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      } else {
        state.filteredJobs = state.data;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(FetchJobs.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(FetchJobs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.filteredJobs = action.payload; // Initialize filteredJobs with all jobs
    });

    builder.addCase(FetchJobs.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { filter, searchFilter, filterSalaries, filterJobLocation } =
  JobsSlice.actions;
export default JobsSlice.reducer;
