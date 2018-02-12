
import {createSelector} from '@ngrx/store';
import {App, AppState} from './app.interfaces';

// Selectors are our DB queries

export function getAppState(s: AppState): App {
  return s.app
}

export const getCount = createSelector(
  getAppState,
  (state: App) => state.count
)
