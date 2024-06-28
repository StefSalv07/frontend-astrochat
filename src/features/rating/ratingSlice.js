import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addRating, getRatingByAstrologerId } from "./ratingApi";

const initialState = {
  ratings: [],
  loading: false,
  errorMessage: null,
};

export const addRatingAsync = createAsyncThunk(
  "rate/addRating",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await addRating(formData);
      console.log("ratingSlice addRating data:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getRatingByAstrologerIdAsync = createAsyncThunk(
  "rate/getRatingByAstrologerId",
  async ({ astroId }, { rejectWithValue }) => {
    try {
      const data = await getRatingByAstrologerId(astroId);
      console.log("ratingSlice getRating data:", data.data);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ratingSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle addRatingAsync
      .addCase(addRatingAsync.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(addRatingAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings.push(action.payload);
      })
      .addCase(addRatingAsync.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.ratings=[];
      })

      // Handle getRatingByAstrologerIdAsync
      .addCase(getRatingByAstrologerIdAsync.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getRatingByAstrologerIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings = action.payload;
      })
      .addCase(getRatingByAstrologerIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.ratings=[];
      });
  },
});

export default ratingSlice.reducer;

// Selector functions
export const selectRatings = (state) => state.rate.ratings;
export const selectError = (state) => state.rate.errorMessage;
export const selectLoading = (state) => state.rate.loading;
