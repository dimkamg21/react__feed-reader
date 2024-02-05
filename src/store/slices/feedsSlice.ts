import { Feed } from "../../types/Feed.ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataFromXML } from "../../helpers/getDataFromXML.ts";

const key = "feeds";

interface feedsSlice {
  feeds: Feed[];
}

const initialState: feedsSlice = {
  feeds: [],
};

export const feedsSlice = createSlice({
  name: key,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInitialFeeds.fulfilled, (state, action) => {
      state.feeds = action.payload || [];
    });
  },
});

export const fetchInitialFeeds = createAsyncThunk(
  "feeds/fetchInitialFeeds",
  async () => {
    try {
      const xmlData: Feed[] = await getDataFromXML(
        "https://www.nasa.gov/news-release/feed/",
      );

      return xmlData;
    } catch (error) {
      console.error("Error fetching initial feeds:", error);
    }
  },
);

export default feedsSlice.reducer;
