import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getToken } from './ActionCreators';
import { TokenResponse, TokenState } from './Interfaces';

const initialState: TokenState = {
  isLoading: false,
  error: '',
  token: '',
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {},
  extraReducers: {
    // get token
    [getToken.fulfilled.type]: (state, action: PayloadAction<TokenResponse>) => {
      state.isLoading = false;
      state.error = '';
      state.token = action.payload.token;
    },
    [getToken.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getToken.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default tokenSlice.reducer;
