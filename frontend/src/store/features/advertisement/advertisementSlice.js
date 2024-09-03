import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import advertisementServices from "./advertisementService";
import { toast } from "react-toastify";
import i18n from "i18next";

const initialState = {
  get_advertisement: null,
  AllAdvertisement: [],
  selectedAdvertisments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create  Advertisement
export const createAdvertisement = createAsyncThunk(
  "/create/advertisement",
  async (advertisement, thunkAPI) => {
    try {
      return await advertisementServices.createAdvertisement(advertisement);
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
// Delete  Advertisement
export const deleteAdvertisement = createAsyncThunk(
  "/delete/advertisement",
  async (id, thunkAPI) => {
    try {
      return await advertisementServices.deleteAdvertisement(id);
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

// get All Advertisement
export const getAllAdvertisement = createAsyncThunk(
  "/all/advertisement",
  async (_, thunkAPI) => {
    try {
      return await advertisementServices.getAllAdvertisement();
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

// get All selected Advertisement
export const getSelectedAdvertisements = createAsyncThunk(
  "/all/selected/advertisement",
  async (_, thunkAPI) => {
    try {
      return await advertisementServices.getSelectedAdvertisements();
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

// get Single Advertisement
export const getSingleAdvertisement = createAsyncThunk(
  "/single/advertisement",
  async (id, thunkAPI) => {
    try {
      return await advertisementServices.getSingleAdvertisement(id);
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

// Update Advertisement
export const updateAdvertisement = createAsyncThunk(
  "/update/advertisement",
  async (formData, thunkAPI) => {
    try {
      return await advertisementServices.updateAdvertisement(formData);
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

// Update Advertisement
export const selectadvertisement = createAsyncThunk(
  "/select/advertisement",
  async (id, thunkAPI) => {
    try {
      return await advertisementServices.selectAdvertisement(id);
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
  name: "advertisement",
  initialState,
  extraReducers: (builder) => {
    builder

      // create Advertisement
      .addCase(createAdvertisement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAdvertisement.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(i18n.t(action?.payload?.message));
      })
      .addCase(createAdvertisement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      })
      // single  Advertisement
      .addCase(getSingleAdvertisement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleAdvertisement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.get_advertisement = action.payload;
        toast.success(i18n.t(action?.payload?.message));
      })
      .addCase(getSingleAdvertisement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      })

      // delete Advertisement
      .addCase(deleteAdvertisement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAdvertisement.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(i18n.t(action?.payload?.message));
      })
      .addCase(deleteAdvertisement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      })

      // update Advertisement
      .addCase(updateAdvertisement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdvertisement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.get_advertisement = action.payload;
        toast.success(i18n.t(action?.payload?.message));
      })
      .addCase(updateAdvertisement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      })

      // get  All Advertisement
      .addCase(getAllAdvertisement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAdvertisement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.AllAdvertisement = action.payload.allAdvertisement;
      })
      .addCase(getAllAdvertisement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      })
      // get  All Selected Advertisement
      .addCase(getSelectedAdvertisements.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSelectedAdvertisements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.selectedAdvertisments = action.payload;
        toast.success(i18n.t(action?.payload?.message));
      })
      .addCase(getSelectedAdvertisements.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      })

      // select  Advertisement
      .addCase(selectadvertisement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(selectadvertisement.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        toast.success(i18n.t(action?.payload?.message));
      })
      .addCase(selectadvertisement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(i18n.t(action.payload));
      });
  },
});

export const selectIsLoading = (state) => state.videoCategory.isLoading;
export const selectAllAdvertisement = (state) =>
  state.advertisement.AllAdvertisement;
export const selectAllSelectedAdvertisments = (state) =>
  state.advertisement.selectedAdvertisments;
export const getAdvertisement = (state) =>
  state.advertisement.get_advertisement;

export default Video_CategorySlice.reducer;
