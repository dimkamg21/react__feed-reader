import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice.ts";
import feedsReducer from "./slices/feedsSlice.ts";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    feeds: feedsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
