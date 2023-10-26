import { createSlice } from '@reduxjs/toolkit';

/** 선택한 날짜
 * YYYY-MM-DD
 * @type {string}
 */
export const SelectedDateSlice = createSlice({
  name: 'SelectedDateSlice',
  initialState: `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`,

  reducers: {
    setSelectedDate(state, action) {
      return action.payload.y + '-' + action.payload.m + '-' + action.payload.d;
    },
  },
});

/**
 * format한 오늘 날짜
 * @returns YYYY-MM-DD
 */
export const formattedTodaySlice = createSlice({
  name: 'formattedTodaySlice',
  initialState: `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`,

  reducers: {
    setToday: () => {
      return `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`;
    },
  },
});

/**
 * format한 어제 날짜
 * @returns YYYY-MM-DD
 */
export const formattedYesterdaySlice = createSlice({
  name: 'formattedYesterdaySlice',
  initialState: `${new Date(
    new Date().setDate(new Date().getDate() - 1),
  ).getFullYear()}-${
    new Date(new Date().setDate(new Date().getDate() - 1)).getMonth() + 1
  }-${new Date(new Date().setDate(new Date().getDate() - 1)).getDate()}`,

  reducers: {
    setYesterday: () => {
      const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
      const formattedyesterday = `${yesterday.getFullYear()}-${
        yesterday.getMonth() + 1
      }-${yesterday.getDate()}`;

      return formattedyesterday;
    },
  },
});

export const { setSelectedDate } = SelectedDateSlice.actions;
export const { setToday } = formattedTodaySlice.actions;
export const { setYesterday } = formattedYesterdaySlice.actions;
