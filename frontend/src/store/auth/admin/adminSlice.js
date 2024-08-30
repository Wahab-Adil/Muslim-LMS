import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AdminServices from "./adminService";
import { toast } from "react-toastify";

const initialState = {
  adminProfile: null,
  allUsers: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// getting Admin Profile
export const getAdminProfile = createAsyncThunk(
  "admin/profile",
  async (_, thunkAPI) => {
    try {
      return await AdminServices.getAdminProfile();
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
// getting All Users
export const getAllUsers = createAsyncThunk(
  "admin/all/users",
  async (_, thunkAPI) => {
    try {
      return await AdminServices.getAllUsers();
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

// Update User Role
export const updateUserRole = createAsyncThunk(
  "admin/update/user/role",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await AdminServices.updateUserRole(id, formData);
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

// Delete User From list of Users
export const deleteUser = createAsyncThunk(
  "admin/remove/user",
  async (id, thunkAPI) => {
    try {
      return await AdminServices.deleteUser(id);
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

const AdminSlice = createSlice({
  name: "admin",
  initialState,
  extraReducers: (builder) => {
    builder

      // getting Admin Profile
      .addCase(getAdminProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.adminProfile = action.payload;
      })
      .addCase(getAdminProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // getting All Users Details
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Update User Role
      .addCase(updateUserRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserRole.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("User Role Updated successfully");
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // update Article Review
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("User Removed successfully");
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state?.admin?.isLoading;
export const selectAdminProfile = (state) => state?.admin?.adminProfile;
export default AdminSlice.reducer;
