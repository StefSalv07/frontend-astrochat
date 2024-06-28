import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  guestSignIn,
  astrologerSignIn,
  astrologerSignUp,
  guestOtpVerify,
  checkAuth,
  google,
  signOut,
  userSignUp,
  userSignIn,
} from "./authApi";

const initialState = {
  user: [],
  loading: false,
  errorMessage: null,
  guestSignInError: null,
  astroSignUpError: null,
  atsroSignInError: null,
  userSignInError: null,
  isLoggedIn: false,
};

export const guestSignInAsync = createAsyncThunk(
  "auth/guestSignIn",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await guestSignIn(formData);
      // console.log("auth slice data",data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const astrologerSignInAsync = createAsyncThunk(
  "auth/astrologerSignIn",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await astrologerSignIn(formData);
      console.log("auth slice data", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const guestOtpVerifyAsync = createAsyncThunk(
  "auth/guestOtpVerify",
  async ({ otp }, { rejectWithValue }) => {
    try {
      const data = await guestOtpVerify(otp);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const astrologerSignUpAsync = createAsyncThunk(
  "auth/astrologerSignUp",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await astrologerSignUp(formData);
      // console.log("auth slice stri signup data",data);
      return data; //required data.data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuthAsync = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const data = await checkAuth();
      console.log("auth slice checkAuth data", data.data);
      return data.data; //required data.data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const googleAsync = createAsyncThunk(
  "auth/google",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await google(formData);
      console.log("authSlice google data", data.data);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOutAsync = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      const data = await signOut();
      console.log("authSlice signout data:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSignUpAsync = createAsyncThunk(
  "auth/userSignUp",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await userSignUp(formData);
      console.log("authSlice userSignUP data:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSignInAsync = createAsyncThunk(
  "auth/userSignIn",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await userSignIn(formData);
      console.log("authSlice userSignIn data:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //when update the user
    setUser(state, action) {
      state.user = action.payload;
    },
    //when delete the user
    clearUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder

      //handle guestSignInAsync
      .addCase(guestSignInAsync.pending, (state) => {
        state.loading = true;
        state.guestSignInError = null;
      })
      .addCase(guestSignInAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.guestSignInError = null;
      })
      .addCase(guestSignInAsync.rejected, (state, action) => {
        state.loading = false;
        state.guestSignInError = action.payload;
      })

      //handle astrologerSignInAsync
      .addCase(astrologerSignInAsync.pending, (state) => {
        state.loading = true;
        state.atsroSignInError = null;
      })
      .addCase(astrologerSignInAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.atsroSignInError = null;
        state.user = action.payload;
      })
      .addCase(astrologerSignInAsync.rejected, (state, action) => {
        state.loading = false;
        state.atsroSignInError = action.payload;
      })

      //handle guestOtpVerifyAsync
      .addCase(guestOtpVerifyAsync.pending, (state) => {
        state.loading = true;
        state.guestSignInError = null;
      })
      .addCase(guestOtpVerifyAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.guestSignInError = null;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(guestOtpVerifyAsync.rejected, (state, action) => {
        state.loading = false;
        state.guestSignInError = action.payload;
      })

      // Handle astrologerSignUpAsync
      .addCase(astrologerSignUpAsync.pending, (state) => {
        state.loading = true;
        state.astroSignUpError = null;
      })
      .addCase(astrologerSignUpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.astroSignUpError = null;
      })
      .addCase(astrologerSignUpAsync.rejected, (state, action) => {
        state.loading = false;
        state.astroSignUpError = action.payload;
      })

      //handle checkAuthAsync
      .addCase(checkAuthAsync.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.loading = false;
      })

      //handle googleAsync
      .addCase(googleAsync.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(googleAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.errorMessage = null;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(googleAsync.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.errorMessage = action.payload;
      })

      //handle signOutAsync
      .addCase(signOutAsync.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.errorMessage = null;
        state.user = [];
        state.isLoggedIn = false;
      })
      .addCase(signOutAsync.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload || "Sign out failed";
      })

      //handle userSignUpAsync
      .addCase(userSignUpAsync.pending, (state) => {
        state.loading = true;
        state.userSignInError = null;
      })
      .addCase(userSignUpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userSignInError = null;
        state.user = [];
        state.isLoggedIn = false;
      })
      .addCase(userSignUpAsync.rejected, (state, action) => {
        state.loading = false;
        state.userSignInError = action.payload || "Sign up failed";
      })

      //handle userSignInAsync
      .addCase(userSignInAsync.pending, (state) => {
        state.loading = true;
        state.userSignInError = null;
      })
      .addCase(userSignInAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userSignInError = null;
        state.user = action.payload.data;
        state.isLoggedIn = true;
      })
      .addCase(userSignInAsync.rejected, (state, action) => {
        state.loading = false;
        state.userSignInError = action.payload || "Sign up failed";
      });
  },
});

export default authSlice.reducer;
export const { setUser, clearUser } = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.user;

export const selectGuestSignInError = (state) => state.auth.guestSignInError;
export const selectAstroSignUpError = (state) => state.auth.astroSignUpError;
export const selectAtsroSignInError = (state) => state.auth.atsroSignInError;
export const selectUserSignInError = (state) => state.auth.userSignInError;

export const selectError = (state) => state.auth.errorMessage;
export const selectLoading = (state) => state.auth.loading;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
