import { createSlice } from "@reduxjs/toolkit";

const getParsedLocalStorage = (key, defaultValue) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return defaultValue;
  }
};

// Safely retrieve data from localStorage
const getFromLocalStorage = getParsedLocalStorage("Wish_List", []);
const totalCount = parseInt(localStorage.getItem("count")) || 0;

export const whishlit_slice = createSlice({
  name: "Wish List",
  initialState: {
    favourites: getFromLocalStorage,
    isLoading: false,
    count: totalCount,
  },
  reducers: {
    add_to_wish_list: (state, action) => {
      const data = action.payload;
      if (!state.favourites.includes(data) && data) {
        state.favourites.push({
          title: data.title,
          min: data.min,
          max: data.max,
          url: data.url,
        });
        state.count++;
      }

      console.log([...state.favourites], "fav");

      localStorage.setItem("count", state.count);
      localStorage.setItem("Wish_List", JSON.stringify(state.favourites));
    },
    remove_from_list: (state, action) => {
      const { title } = action.payload;
      state.favourites = state.favourites.filter(
        (item) => item.title !== title
      );
      state.count--;

      localStorage.setItem("count", state.count);
      localStorage.setItem("Wish_List", JSON.stringify(state.favourites));
    },
  },
});
export const { add_to_wish_list, remove_from_list } = whishlit_slice.actions;
export default whishlit_slice.reducer;
