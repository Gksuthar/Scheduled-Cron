import { configureStore } from '@reduxjs/toolkit';
import cronReducer from './reducers/CronReducer.js';

export const store = configureStore({
  reducer: {
    cron: cronReducer,
  },
});
