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

export const getIsFlightsPending = createSelector(
  getFlightBookingState,
  (state: FlightBooking) => state.isFlightsPending
)


export const getFlightErrorMessage= createSelector(
  getFlightBookingState,
  (state: FlightBooking) => state.errorMessage
)

export const getIsFlightPending = createSelector(
  getFlightBookingState,
  (state: FlightBooking) => state.isFlightPending
)
