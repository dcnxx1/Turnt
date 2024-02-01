import {createSlice} from '@reduxjs/toolkit';

export const initialState = {};

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState: {},
  reducers: {},
  extraReducers: builder => {},
});

export const homeSliceActions = homeSlice.actions;

export default homeSlice;
