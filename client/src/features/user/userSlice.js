import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserOrders, fetchLoggedInUser, updateUser } from "./userAPI";

const initialState = {
  orders: [],
  status: "idle",
  userInfo: null,
};

export const fetchUserOrdersAsync = createAsyncThunk(
  "user/fetchUserOrders",
  async (id) => {
    const response = await fetchUserOrders(id);

    return response.data;
  }
);

// fetch logged in users
export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async (id) => {
    const response = await fetchLoggedInUser(id);

    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},

  extraReducers: (builder) => {
    builder
      //fetching the orders of the current user
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload;
      })

      //fetch user who are logged in
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })

      // update user
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.user.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;

export default userSlice.reducer;
