import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CoursefilteredData: [],
};

const filterSlice = createSlice({
  name: "filterCourse",
  initialState,
  reducers: {
    FILTER_DATA(state, action) {
      const { Data, search } = action.payload;
      console.log("dd", Data);
      const tempData = Data?.filter(
        (data) =>
          data?.title?.toLowerCase().includes(search.toLowerCase()) ||
          data?.category?.toLowerCase().includes(search.toLowerCase())
      );

      state.CoursefilteredData = tempData;
    },
  },
});

export const { FILTER_DATA } = filterSlice.actions;

export const selectFilteredData = (state) =>
  state?.CourseSearch?.CoursefilteredData;

export default filterSlice.reducer;
