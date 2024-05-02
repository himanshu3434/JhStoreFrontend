import { createSlice } from "@reduxjs/toolkit";
import { startTransition } from "react";

const initialState = {
  search: "",
  category: "",
  sort: "",
  review: "",
  minPrice: "",
  maxPrice: "",
};

const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      console.log("data ", action.payload.data, "   id ", action.payload.id);
      const id = action.payload.id;
      const data = action.payload.data;
      switch (id) {
        case "search":
          state.search = data;
          break;
        case "category":
          state.category = data;
          break;
        case "sort":
          state.sort = data;
          break;
        case "review":
          state.review = data;
          break;
        case "price":
          state.minPrice = data.minPrice;
          state.maxPrice = data.maxPrice;
          break;
      }

      console.log(
        "state value after updation",
        state.minPrice,
        "    max   ",
        state.maxPrice
      );
    },

    clearFilter: (state) => {
      state.search = "";
      state.category = "";
      state.sort = "";
      state.review = "";
      state.minPrice = "";
      state.maxPrice = "";
    },
  },
});

export const { updateFilter, clearFilter } = FilterSlice.actions;
export default FilterSlice.reducer;