import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import video_CourseService from "./videoCoursesService";
import { toast } from "react-toastify";
import { t } from "i18next";

const initialState = {
  video_Course: null,
  video_Courses: [],
  hasReviewed: false,
  newRelatedCourses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create Video course
export const Video_CreateCourse = createAsyncThunk(
  "video/create/course",
  async (course, thunkAPI) => {
    try {
      return await video_CourseService.Video_CreateCourse(course);
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
// Delete video course
export const Video_DeleteCourse = createAsyncThunk(
  "video/delete/course",
  async (id, thunkAPI) => {
    try {
      return await video_CourseService.Video_DeleteCourse(id);
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

// get All courses
export const Video_AllCourse = createAsyncThunk(
  "video/all/course",
  async (_, thunkAPI) => {
    try {
      return await video_CourseService.Video_AllCourse();
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

// get course Details
export const Video_CourseDetails = createAsyncThunk(
  "video/course/details",
  async (id, thunkAPI) => {
    try {
      return await video_CourseService.Video_CourseDetails(id);
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

// Update Single course Details
export const Video_UpdateCourse = createAsyncThunk(
  "video/update/course-Details",
  async (formData, thunkAPI) => {
    try {
      console.log("idssss", formData);
      return await video_CourseService.Video_UpdateCourse(formData);
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

const Video_CourseSlice = createSlice({
  name: "videoCourse",
  initialState,
  extraReducers: (builder) => {
    builder

      // create video Course
      .addCase(Video_CreateCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Video_CreateCourse.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("Course created successfully"));
      })
      .addCase(Video_CreateCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // delete Video Course
      .addCase(Video_DeleteCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Video_DeleteCourse.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("Video Course deleted successfully"));
      })
      .addCase(Video_DeleteCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // get Course Details
      .addCase(Video_CourseDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Video_CourseDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.video_Course = action.payload?.course;
        state.hasReviewed = action.payload?.HasReviewed;
        state.newRelatedCourses = action.payload?.newRelatedCourses;
      })
      .addCase(Video_CourseDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // get  All Article Categories
      .addCase(Video_AllCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Video_AllCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.video_Courses = action?.payload?.allCourses;
      })
      .addCase(Video_AllCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // update video Course
      .addCase(Video_UpdateCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Video_UpdateCourse.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("Video Course updated successfully"));
      })
      .addCase(Video_UpdateCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      });
  },
});

export const selectIsLoading = (state) => state.videoCourse.isLoading;
export const selectAllCourses = (state) => state.videoCourse.video_Courses;
export const selectVideoCourse = (state) => state.videoCourse.video_Course;
export const selectNewRelatedCourses = (state) =>
  state.videoCourse.newRelatedCourses;
export const selectHasReviewed = (state) => state.videoCourse.hasReviewed;
export default Video_CourseSlice.reducer;
