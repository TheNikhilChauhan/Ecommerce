import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, checkUser, updateUser } from "./authAPI";

const initialState = {
  value: 0,
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
  async (logInInfo) => {
    const response = await checkUser(logInInfo);
    return response.data;
  }
);

//update user details during checkout
export const updateUserAsync = createAsyncThunk(
  "users/updateUser",
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const userSlice = createSlice({
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
        state.error = action.error;
      })

      //update user info
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userLoggedIn = action.payload;
      });
  },
});

export const selectUserLoggedIn = (state) => state.auth.userLoggedIn;
export const { increment } = userSlice.actions;
export const selectCheckUser = (state) => state.auth.checkUser;
export const selectError = (state) => state.auth.error;

export default userSlice.reducer;
