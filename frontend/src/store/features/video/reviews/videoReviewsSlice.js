import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import videoReviewsService from "./videoReviewsService";
import { toast } from "react-toastify";
import { t } from "i18next";

const initialState = {
  videoReview: null,
  AllCourseReviews: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create Video Review
export const Video_CreateReview = createAsyncThunk(
  "video/create/review",
  async (formData, thunkAPI) => {
    try {
      return await videoReviewsService.Video_CreateReview(formData);
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
// Video delete Review
export const Video_DeleteReview = createAsyncThunk(
  "video/delete/review",
  async (id, thunkAPI) => {
    try {
      return await videoReviewsService.Video_DeleteReview(id);
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

// Update Video Review
export const Video_UpdateReview = createAsyncThunk(
  "video/update/review",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await videoReviewsService.Video_UpdateReview(id, formData);
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

// all Video Reviews
export const Video_AllReviews = createAsyncThunk(
  "video/all/review",
  async (_, thunkAPI) => {
    try {
      return await videoReviewsService.Video_AllReviews();
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
const VideoReviws = createSlice({
  name: "videoReview",

  initialState,

  extraReducers: (builder) => {
    builder

      // create Article Review
      .addCase(Video_CreateReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Video_CreateReview.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("Course Review created successfully"));
      })
      .addCase(Video_CreateReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })
      // create Article Review
      .addCase(Video_AllReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Video_AllReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.AllCourseReviews = action.payload?.reviews;
        toast.success(t("All Reviews Fetched"));
      })
      .addCase(Video_AllReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // delete Article Review
      .addCase(Video_DeleteReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Video_DeleteReview.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("Course Review deleted successfully"));
      })
      .addCase(Video_DeleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // update Article Review
      .addCase(Video_UpdateReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Video_UpdateReview.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("Course Review updated successfully"));
      })
      .addCase(Video_UpdateReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      });
  },
});

export const selectIsLoading = (state) => state.videoReview.isLoading;
export const selectVideoReview = (state) => state.videoReview.videoReview;
export const selectAllVideoReviews = (state) =>
  state?.videoReview?.AllCourseReviews;
export default VideoReviws.reducer;
