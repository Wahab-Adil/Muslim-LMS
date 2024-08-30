import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ArticleServices from "./articleService";
import { toast } from "react-toastify";
import i18n from "i18next";

const initialState = {
  Article: null,
  Articles: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New Article
export const createArticle = createAsyncThunk(
  "article/create",
  async (formData, thunkAPI) => {
    try {
      console.log(formData);
      return await ArticleServices.createArticle(formData);
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

// Delete Article
export const deleteArticle = createAsyncThunk(
  "article/delete",
  async (id, thunkAPI) => {
    try {
      return await ArticleServices.deleteArticle(id);
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

// Get All Articles
export const getAllArticles = createAsyncThunk(
  "article/all",
  async (_, thunkAPI) => {
    try {
      return await ArticleServices.getAllArticles();
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

// Get Single Article
export const ArticleDetails = createAsyncThunk(
  "article/details",
  async (id, thunkAPI) => {
    try {
      return await ArticleServices.ArticleDetails(id);
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

// Update Single Article
export const updateArticle = createAsyncThunk(
  "article/update",
  async (formData, thunkAPI) => {
    try {
      return await ArticleServices.updateArticle(formData);
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

// Add Section To Article
export const AddSectionToArticls = createAsyncThunk(
  "article/add/section",
  async ({ sectionId, formData }, thunkAPI) => {
    try {
      return await ArticleServices.AddSectionToArticls(sectionId, formData);
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

// delete Section From Article
export const DeleteSectionFromArticls = createAsyncThunk(
  "article/delete/section",
  async ({ articleId, sectionId, formData }, thunkAPI) => {
    try {
      return await ArticleServices.DeleteSectionFromArticles(
        articleId,
        sectionId,
        formData
      );
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

const ArticleSlice = createSlice({
  name: "article",
  initialState,
  extraReducers: (builder) => {
    builder
      // create Article
      .addCase(createArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createArticle.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(i18n.t("Article created successfully"));
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      })

      // delete Article
      .addCase(deleteArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(i18n.t("Article deleted successfully"));
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      })

      // get all Articles
      .addCase(getAllArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Articles = action.payload;
      })
      .addCase(getAllArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      })

      // get  Article
      .addCase(ArticleDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ArticleDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Article = action?.payload;
      })
      .addCase(ArticleDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      })

      // update Article
      .addCase(updateArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(i18n.t("Article updated successfully"));
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      })

      // Add sections to Article
      .addCase(AddSectionToArticls.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddSectionToArticls.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(i18n.t("Section Added successfully"));
      })
      .addCase(AddSectionToArticls.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      })

      // delete sections to Article
      .addCase(DeleteSectionFromArticls.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteSectionFromArticls.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(i18n.t("Section Deleted successfully"));
      })
      .addCase(DeleteSectionFromArticls.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      });
  },
});

export const selectIsLoading = (state) => state.article.isLoading;
export const selectAllArticles = (state) => state.article.Articles;
export const selectArticle = (state) => state.article.Article;
export default ArticleSlice.reducer;
