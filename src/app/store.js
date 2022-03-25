import { configureStore } from '@reduxjs/toolkit';
import HomeReducer from '../features/controller/Home';

export const store = configureStore({
  reducer: {
    home: HomeReducer
  },
});
