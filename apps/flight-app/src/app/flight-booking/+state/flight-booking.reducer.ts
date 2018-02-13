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
    //
    case 'SAVE_FLIGHT': {
      return { ...state, ...action.payload };
    }
    case 'FLIGHT_SAVED': {
      const index = state.flights.findIndex(f => f.id === action.payload.flight.id);
      const updatedFlights = [...state.flights];
      updatedFlights[index] = action.payload.flight;

      return { ...state,
               ...action.payload,
                flights: updatedFlights
             };
    }
    case 'FLIGHT_ERROR': {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
}
