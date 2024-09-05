import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getUserData} from '../services/userService';
import {UserList, UserState} from '../types/interfaces';
import {RootState} from './store';

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  page: 1,
};

export const fetchUsers = createAsyncThunk<
  UserList[],
  number,
  {state: RootState; rejectValue: string}
>('users/fetchUsers', async (page, {rejectWithValue}) => {
  try {
    const response = await getUserData(page);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },
    resetUsers(state) {
      state.users = [];
      state.page = 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<UserList[]>) => {
          state.users = [...state.users, ...action.payload];
          state.loading = false;
        },
      )
      .addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// selectors to retrieve specific pieces of state
export const selectUsers = (state: RootState) => state.users.users;
export const selectLoading = (state: RootState) => state.users.loading;
export const selectError = (state: RootState) => state.users.error;
export const selectPage = (state: RootState) => state.users.page;

export const {incrementPage, resetUsers} = userSlice.actions;
export default userSlice.reducer;
