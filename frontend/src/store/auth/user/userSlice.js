import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
import { toast } from "react-toastify";
import { t } from "i18next";

const initialState = {
  isAdmin: false,
  isLoggedIn: false,
  userInfo: {},
  userProfile: null,
  Instructor: null,
  playlist: [],
  ArticlePlaylist: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// registering user
export const registerUser = createAsyncThunk(
  "user/register",
  async (formData, thunkAPI) => {
    try {
      return await userService.registerUser(formData);
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

// login user
export const loginUser = createAsyncThunk(
  "user/login",
  async (formData, thunkAPI) => {
    try {
      return await userService.loginUser(formData);
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

// login user
export const userLoginStatus = createAsyncThunk(
  "user/login-status",
  async (_, thunkAPI) => {
    try {
      return await userService.LoginStatus();
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
export const getUserProfile = createAsyncThunk(
  "user/profile",
  async (_, thunkAPI) => {
    try {
      return await userService.getUserProfile();
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

// Instructor Details
export const InstructorDetails = createAsyncThunk(
  "instructor/profile",
  async (instructorId, thunkAPI) => {
    try {
      return await userService.InstructorDetails(instructorId);
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

// user Details
export const deleteUserProfile = createAsyncThunk(
  "user/delete/profile",
  async (_, thunkAPI) => {
    try {
      return await userService.deleteUserProfile();
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

// change Password
export const changePassword = createAsyncThunk(
  "password/change",
  async (formData, thunkAPI) => {
    try {
      return await userService.changePassword(formData);
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

// update Profile
export const updateUserProfile = createAsyncThunk(
  "user/profile/update",
  async (formData, thunkAPI) => {
    try {
      return await userService.updateUserProfile(formData);
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

// update Profile Picture
export const updateUserProfilePicture = createAsyncThunk(
  "update/profile/picture",
  async (Image, thunkAPI) => {
    try {
      return await userService.updateUserProfilePicture(Image);
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

// forget Password
export const forgotPassword = createAsyncThunk(
  "forget/password",
  async (formData, thunkAPI) => {
    try {
      return await userService.forgotPassword(formData);
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
// check Otp
export const checkOtp = createAsyncThunk(
  "check/OTP",
  async (formData, thunkAPI) => {
    try {
      return await userService.checkOtp(formData);
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

// reset Password
export const resetPassword = createAsyncThunk(
  "reset/password",
  async (formData, thunkAPI) => {
    try {
      return await userService.resetPassword(formData);
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

// add to playlist
export const addToPlaylist = createAsyncThunk(
  "add/to/playlist",
  async (id, thunkAPI) => {
    try {
      return await userService.addToPlaylist(id);
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

// Remove From Playlist
export const RemoveFromPlaylist = createAsyncThunk(
  "remove/from/playlist",
  async (courseId, thunkAPI) => {
    try {
      return await userService.RemoveFromPlaylist(courseId);
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

// getting Playlist
export const getPlaylist = createAsyncThunk(
  "get/playlist",
  async (_, thunkAPI) => {
    try {
      return await userService.getPlaylist();
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

// add article to Playlist
export const addArticleToPlayllist = createAsyncThunk(
  "add/article/to/playlist",
  async (id, thunkAPI) => {
    try {
      return await userService.addArticleToPlayllist(id);
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

// remove Article from playlist
export const RemoveArticleFromPlayllist = createAsyncThunk(
  "remove/article/to/playlist",
  async (articleId, thunkAPI) => {
    try {
      return await userService.RemoveArticleFromPlayllist(articleId);
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

// getting Article playlist
export const getArticlePlayllist = createAsyncThunk(
  "get/article/from/playlist",
  async (_, thunkAPI) => {
    try {
      return await userService.getArticlePlayllist();
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

// send Message
export const sendMessage = createAsyncThunk(
  "send/message",
  async (formData, thunkAPI) => {
    try {
      return await userService.sendMessage(formData);
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

const UserSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder

      // registering User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("User Registered Successfull"));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // login User
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userInfo = action.payload.user;
        localStorage.setItem("token", action?.payload?.token);
        state.isAdmin = action.payload?.user?.role;
        localStorage.setItem("IsAdmin", action.payload?.user?.role);
        if (action.payload.token) {
          state.isLoggedIn = true;
          localStorage.setItem("IsLoggedIn", true);
          // localStorage.setItem('UserInfo');
        }
        state.isError = false;
        toast.success(t("Logged In Successfull !"));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isAdmin = false;
        localStorage.setItem("IsLoggedIn", false);
        localStorage.setItem("IsAdmin", false);
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        toast.error(t("Wrong Credentials"));
      })
      // login User
      .addCase(userLoginStatus.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(userLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedIn = action.payload;
      })
      .addCase(userLoginStatus.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isAdmin = false;
        localStorage.setItem("IsLoggedIn", false);
        localStorage.setItem("IsAdmin", false);
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        toast.error(t("Token Expired,Please Logged In to continous"));
      })

      // user Profile
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // Instructor Details
      .addCase(InstructorDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(InstructorDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Instructor = action.payload;
      })
      .addCase(InstructorDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })
      // Delete User Profile
      .addCase(deleteUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("User Deleted successfully"));
      })
      .addCase(deleteUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("password changed successfully"));
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("User Profile updated successfully"));
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // update User Profile Picture
      .addCase(updateUserProfilePicture.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfilePicture.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("User Profile Picture updated successfully"));
      })
      .addCase(updateUserProfilePicture.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // update User Profile Picture
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("password Changed successfully"));
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })
      // update User Profile Picture
      .addCase(checkOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("OTP Verified"));
      })
      .addCase(checkOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })
      // reset password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t(action?.payload?.message));
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // Add to playlist
      .addCase(addToPlaylist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToPlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("Add to Playlist successfully"));
      })
      .addCase(addToPlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // Remove from playlist
      .addCase(RemoveFromPlaylist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RemoveFromPlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("Removed successfully"));
      })
      .addCase(RemoveFromPlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // get playlist
      .addCase(getPlaylist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("playlist Fetched Successfully"));
      })
      .addCase(getPlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // adding article playlist
      .addCase(addArticleToPlayllist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addArticleToPlayllist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("Article Added Successfully"));
      })
      .addCase(addArticleToPlayllist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // remove article from playlist
      .addCase(RemoveArticleFromPlayllist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RemoveArticleFromPlayllist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("Article removed Successfully"));
      })
      .addCase(RemoveArticleFromPlayllist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // getting article playlist
      .addCase(getArticlePlayllist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArticlePlayllist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t("Article Playlist Fetched"));
      })
      .addCase(getArticlePlayllist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(t(action.payload));
      })

      // send message
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(t(action?.payload));
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(t("Something Went Wrong, Message Not Send"));
      });
  },
});
export const selectIsAdmin = (state) => state.user.isAdmin;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserProfile = (state) => state.user.userProfile;
export const selectIsLoading = (state) => state.user.isLoading;
export default UserSlice.reducer;
