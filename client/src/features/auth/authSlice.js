import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, checkUser, logout, resetPasswordRequest } from "./authAPI";

const initialState = {
  userLoggedIn: null,
  status: "idle",
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "users/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "users/checkUser",
  async (logInInfo, { rejectWithValue }) => {
    try {
      const response = await checkUser(logInInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);

export const resetPasswordRequestAsync = createAsyncThunk(
  "users/resetPasswordRequest",
  async (email) => {
    try {
      const response = await resetPasswordRequest(email);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//logout
export const logoutAsync = createAsyncThunk(
  "users/logout",
  async (logInInfo) => {
    const response = await logout(logInInfo);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      //creating user
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userLoggedIn = action.payload;
      })

      // check user
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userLoggedIn = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })

      //logout user
      .addCase(logoutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userLoggedIn = null;
      })

      //reset password
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.mailSent = true;
      });

    //
  },
});

export const selectUserLoggedIn = (state) => state.auth.userLoggedIn;
export const { increment } = authSlice.actions;
export const selectCheckUser = (state) => state.auth.checkUser;
export const selectError = (state) => state.auth.error;
export const selectMailSent = (state) => state.auth.mailSent;

export default authSlice.reducer;
