import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import articleCategoryService from "./articleCategoryService";
import { toast } from "react-toastify";
import i18n from "i18next";

const initialState = {
  articleCategory: null,
  ArtcAllCategories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create Article Category
export const ArticleCreateCategory = createAsyncThunk(
  "article/create/category",
  async (Category, thunkAPI) => {
    try {
      return await articleCategoryService.ArticleCreateCategory(Category);
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
// Delete Article Category
export const ArticleDeleteCategory = createAsyncThunk(
  "article/delete/category",
  async (id, thunkAPI) => {
    try {
      return await articleCategoryService.ArticleDeleteCategory(id);
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

// get All Categories of Article
export const ArticleAllCategory = createAsyncThunk(
  "article/all/category",
  async (_, thunkAPI) => {
    try {
      return await articleCategoryService.ArticleAllCategory();
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

// get Single Category of Article
export const ArticleSingleCategory = createAsyncThunk(
  "article/single/category",
  async (id, thunkAPI) => {
    try {
      return await articleCategoryService.ArticleSingleCategory(id);
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

// Update Single Article-Category
export const ArticleUpdateCategory = createAsyncThunk(
  "article/update/category",
  async (data, thunkAPI) => {
    try {
      return await articleCategoryService.ArticleUpdateCategory(data);
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

const ArticleCategorySlice = createSlice({
  name: "articleCategory",
  initialState,
  extraReducers: (builder) => {
    builder

      // create Article category
      .addCase(ArticleCreateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ArticleCreateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(i18n.t(action?.payload?.message));
      })
      .addCase(ArticleCreateCategory.rejected, (state, action) => {
        console.log("u", action);

        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // delete Article category
      .addCase(ArticleDeleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ArticleDeleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(i18n.t(action?.payload));
      })
      .addCase(ArticleDeleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get Single Article Category
      .addCase(ArticleSingleCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ArticleSingleCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.articleCategory = action.payload;
      })
      .addCase(ArticleSingleCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      })

      // get  All Article Categories
      .addCase(ArticleAllCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ArticleAllCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.ArtcAllCategories = action.payload;
      })
      .addCase(ArticleAllCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      })

      // update Article Category
      .addCase(ArticleUpdateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ArticleUpdateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(i18n.t(action?.payload?.message));
        state.articleCategory = null;
      })
      .addCase(ArticleUpdateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      });
  },
});
export const selectIsLoading = (state) => state.articleCategory.isLoading;
export const selectAllArticleCategories = (state) =>
  state.articleCategory.ArtcAllCategories;
export const selectArticleCategory = (state) =>
  state.articleCategory.articleCategory;

export default ArticleCategorySlice.reducer;
