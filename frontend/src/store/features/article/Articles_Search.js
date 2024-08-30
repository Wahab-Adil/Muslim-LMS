import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredData: [],
};

const filterSlice = createSlice({
  name: "filterArticles",
  initialState,
  reducers: {
    FILTER_Data(state, action) {
      const { Data, search } = action.payload;
      console.log(Data);
      const tempData = Data.filter(
        (data) =>
          data?.title?.toLowerCase().includes(search.toLowerCase()) ||
          data?.category?.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredData = tempData;
    },
  },
});

export const { FILTER_Data } = filterSlice.actions;

export const selectFilteredArticles = (state) =>
  state?.ArticleSearch?.filteredData;

export default filterSlice.reducer;
