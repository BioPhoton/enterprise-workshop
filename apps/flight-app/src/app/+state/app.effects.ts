import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import 'rxjs/add/operator/switchMap';
import { AppState } from './app.interfaces';
import {LoadFlights} from '../flight-booking/+state/flight-booking.actions';

@Injectable()
export class AppEffects {
  @Effect()
  loadData = this.dataPersistence.fetch('LOAD_FLIGHTS', {
    run: (action: LoadFlights, state: AppState) => {
      return {
        type: 'FLIGHTS_LOADED',
        payload: {}
      };
    },

    onError: (action: LoadFlights, error) => {
      console.error('Error', error);
    }
  });

  constructor(private actions: Actions, private dataPersistence: DataPersistence<AppState>) {}
}
