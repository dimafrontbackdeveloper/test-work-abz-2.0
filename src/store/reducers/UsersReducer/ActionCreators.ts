import { AxiosEndpoints } from '../../../enums/axios-router';
import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http';
import { ICreateUser, IGetUsers, IUser, IUserResponse, IUsers } from './Interfaces';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async ({ page, count }: IGetUsers, thunkAPI) => {
    try {
      const response = await $api.get<IUsers>(
        `${AxiosEndpoints.Users}?page=${page}&count=${count}`,
      );

      if (response.data.success) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('не удалось получить пользователей');
    }
  },
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async ({ formData, token }: ICreateUser, thunkAPI) => {
    try {
      const response = await $api.post<IUserResponse>(`${AxiosEndpoints.Users}`, formData, {
        headers: {
          Token: token,
        },
      });

      if (response.data.success) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('не удалось создать пользователя');
    }
  },
);
