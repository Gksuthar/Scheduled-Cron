import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Thunk to fetch cron records
export const fetchCrons = createAsyncThunk(
  'Crons/getAllCronsData',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://scheduled-cron-backend.onrender.com/api/Crons/getAllCronsData/'); 
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Fetch failed");
    }
  }
);

const cronSlice = createSlice({
  name: 'cron',
  initialState: {
    crons: [],
    loading: false,
    error: null,
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCrons.fulfilled, (state, action) => {
        state.loading = false;
        state.crons = action.payload;
      })
      .addCase(fetchCrons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cronSlice.reducer;
