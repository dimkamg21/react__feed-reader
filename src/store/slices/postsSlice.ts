import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { localStorageService } from "../../helpers/localStorageService.ts";
import { Post } from "../../types/Post.ts";
import { getDataFromJSON } from "../../helpers/getDataFromJSON.ts";

const key = "posts";

interface postsState {
  posts: Post[];
}

const initialState: postsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: key,
  initialState,
  reducers: {
    addNewPost: (state, action: PayloadAction<Omit<Post, "id">>) => {
      state.posts.push({
        userId: action.payload.userId || 0,
        id: Date.now(),
        title: action.payload.title,
        body: action.payload.body,
      });

      localStorageService.setLocalStorageData(key, state.posts);
    },

    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      localStorageService.setLocalStorageData(key, state.posts);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchInitialPosts.fulfilled, (state, action) => {
      state.posts = action.payload || [];
    });
  },
});

export const { addNewPost, removePost } = postsSlice.actions;
export default postsSlice.reducer;

export const fetchInitialPosts = createAsyncThunk(
  "posts/fetchInitialPosts",
  async (userId: number) => {
    try {
      const jsonData: Post[] = (await getDataFromJSON(userId)) || [];
      const localStorageData: Post[] = localStorageService.getLocalStorageData(key) || [];

      const uniqueJsonData = jsonData.filter(jsonPost => {
        return !localStorageData.find(localPost => localPost.id === jsonPost.id);
      });

      const initialPosts = [...localStorageData, ...uniqueJsonData];

      return initialPosts;
    } catch (error) {
      console.error("Error fetching initial posts:", error);
    }
  },
);
