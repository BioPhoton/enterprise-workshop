import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Flight} from '../models/flight';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class FlightService {

  flights: Flight[] = [];
  baseUrl: string = `http://www.angular.at/api`;

  private flightsSubject: Subject<Flight[]> = new BehaviorSubject();
  readonly flights$: Observable<Flight[]> = this.flightsSubject.asObservable();

  private isFlightsPendingSubject: Subject<boolean> = new BehaviorSubject();
  readonly isFlightsPending$: Observable<Flight> = this.isFlightsPendingSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  setFlights$(flights: Flight[]) {
    this.flightsSubject.next(flights);
  }

  setIsFlightPending$(isPending: boolean) {
    this.isFlightsPendingSubject.next(isPending);
  }

  load(from: string, to: string, urgent: boolean): void {
    this.setIsFlightPending$(true);
    this.find(from, to, urgent)
      .subscribe(
        flights => {
          this.flights = flights;
          this.setIsFlightPending$(false);
          this.setFlights$(flights)
        },
        err => {
          console.error('Error loading flights', err)
          this.setIsFlightPending$(false);
        }
      );
  }

  find(from: string, to: string, urgent: boolean = false): Observable<Flight[]> {

    // For offline access
    // let url = '/assets/data/data.json';

    // For online access
    let url = [this.baseUrl + 'flight'].join('/');

    if (urgent) {
      url = [this.baseUrl +'error?code=403'].join('/');
    }

    let params = new HttpParams()
      .set('from', from)
      .set('to', to);

    let headers = new HttpHeaders()
      .set('Accept', 'application/json');

    const reqObj = {params, headers};
    return this.http.get<Flight>(url, reqObj);
  }

  findById(id: string): Observable<Flight> {
    const reqObj = { params: null };
    reqObj.params = new HttpParams().set('id', id);
    const url = [this.baseUrl + 'flight'].join('/');
    return this.http.get<Flight>(url, reqObj);
  }

  save(flight: Flight): Observable<Flight> {
    const url = [this.baseUrl + 'flight'].join('/');
    return this.http.post<Flight>(url, flight);
  }

  delay() {
    const ONE_MINUTE = 1000 * 60;

    let oldFlights = this.flights;
    let oldFlight = oldFlights[0];
    let oldDate = new Date(oldFlight.date);

    // Mutable
    oldDate.setTime(oldDate.getTime() + 15 * ONE_MINUTE);
    oldFlight.date = oldDate.toISOString();

    this.setFlights$(this.flights)
  }

}
