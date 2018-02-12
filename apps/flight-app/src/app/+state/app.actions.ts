export interface IncreaseBy {
  type: 'INCREASE_BY';
  payload: {amount: number};
}

export interface LoadData {
  type: 'LOAD_DATA';
  payload: {};
}

export interface DataLoaded {
  type: 'DATA_LOADED';
  payload: {};
}

export type AppAction = LoadData | DataLoaded | IncreaseBy;
