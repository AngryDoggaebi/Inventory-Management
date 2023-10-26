import { configureStore } from '@reduxjs/toolkit';
import IsClickedSlice from './daily';
import {
  SelectedDateSlice,
  formattedTodaySlice,
  formattedYesterdaySlice,
} from './date';

export default configureStore({
  reducer: {
    IsClickedSlice: IsClickedSlice.reducer,
    SelectedDateSlice: SelectedDateSlice.reducer,
    formattedTodaySlice: formattedTodaySlice.reducer,
    formattedYesterdaySlice: formattedYesterdaySlice.reducer,
  },
});
