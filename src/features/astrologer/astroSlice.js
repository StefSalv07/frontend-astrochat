import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllAstrologers, getAstrologerById } from "./astroApi";

const initialState = {
  astrologers: [],
  loading: false,
  errorMessage: null,
};

export const getAllAstrologersAsync = createAsyncThunk(
  "astro/getAllAstrologers",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllAstrologers();
      // console.log("astoSlice getAll data:", data.data);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAstrologerByIdAsync = createAsyncThunk(
  "astro/getAstrologerById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getAstrologerById(id);
      // console.log("astoSlice getAsto data:", data.data);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const astrologerSlice = createSlice({
  name: "astro",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //handle getAllAstrologersAsync

      .addCase(getAllAstrologersAsync.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getAllAstrologersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.astrologers = action.payload;
      })
      .addCase(getAllAstrologersAsync.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })

      //handle getAstrologerByIdAsync

      .addCase(getAstrologerByIdAsync.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getAstrologerByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.astrologers = action.payload;
      })
      .addCase(getAstrologerByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

export default astrologerSlice.reducer;
export const selectAstrologers = (state) => state.astro.astrologers;
export const selectError = (state) => state.astro.errorMessage;
export const selectLoading=(state)=>state.astro.loading
