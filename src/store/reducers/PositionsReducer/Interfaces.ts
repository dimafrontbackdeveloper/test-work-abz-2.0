import { IAxiosResponse } from './../../../helpers/Interfaces/index';
export interface PositionsState {
  positions: IPosition[];
  isLoading: boolean;
  error: string;
}

export interface IPosition {
  id: number;
  name: string;
}

export interface IPositions extends IAxiosResponse {
  positions: Array<IPosition>;
}
