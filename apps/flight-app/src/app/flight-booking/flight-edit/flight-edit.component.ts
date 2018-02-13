import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FlightService} from '@flight-workspace/flight-api';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit {
  id: string;
  showDetails: string;
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
    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];
    });

    this.id$
      .pipe(
        switchMap(id => this.flightService.findById(id))
      )
      .subscribe(flight => this.editForm.patchValue(flight));
  }

}
