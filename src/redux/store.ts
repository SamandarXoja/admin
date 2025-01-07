import treeReducer from "./slice/treeSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    counter: treeReducer,
  },
});
