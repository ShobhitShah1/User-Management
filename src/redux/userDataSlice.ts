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

// createAsyncThunk will handle API with pagination. get page value from state and pass to `getUserData`
export const fetchUsers = createAsyncThunk<
  UserList[],
  void,
  {state: RootState; rejectValue: string}
>('users/fetchUsers', async (_, {getState, rejectWithValue}) => {
  const {page} = getState().users;
  try {
    // API service to handel API's
    const response = await getUserData(page);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// export const fetchUsers = createAsyncThunk<
//   UserList[],
//   number,
//   {state: RootState; rejectValue: string}
// >('users/fetchUsers', async (page, {rejectWithValue}) => {
//   try {
//     const response = await getUserData(page);
//     return response;
//   } catch (error: any) {
//     return rejectWithValue(error.message);
//   }
// });

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // set page +1
    incrementPage(state) {
      state.page += 1;
    },
    // reset user data and start page with 1
    resetPage(state) {
      // state.users = [];
      state.page = 1;
    },
  },
  extraReducers: builder => {
    // Make loader true when fetching data
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      // Push new data to state when API success (if user refresh it will store only action data it will clear old data and start with fresh data)
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<UserList[]>) => {
          state.users =
            state.page === 1
              ? [...action.payload]
              : [...state.users, ...action.payload];
          state.loading = false;
        },
      )
      // throw error
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

export const {incrementPage, resetPage} = userSlice.actions;
export default userSlice.reducer;
