import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import picService from '../service/picService';
export const getUserPic = createAsyncThunk(
  'user/user-pic',
  async (userId, thunkAPI) => {
    try {
      return await picService.getUserPic(userId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const picSlice = createSlice({
  name: 'pic',
  initialState: {
    picUrl: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPic.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
      })
      .addCase(getUserPic.fulfilled, (state, action) => {
        state.picUrl = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getUserPic.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.picUrl = null;
      });
  },
});
export default picSlice.reducer;
