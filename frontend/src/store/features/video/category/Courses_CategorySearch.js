import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredData: [],
};

const filterSlice = createSlice({
  name: "CourseCategoryfilter",
  initialState,
  reducers: {
    FILTER_Data(state, action) {
      const { Data, search } = action.payload;
      const tempData = Data.filter(
        (data) =>
          data?.name?.toLowerCase().includes(search.toLowerCase()) ||
          data?.category?.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredData = tempData;
    },
  },
});

export const { FILTER_Data } = filterSlice.actions;

export const selectFilteredPoducts = (state) => state.filter.filteredData;

export default filterSlice.reducer;
