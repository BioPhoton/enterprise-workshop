import {FlightBooking, FlightBookingState} from './flight-booking.interfaces';
import {createSelector} from '@ngrx/store';

// Selectors are our DB queries

export function getFlightBookingState(s: FlightBookingState): FlightBooking {
  return s.flightBooking
}

export const getFlights = createSelector(
  getFlightBookingState,
  (state: FlightBooking) => state.flights
)
