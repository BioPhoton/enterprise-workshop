import { Component, OnInit } from '@angular/core';
import { FlightService } from '@flight-workspace/flight-api';
import { DataPersistence } from '@nrwl/nx';
import { FlightBookingState } from '../+state/flight-booking.interfaces';
import {
  getFlights,
  getIsFlightsPending
} from '../+state/flight-booking.selectors';
import {Router} from '@angular/router';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  from= 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  get flights() {
    return this.flightService.flights;
  }

  get flights$() {
    return this.s.store.select(getFlights);
  }

  get pending$() {
    return this.s.store.select(getIsFlightsPending);
  }


  // "shopping basket" with selected flights
  basket: object = {
    '3': true,
    '5': true
  };

  constructor(private flightService: FlightService, private s: DataPersistence<FlightBookingState>, private router: Router) {
  }
  ngOnInit() {
  }

  get isFlightsPending$(): Observable<boolean> {
    return this.flightService.isFlightsPending$;
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.router.navigate(['./flight-booking/flight-search', {from: this.from, to: this.to, urgent: this.urgent, isFlightPending: true}])
  }

  delay(): void {
    this.flightService.delay();
  }
}
