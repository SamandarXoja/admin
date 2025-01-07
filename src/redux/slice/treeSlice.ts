import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    allClass: [
      {
        title: "Общий1",
        path: "/",
      },
    ],
  },
  reducers: {
    addClass: (state, action) => {
      state.allClass.push(action.payload);
    },
  },
});

export const { addClass } = counterSlice.actions;

export default counterSlice.reducer;
