import { AxiosEndpoints } from '../../../enums/axios-router';
import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http';
import { IPositions } from './Interfaces';

export const getPositions = createAsyncThunk('positions/getPositions', async (_, thunkAPI) => {
  try {
    const response = await $api.get<IPositions>(`${AxiosEndpoints.Positions}`);

    if (response.data.success) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue('не удалось получить позиции');
  }
});
