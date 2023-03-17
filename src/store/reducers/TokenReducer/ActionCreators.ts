import { AxiosEndpoints } from '../../../enums/axios-router';
import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http';
import { TokenResponse } from './Interfaces';

export const getToken = createAsyncThunk('users/getToken', async (_, thunkAPI) => {
  try {
    const response = await $api.get<TokenResponse>(`${AxiosEndpoints.Token}`);

    if (response.data.success) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue('не удалось получить токен');
  }
});
