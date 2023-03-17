import { IAxiosResponse } from './../../../helpers/Interfaces/index';
export interface UsersState {
  users: IUser[];
  isLoading: boolean;
  errorOnCreateUser: string;
  errorOnGetUsers: string;
  page: number;
  count: number;
  isLastPage: boolean;
  isUserAuth: boolean;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: number;
  registration_timestamp: number;
  photo: string;
}

export interface IUsers extends IAxiosResponse {
  users: Array<IUser>;
}

export interface IUserResponse extends IAxiosResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: number;
  registration_timestamp: number;
  photo: string;
}

export interface IGetUsers {
  page: number;
  count: number;
}

export interface ICreateUser {
  formData: any;
  token: string;
}
