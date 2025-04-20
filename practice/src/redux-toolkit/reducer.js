// redux/userSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/user";

export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
  console.log("inside get user")
  const res = await axios.get(`${API_URL}/allusers`);
  return res.data;
});

export const createUser = createAsyncThunk('users/createUser', async (userData) => {
  const res = await axios.post(`${API_URL}/signup`, userData);
  console.log(res,"craeted usersssssss")
  return res.data; // adjust based on response
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await axios.delete(`${API_URL}/userDelete/${id}`);
  return id;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, userdata }) => {
  const res = await axios.put(`${API_URL}/updateUser/${id}`, userdata);
  return res.data.updatedUser; // adjust based on response
});

const initialState = {
  data: [],
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create User
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
      })

      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
       state.loading = false;
      })

      // Update User
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
      });
  }
});

export default userSlice.reducer;
