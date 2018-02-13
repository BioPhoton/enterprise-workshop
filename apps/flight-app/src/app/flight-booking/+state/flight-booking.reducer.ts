import { FlightBooking } from './flight-booking.interfaces';
import { FlightBookingAction } from './flight-booking.actions';

export function flightBookingReducer(state: FlightBooking, action: FlightBookingAction): FlightBooking {
  switch (action.type) {
    case 'LOAD_FLIGHTS': {
      return { ...state, isFlightsPending: action.payload.isFlightsPending };
    }
    case 'FLIGHTS_LOADED': {
      return { ...state, ...action.payload };
    }
    case 'FLIGHTS_ERROR': {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
}
