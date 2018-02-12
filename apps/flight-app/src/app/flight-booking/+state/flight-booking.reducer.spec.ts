import { flightBookingReducer } from './flight-booking.reducer';
import { flightBookingInitialState } from './flight-booking.init';
import { FlightBooking } from './flight-booking.interfaces';
import { DataLoaded } from './flight-booking.actions';

describe('flightBookingReducer', () => {
  it('should work', () => {
    const state: FlightBooking = {};
    const action: DataLoaded = { type: 'DATA_LOADED', payload: {} };
    const actual = flightBookingReducer(state, action);
    expect(actual).toEqual({});
  });
});
