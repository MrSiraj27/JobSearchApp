import { combineReducers } from "@reduxjs/toolkit";
import { JobsSlice } from "./Slices/Jobs";
import { whishlit_slice } from "./Slices/WishList";

const rootReducer = combineReducers({
  Jobs: JobsSlice.reducer,
  WisList: whishlit_slice.reducer,
});

export default rootReducer;
