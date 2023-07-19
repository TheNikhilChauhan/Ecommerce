import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCartItems,
  fetchItemsByUserId,
  updateCart,
  resetCart,
} from "./cartAPI";

const initialState = {
  status: "idle",
  items: [],
  selectedIndex: null,
};

//Add to cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

//fetching items by ID
export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async (userId) => {
    const response = await fetchItemsByUserId(userId);

    return response.data;
  }
);

//update cart
export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);

//delete cart items
export const deleteCartItemsAsync = createAsyncThunk(
  "cart/deleteCartItems",
  async (itemId) => {
    const response = await deleteCartItems(itemId);
    return response.data;
  }
);

//reset cart items
export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId) => {
    const response = await resetCart(userId);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSelectedIndexx: (state, action) => {
      state.selectedIndex = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })

      //fetching items by Id of user
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })

      //update cart
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })

      //delete items from cart
      .addCase(deleteCartItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      })

      //reset items from cart
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const { setSelectedIndex } = cartSlice.actions;

export const selectSelectedIndex = (state) => state.cart.selectedIndex;

export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
