import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './homeSlice';

const playlistSlice = createSlice({
  name: 'playlistSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {},
});

export const playlistSliceActions = playlistSlice.actions;

export default playlistSlice;
