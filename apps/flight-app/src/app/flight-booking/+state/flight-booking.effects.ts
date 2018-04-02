import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {DataPersistence} from '@nrwl/nx';
import 'rxjs/add/operator/switchMap';
import {of} from 'rxjs/observable/of';
import {LoadFlights, SaveFlight} from './flight-booking.actions';
import {FlightBookingState} from './flight-booking.interfaces';
import {FlightService} from '@flight-workspace/flight-api';
import {map, startWith, tap} from 'rxjs/operators';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {FlightSearchComponent} from '../flight-search/flight-search.component';

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

  /*
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
  */

  @Effect()
  saveFlight = this.dataPersistence.optimisticUpdate('SAVE_FLIGHT', {

    run: (action: SaveFlight, state: FlightBookingState) => {

      return this.flightService
        .save(action.payload.flight)
        .pipe(
          map(flight => (
              {
                type: 'FLIGHT_SAVED',
                payload: {flight, isFlightPending: false}
              }
            )
          ),
          startWith({
            type: 'FLIGHT_SAVED',
            payload: {flight: action.payload.flight, isFlightPending: false}
          }),
          tap(x => this.router.navigate(['./flight-booking/flight-search']))
        );
    },

    undoAction: (action: SaveFlight, error: any) => {
      this.router.navigate(['./flight-booking/flight-edit/'+action.payload.oldFlight.id]);
      return {
        type: 'FLIGHT_ERROR',
        payload: {
          errorMessage: error.message,
          isFlightPending: false,
          flight: action.payload.oldFlight
        }
      };
    }

  });

  @Effect()
  navigateFlights = this.dataPersistence.navigation(FlightSearchComponent, {
    run: (a: ActivatedRouteSnapshot, state: FlightBookingState) => {
      console.log(a)
      return {
        type: 'LOAD_FLIGHTS',
        payload: {from: a.params.from || '', to: a.params.to || '', isFlightPending: true}
      };
    },
    onError: (a: ActivatedRouteSnapshot, e: any) => {
      // we can log and error here and return null
      // we can also navigate back
      return null;
    }
  });

  constructor(private actions: Actions,
              private router: Router,
              private dataPersistence: DataPersistence<FlightBookingState>,
              private flightService: FlightService) {

  }

}
