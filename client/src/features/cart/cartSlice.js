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
  cartLoaded: false,
};

//Add to cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item, toast) => {
    console.log("async item", item);
    const response = await addToCart(item);
    console.log("res", response);
    toast.success("Item Added To Cart");
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
    setSelectedIndex: (state, action) => {
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
        console.log("state item:", state.items);
      })

      //fetching items by Id of user
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
        state.cartLoaded = true;
      })
      .addCase(fetchItemsByUserIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.cartLoaded = true;
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
export const selectCartLoader = (state) => state.cart.cartLoaded;

export default cartSlice.reducer;
