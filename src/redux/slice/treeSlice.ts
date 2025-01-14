import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategoryMaterialData = createAsyncThunk(
  "categories/fetchCategoryMaterialData",

  async (categoryId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No auth token");
      }

      const response = await axios.get(
        `http://147.45.107.174:5000/api/material/materialCgId/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    allClass: [
      {
        title: "Общий1",
        path: "/",
      },
    ],
    selectedCategoryId: null,
    categoryData: [],
  },
  reducers: {
    addClass: (state, action) => {
      state.allClass.push(action.payload);
    },

    setSelectedCategoryId: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryMaterialData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryMaterialData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categoryData = action.payload;
      })
      .addCase(fetchCategoryMaterialData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addClass, setSelectedCategoryId } = counterSlice.actions;

export default counterSlice.reducer;
