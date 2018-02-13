import {FlightBooking} from './flight-booking.interfaces';

export const flightBookingInitialState: FlightBooking = {
  // fill it initial state here
  flights: [],
  isFlightsPending: false,
  //
  errorMessage: '',
  isFlightPending: false
};
