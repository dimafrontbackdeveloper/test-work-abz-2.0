import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers, createUser } from './ActionCreators';
import { IUsers, UsersState } from './Interfaces';

const initialState: UsersState = {
  users: [],
  isLoading: false,
  errorOnCreateUser: '',
  errorOnGetUsers: '',
  page: 1,
  count: 6,
  isLastPage: false,
  isUserAuth: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    setIsLastPageFalse: (state) => {
      state.isLastPage = false;
    },

    setEmptyUserArray: (state) => {
      state.users = [];
    },
  },
  extraReducers: {
    // get users
    [getUsers.fulfilled.type]: (state, action: PayloadAction<IUsers>) => {
      state.isLastPage = action.payload.users.length < state.count ? true : false;
      state.isLoading = false;
      state.users = [...state.users, ...action.payload.users].sort((a, b) => {
        if (a.registration_timestamp > b.registration_timestamp) {
          return -1;
        }
        if (a.registration_timestamp < b.registration_timestamp) {
          return 1;
        }
        return 0;
      });
    },
    [getUsers.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorOnGetUsers = action.payload;
    },

    // create user
    [createUser.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.isUserAuth = true;
    },
    [createUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorOnCreateUser = action.payload;
    },
  },
});

export default usersSlice.reducer;
