import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Video_SectionServices from "./videoSectionService";
import { toast } from "react-toastify";

const initialState = {
  video_section: null,
  video: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Add Video to Section
export const Video_AddToSection = createAsyncThunk(
  "video/AddTo/Section",
  async (data, thunkAPI) => {
    try {
      return await Video_SectionServices.Video_AddToSection(data);
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

// Create Video Section
export const Video_CreateSection = createAsyncThunk(
  "video/create/section",
  async (formData, thunkAPI) => {
    try {
      return await Video_SectionServices.Video_CreateSection(formData);
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

// get Video Section
export const Video_get_Section = createAsyncThunk(
  "video/get/section",
  async (formData, thunkAPI) => {
    try {
      return await Video_SectionServices.Video_get_Section(formData);
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

// Delete video Section
export const Video_DeleteSection = createAsyncThunk(
  "video/delete/section",
  async (id, thunkAPI) => {
    try {
      return await Video_SectionServices.Video_DeleteSection(id);
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

// preview video from  Section
export const PreviewVideoFromSection = createAsyncThunk(
  "Video/preview/From/Section",
  async (ids, thunkAPI) => {
    try {
      return await Video_SectionServices.PreviewVideoFromSection(ids);
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

// delete video from  Section
export const Video_DeleteFromSection = createAsyncThunk(
  "Video/Delete/From/Section",
  async (ids, thunkAPI) => {
    try {
      return await Video_SectionServices.Video_DeleteFromSection(ids);
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

const videoSectionSlice = createSlice({
  name: "videoSection",
  initialState,
  extraReducers: (builder) => {
    builder

      // create Video Section
      .addCase(Video_CreateSection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Video_CreateSection.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Video Section created successfully");
      })
      .addCase(Video_CreateSection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // get Video Section
      .addCase(Video_get_Section.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Video_get_Section.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.video_section = action?.payload?.sectionExist;
      })
      .addCase(Video_get_Section.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // delete Video Section
      .addCase(Video_DeleteSection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Video_DeleteSection.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Video Section deleted successfully");
      })
      .addCase(Video_DeleteSection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Add Video To Section
      .addCase(Video_AddToSection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Video_AddToSection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Video Added To Section successfully");
      })
      .addCase(Video_AddToSection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Delete Video From Section
      .addCase(PreviewVideoFromSection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(PreviewVideoFromSection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.video = action.payload;
      })
      .addCase(PreviewVideoFromSection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Delete Video From Section
      .addCase(Video_DeleteFromSection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Video_DeleteFromSection.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Video Deleted From Section successfully");
      })
      .addCase(Video_DeleteFromSection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.videoSection.isLoading;
export const selectVideo_section = (state) => state.videoSection.video_section;
export const selectVideoFromSection = (state) => state.videoSection.video;
export default videoSectionSlice.reducer;
