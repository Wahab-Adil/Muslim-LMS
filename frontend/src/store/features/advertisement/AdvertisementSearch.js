import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredData: [],
};

const filterSlice = createSlice({
  name: "advertisementfilter",
  initialState,
  reducers: {
    FILTER_Data(state, action) {
      const { Data, search } = action.payload;
      const tempData = Data.filter(
        (data) =>
          data?.title?.toLowerCase().includes(search.toLowerCase()) ||
          data?.subtitle?.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredData = tempData;
    },
  },
});

export const { FILTER_Data } = filterSlice.actions;

export const selectFilteredAdvertisement = (state) =>
  state.advertisementSearch.filteredData;

export default filterSlice.reducer;
