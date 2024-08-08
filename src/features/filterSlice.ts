import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  category: "",
  sort: "asc",
  review: "",
  minPrice: "",
  maxPrice: "",
};

const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter: (state, action) => {
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
    },

    clearFilter: (state) => {
      state.search = "";
      state.category = "";
      state.sort = "asc";
      state.review = "";
      state.minPrice = "";
      state.maxPrice = "";
    },
  },
});

export const { updateFilter, clearFilter } = FilterSlice.actions;
export default FilterSlice.reducer;
