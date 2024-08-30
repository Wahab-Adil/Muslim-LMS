import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import videoCategoryService from "./videoCategoryService";
import { toast } from "react-toastify";
import { t } from "i18next";
const initialState = {
  video_Cate: null,
  video_AllCategories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create Video Category
export const Video_CreateCategory = createAsyncThunk(
  "video/create/category",
  async (Category, thunkAPI) => {
    try {
      return await videoCategoryService.Video_CreateCategory(Category);
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
// Delete video Category
export const Video_DeleteCategory = createAsyncThunk(
  "video/delete/category",
  async (id, thunkAPI) => {
    try {
      return await videoCategoryService.Video_DeleteCategory(id);
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

// get All Categories of Video
export const Video_AllCategories = createAsyncThunk(
  "video/all/category",
  async (_, thunkAPI) => {
    try {
      return await videoCategoryService.Video_AllCategories();
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

// get Single Category of Video
export const Video_SingleCategory = createAsyncThunk(
  "video/single/category",
  async (id, thunkAPI) => {
    try {
      return await videoCategoryService.Video_SingleCategory(id);
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

// Update Single Video-Category
export const Video_UpdateCategory = createAsyncThunk(
  "video/update/category",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await videoCategoryService.Video_UpdateCategory(id, formData);
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

const Video_CategorySlice = createSlice({
  name: "videoCategory",
  initialState,
  extraReducers: (builder) => {
    builder

      // create Video category
      .addCase(Video_CreateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Video_CreateCategory.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("Video Category created successfully"));
      })
      .addCase(Video_CreateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // delete Video category
      .addCase(Video_DeleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Video_DeleteCategory.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("Video Category deleted successfully"));
      })
      .addCase(Video_DeleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // get Single Video Category
      .addCase(Video_SingleCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Video_SingleCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.video_Cate = action.payload;
      })
      .addCase(Video_SingleCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // get  All Video Categories
      .addCase(Video_AllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Video_AllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.video_AllCategories = action.payload?.allCategoreis;
      })
      .addCase(Video_AllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // update Video Category
      .addCase(Video_UpdateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Video_UpdateCategory.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("Video Category updated successfully"));
      })
      .addCase(Video_UpdateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      });
  },
});

export const selectIsLoading = (state) => state.videoCategory.isLoading;
export const selectVideoAllCategories = (state) =>
  state.videoCategory.video_AllCategories;
export const selectVideoCategory = (state) => state.videoCategory.video_Cate;

export default Video_CategorySlice.reducer;
