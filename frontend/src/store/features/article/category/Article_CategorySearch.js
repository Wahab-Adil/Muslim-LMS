import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredData: [],
};

const filterSlice = createSlice({
  name: "courseCategoryfilter",
  initialState,
  reducers: {
    FILTER_Data(state, action) {
      const { Data, search } = action.payload;
      console.log(Data);
      const tempData = Data?.filter(
        (data) =>
          data?.name?.toLowerCase().includes(search.toLowerCase()) ||
          data?.category?.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredData = tempData;
    },
  },
});

export const { FILTER_Data } = filterSlice.actions;

export const selectCategoryFilteredArticles = (state) =>
  state.filter.filteredData;

export default filterSlice.reducer;
