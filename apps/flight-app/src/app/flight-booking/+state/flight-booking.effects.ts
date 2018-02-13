import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {DataPersistence} from '@nrwl/nx';
import 'rxjs/add/operator/switchMap';
import {of} from 'rxjs/observable/of';
import {LoadFlights} from './flight-booking.actions';
import {FlightBookingState} from './flight-booking.interfaces';
import {FlightService} from '@flight-workspace/flight-api';

@Injectable()
export class FlightBookingEffects {
  @Effect()
  loadFlights = this.dataPersistence.fetch('LOAD_FLIGHTS', {

    run: (action: LoadFlights, state: FlightBookingState) => {
      return this.flightService
        .find(action.payload.from, action.payload.to, action.payload.urgent)
        .map(
          (flights) => {
            return {
              type: "FLIGHTS_LOADED",
              payload: {flights, isFlightsPending: false}
            }
          });
    },

    onError: (action: LoadFlights, error) => {
      console.error('Error', error);
      return of({
        type: 'FLIGHT_ERROR',
        payload: {isFlightsPending: false, error: 'Some Error'}
      })
    }
  });

  constructor(private actions: Actions,
              private dataPersistence: DataPersistence<FlightBookingState>,
              private flightService: FlightService) {

  }
}
