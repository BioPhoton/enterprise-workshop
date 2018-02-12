import { App } from './app.interfaces';
import { AppAction } from './app.actions';

export function appReducer(state: App, action: AppAction): App {
  switch (action.type) {
    case 'DATA_LOADED': {
      return { ...state, ...action.payload };
    }
    case 'INCREASE_BY': {
      return { ...state, count: (state.count + action.payload.amount) }
    }
    default: {
      return state;
    }
  }
}
