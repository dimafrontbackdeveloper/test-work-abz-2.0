import tokenSlice from './reducers/TokenReducer';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import positionsSlice from './reducers/PositionsReducer';
import usersSlice from './reducers/UsersReducer';

const rootReducer = combineReducers({
  positionsSlice,
  usersSlice,
  tokenSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
