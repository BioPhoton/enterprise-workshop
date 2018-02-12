import { FlightBooking } from './flight-booking.interfaces';
import { FlightBookingAction } from './flight-booking.actions';

export function flightBookingReducer(state: FlightBooking, action: FlightBookingAction): FlightBooking {
  switch (action.type) {
    case 'FLIGHTS_LOADED': {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
}
