import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {pluck, switchMap, tap} from 'rxjs/operators';
import {DataPersistence} from '@nrwl/nx';
import {FlightBookingState} from '../+state/flight-booking.interfaces';
import {Flight, FlightService} from '@flight-workspace/flight-api';
import {Observable} from 'rxjs/Observable';
import {
  getFlightErrorMessage,
  getIsFlightPending
} from '../+state/flight-booking.selectors';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit {
  id: string;
  showDetails: string;
  showWarning = false;

  editForm: FormGroup;

  error$: Observable<string>;
  isFlightPending$: Observable<boolean>;
  oldFlight: Flight;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private s: DataPersistence<FlightBookingState>,
              private flightService: FlightService) {

    this.editForm = this.fb.group({
      'id': [],
      'from': [],
      'to': [],
      'date': []
    })

    this.error$ = this.s.store.select(getFlightErrorMessage);
    this.isFlightPending$ = this.s.store.select(getIsFlightPending);
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];
    });

    this.route
      .params
      .pipe(
        pluck('id'),
        switchMap((id: string) => this.flightService.findById(id)),
        tap(f => this.oldFlight = {...f})
      )
      .subscribe(flight => this.editForm.patchValue(flight));
  }

  save(flight: Flight) {
    this.s.store.dispatch({
      type: 'SAVE_FLIGHT',
      payload: {
        flight: flight,
        oldFlight: this.oldFlight,
        isFlightPending: true
      }
    });
  }

}
