import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ArticleReview from "./articleReviewsService";
import { toast } from "react-toastify";
import i18n from "i18next";

const initialState = {
  articleReview: null,
  AllArticleReviews: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create Article Review
export const ArticleCreateReview = createAsyncThunk(
  "aricle/create/review",
  async (formData, thunkAPI) => {
    try {
      return await ArticleReview.ArticleCreateReview(formData);
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

// all Article Reviews
export const ArticleAllReviews = createAsyncThunk(
  "aricle/all/reviews",
  async (_, thunkAPI) => {
    try {
      return await ArticleReview.ArticleAllReviews();
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

// Article delete Review
export const ArticleDeleteReview = createAsyncThunk(
  "article/delete/review",
  async (id, thunkAPI) => {
    try {
      return await ArticleReview.ArticleDeleteReview(id);
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

// Update Article Review
export const ArticleUpdateReview = createAsyncThunk(
  "article/update/review",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await ArticleReview.ArticleUpdateReview(id, formData);
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

const ArticleReviewSlice = createSlice({
  name: "articleReview",
  initialState,
  extraReducers: (builder) => {
    builder

      // create Article Review
      .addCase(ArticleCreateReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ArticleCreateReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(i18n.t(action?.payload?.message));
      })
      .addCase(ArticleCreateReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      })
      // ALL Articles Reviews
      .addCase(ArticleAllReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ArticleAllReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.AllArticleReviews = action.payload;
        toast.success(i18n.t(action?.payload?.message));
      })
      .addCase(ArticleAllReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      })

      // delete Article Review
      .addCase(ArticleDeleteReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ArticleDeleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(i18n.t(action?.payload?.message));
      })
      .addCase(ArticleDeleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      })

      // update Article Review
      .addCase(ArticleUpdateReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ArticleUpdateReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(i18n.t(action?.payload?.message));
      })
      .addCase(ArticleUpdateReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action?.payload));
      });
  },
});

export const selectIsLoading = (state) => state.articleReview.isLoading;
export const selectAllArticlesReviews = (state) =>
  state.articleReview.AllArticleReviews;
export default ArticleReviewSlice.reducer;
