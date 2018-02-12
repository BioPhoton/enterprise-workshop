import { Component, OnInit } from '@angular/core';
import { FlightService } from '@flight-workspace/flight-api';
import {DataPersistence} from '@nrwl/nx';
import {FlightBookingState} from '../+state/flight-booking.interfaces';
import {getFlights} from '../+state/flight-booking.selectors';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  from: string = 'Hamburg'; // in Germany
  to: string = 'Graz'; // in Austria
  urgent: boolean = false;

  get flights() {
    return this.flightService.flights;
  }

  get flights$() {
    return this.s.store.select(getFlights);
  }

  // "shopping basket" with selected flights
  basket: object = {
    '3': true,
    '5': true
  };

  constructor(private flightService: FlightService, private s: DataPersistence<FlightBookingState>) {}

  ngOnInit() {}

  search(): void {
    if (!this.from || !this.to) return;

    this.flightService
      .find(this.from, this.to, this.urgent)
      .subscribe(
        (flights) => { this.s.store.dispatch({type: "FLIGHTS_LOADED", payload: {flights}}); }
      );
  }

  delay(): void {
    this.flightService.delay();
  }

}
