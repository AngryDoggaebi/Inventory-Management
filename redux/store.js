import { configureStore } from '@reduxjs/toolkit';
import {
  SelectedDateSlice,
  formattedTodaySlice,
  formattedYesterdaySlice,
} from './date';

export default configureStore({
  reducer: {
    SelectedDateSlice: SelectedDateSlice.reducer,
    formattedTodaySlice: formattedTodaySlice.reducer,
    formattedYesterdaySlice: formattedYesterdaySlice.reducer,
  },
});
