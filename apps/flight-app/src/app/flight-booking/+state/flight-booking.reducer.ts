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
      return {
                ...state,
                isFlightPending: action.payload.isFlightPending
      };
    }
    case 'FLIGHT_SAVED': {
      const index = state.flights.findIndex(f => f.id === action.payload.flight.id);
      const updatedFlights = [...state.flights];
      updatedFlights[index] = action.payload.flight;
      return {
                ...state,
                isFlightPending:action.payload.isFlightPending,
                flights: updatedFlights
             };
    }
    case 'FLIGHT_ERROR': {
      console.log(action)
      const index = state.flights.findIndex(f => f.id === action.payload.flight.id);
      const updatedFlights = [...state.flights];
      updatedFlights[index] = action.payload.flight;

      return {
          ...state,
          flights: updatedFlights,
          isFlightPending:action.payload.isFlightPending,
          errorMessage: action.payload.errorMessage
      };
    }
    default: {
      return state;
    }
  }
}
