import { IPositions, PositionsState } from './Interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPositions } from './ActionCreators';

const initialState: PositionsState = {
  positions: [],
  isLoading: false,
  error: '',
};

export const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {},
  extraReducers: {
    // get positions
    [getPositions.fulfilled.type]: (state, action: PayloadAction<IPositions>) => {
      state.isLoading = false;
      state.positions = action.payload.positions;
    },
    [getPositions.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getPositions.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default positionsSlice.reducer;
