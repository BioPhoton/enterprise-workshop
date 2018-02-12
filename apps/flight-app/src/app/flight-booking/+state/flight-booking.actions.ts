import {Flight} from '@flight-workspace/flight-api';

export interface LoadFlights {
  type: 'LOAD_FLIGHTS';
  payload: {};
}

export interface FlightsLoaded {
  type: 'FLIGHTS_LOADED';
  payload: { flights: Flight[] };
}

export type FlightBookingAction = LoadFlights | FlightsLoaded;
