import { createSlice } from '@reduxjs/toolkit';

/** data 리로딩 여부 결정 */
const IsClickedSlice = createSlice({
  name: 'IsClickedSlice',
  initialState: 0,

  reducers: {
    reRandering(initialState) {
      return initialState + 1;
    },
  },
});

export let { reRandering } = IsClickedSlice.actions;

export default IsClickedSlice;
