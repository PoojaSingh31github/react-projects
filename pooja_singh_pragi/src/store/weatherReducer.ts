import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface WeatherState {
  data: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  forecast: any;
  error: string | null; // To store error message
}

const initialState: WeatherState = {
  data: null,
  status: 'idle',
  forecast: null,
  error: null, // Initialize error as null
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
      );
      return response.data;
    } catch (error: any) {
      // Return error message to the reducer
      return rejectWithValue(error.response?.data?.message || "Something went wrong!");
    }
  }
);

export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async (city: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
      );
      return response.data;
    } catch (error: any) {
      // Return error message to the reducer
      return rejectWithValue(error.response?.data?.message || "Something went wrong!");
    }
  }
);


const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWeather.pending, state => {
        state.status = 'loading';
        state.error = null; // Reset any previous errors
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; // Store the error message
      })
      .addCase(fetchForecast.pending, state => {
        state.status = 'loading';
        state.error = null; // Reset any previous errors
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forecast = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; // Store the error message
      });
  },
});

export default weatherSlice.reducer;
