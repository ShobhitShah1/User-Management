import {configureStore} from '@reduxjs/toolkit';
import userDataSlice from './userDataSlice';
import {thunk} from 'redux-thunk';

export const store = configureStore({
  reducer: {
    users: userDataSlice,
  },
  // redux-toolkit use redux-thunk as middleware by default (we can still give redux-thunk as a middleware)
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
