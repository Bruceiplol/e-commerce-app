import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../api/product";

export const displayProducts = createAsyncThunk(
  "product/display",
  async (thunkAPI) => {
    try {
      const res = await getProducts();
      console.log(res)
      return res;
    } catch (err) {
      throw err;
    }
  }
);

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(displayProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload
      })
      .addCase(displayProducts.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(displayProducts.rejected, (state, action) => {
        state.status = "failure";
        state.error = action.error.message;
      })
  },
});

export default productSlice.reducer;