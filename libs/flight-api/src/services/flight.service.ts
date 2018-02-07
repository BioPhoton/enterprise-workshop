import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Flight} from '../models/flight';

@Injectable()
export class FlightService {

  constructor(private http: HttpClient) {
  }

  flights: Flight[] = [];

  load(from: string, to: string, urgent: boolean): void {
    this.find(from, to, urgent)
      .subscribe(
        flights => {
          this.flights = flights;
        },
        err => console.error('Error loading flights', err)
      );
  }

  find(from: string, to: string, urgent: boolean = false): Observable<Flight[]> {

    // For offline access
    // let url = '/assets/data/data.json';

    // For online access
    let url = 'http://www.angular.at/api/flight';

    if (urgent) {
      url = 'http://www.angular.at/api/error?code=403';
    }

    let params = new HttpParams()
      .set('from', from)
      .set('to', to);

    let headers = new HttpHeaders()
      .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});

  }

  delay() {
    const ONE_MINUTE = 1000 * 60;

    let oldFlights = this.flights;
    let oldFlight = oldFlights[0];
    let oldDate = new Date(oldFlight.date);

    // Mutable
    //oldDate.setTime(oldDate.getTime() + 15 * ONE_MINUTE);
    //oldFlight.date = oldDate.toISOString();

    // Immutable
    let newDate = new Date(oldDate.getTime() + 15 * ONE_MINUTE);
    let newFlight: Flight = { ...oldFlight, date: newDate.toISOString() };
    let newFlights = [ newFlight, ...oldFlights.slice(1) ]
    this.flights = newFlights;
  }

}
