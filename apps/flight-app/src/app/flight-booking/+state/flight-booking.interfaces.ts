import {Flight} from '@flight-workspace/flight-api';
export interface FlightBooking {
  // define state here
  flights: Flight[],
  isFlightsPending: boolean
}

export interface FlightBookingState {
  readonly flightBooking: FlightBooking;
}
