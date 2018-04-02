import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { pluck, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { FlightService } from '@flight-workspace/flight-api';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit {
  id$: Observable<string>;
  showDetails$: Observable<string>;

  showWarning = false;

  editForm: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private flightService: FlightService) {
    this.editForm = this.fb.group({
      'id': [],
      'from': [],
      'to': [],
      'date': []
    })

  }

  ngOnInit() {
    this.id$  = this.route.params.pipe(pluck('id'));
    this.showDetails$  = this.route.params.pipe(pluck('showDetails'));

    this.id$
      .pipe(
        switchMap(id => this.flightService.findById(id))
      )
      .subscribe(flight => this.editForm.patchValue(flight));
  }
}
