import {Flight} from '@flight-workspace/flight-api';
export interface LoadFlights {
  type: 'LOAD_FLIGHTS';
  payload: {from: string, to: string, urgent: boolean, isFlightsPending: boolean};
}

export interface FlightsLoaded {
  type: 'FLIGHTS_LOADED';
  payload: {
    isFlightsPending:boolean,
    flights: Flight[]
  };
}

export interface FlightsError {
  type: 'FLIGHTS_ERROR';
  payload: {
    isFlightsPending:boolean
    //error?: string
  };
}

export type FlightBookingAction = LoadFlights | FlightsLoaded | FlightsError;
