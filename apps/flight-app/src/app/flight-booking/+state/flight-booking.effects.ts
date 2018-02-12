import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { FlightBookingState } from './flight-booking.interfaces';
import {LoadFlights} from './flight-booking.actions';

@Injectable()
export class FlightBookingEffects {
  @Effect()
  loadData = this.dataPersistence.fetch('LOAD_DATA', {
    run: (action: LoadFlights, state: FlightBookingState) => {
      return {
        type: 'LOAD_FLIGHTS',
        payload: {}
      };
    },

    onError: (action: LoadFlights, error) => {
      console.error('Error', error);
    }
  });

  constructor(private actions: Actions, private dataPersistence: DataPersistence<FlightBookingState>) {}
}
