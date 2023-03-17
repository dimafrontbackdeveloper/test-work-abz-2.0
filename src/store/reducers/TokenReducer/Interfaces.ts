import { IAxiosResponse } from '../../../helpers/Interfaces';

export interface TokenState {
  isLoading: boolean;
  error: string;
  token: string;
}

export interface TokenResponse extends IAxiosResponse {
  token: string;
}
