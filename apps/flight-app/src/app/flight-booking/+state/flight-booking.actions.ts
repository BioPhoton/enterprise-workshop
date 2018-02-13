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


export interface SaveFlight {
  type: 'SAVE_FLIGHT';
  payload: {
    isFlightPending: boolean,
    flight: Flight,
    oldFlight: Flight
  };
}

export interface FlightSaved {
  type: 'FLIGHT_SAVED';
  payload: {
    flight: Flight,
    isFlightPending: boolean
  };
}

export interface FlightError {
  type: 'FLIGHT_ERROR';
  payload: {
    isFlightPending: boolean,
    errorMessage: string,
    flight: Flight
  };
}

export type FlightBookingAction = LoadFlights | FlightsLoaded | FlightsError | SaveFlight | FlightSaved | FlightError;
