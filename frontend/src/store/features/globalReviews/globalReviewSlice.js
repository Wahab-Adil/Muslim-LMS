import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GlobalReviewSerivces from "./globalReviewService";
import { toast } from "react-toastify";
import { t } from "i18next";

const initialState = {
  globalReviews: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// select  globalReview
export const SelectGlobalReview = createAsyncThunk(
  "/select/globalReview",
  async (id, thunkAPI) => {
    try {
      return await GlobalReviewSerivces.SelectGlobalReview(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Delete  globalReview
export const deleteGlobalReview = createAsyncThunk(
  "/delete/review",
  async (id, thunkAPI) => {
    try {
      return await GlobalReviewSerivces.deleteGlobalReview(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get All Global Reviews
export const AllGlobalReviews = createAsyncThunk(
  "/all/global-reviews",
  async (_, thunkAPI) => {
    try {
      return await GlobalReviewSerivces.AllGlobalReviews();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const globalReview = createSlice({
  name: "globalReview",
  initialState,
  extraReducers: (builder) => {
    builder

      // review selection
      .addCase(SelectGlobalReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SelectGlobalReview.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Review selected.");
      })
      .addCase(SelectGlobalReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // delete Advertisement
      .addCase(deleteGlobalReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGlobalReview.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("Review deleted."));
      })
      .addCase(deleteGlobalReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // get  All global Reviews
      .addCase(AllGlobalReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AllGlobalReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.globalReviews = action.payload;
      })
      .addCase(AllGlobalReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      });
  },
});

export const selectIsLoading = (state) => state.videoCategory.isLoading;
export const selectAllGlobalReviews = (state) =>
  state.globalReview.globalReviews;
export default globalReview.reducer;
