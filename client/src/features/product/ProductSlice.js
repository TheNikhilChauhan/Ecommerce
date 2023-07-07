import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchFilteredProducts,
  fetchAllBrands,
  fetchAllCategories,
} from "./ProductAPI";

const initialState = {
  products: [],
  category: [],
  brands: [],
  totalPages: 0,
  status: "idle",
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchFilteredProductsAsync = createAsyncThunk(
  "product/fetchFilteredProducts",
  async ({ filter, sort, pagination }) => {
    const response = await fetchFilteredProducts(filter, sort, pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchAllBrands",
  async () => {
    const response = await fetchAllBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchCategoryAsync = createAsyncThunk(
  "product/fetchAllCategories",
  async () => {
    const response = await fetchAllCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })

      //filter
      .addCase(fetchFilteredProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilteredProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })

      //fetch category
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.category = action.payload;
      })

      //fetch brands
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      });
  },
});

export const { increment } = ProductSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectAllCategories = (state) => state.product.category;
export const selectAllBrands = (state) => state.product.brands;
export const selectTotalPages = (state) => state.product.totalPages;

export default ProductSlice.reducer;
