import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {DataPersistence} from '@nrwl/nx';
import 'rxjs/add/operator/switchMap';
import {of} from 'rxjs/observable/of';
import {LoadFlights, SaveFlight} from './flight-booking.actions';
import {FlightBookingState} from './flight-booking.interfaces';
import {FlightService} from '@flight-workspace/flight-api';
import {map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

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

  @Effect()
  saveFlight = this.dataPersistence.pessimisticUpdate('SAVE_FLIGHT', {
    run: (action: SaveFlight, state: FlightBookingState) => {
      console.log(`Action: SAVE_FLIGHT. action ${action}, state ${state}`)
      return this.flightService.save(action.payload.flight)
        .pipe(
          tap(x => this.router.navigate(['./flight-booking/flight-search'])),
          map(flight => (
            {
              type: 'FLIGHT_SAVED',
              payload: {flight, isFlightPending: false}
            }
          )
        )
        );
    },

    onError: (action: SaveFlight, error: any) => {
      console.log(`Action: SAVE_FLIGHT. action ${action}, error ${error}`)

      return {
        type: 'FLIGHT_ERROR',
        payload: {errorMessage: error.message, isFlightPending: false}
      };
    }

  });

  constructor(private actions: Actions,
              private router: Router,
              private dataPersistence: DataPersistence<FlightBookingState>,
              private flightService: FlightService) {

  }

}
