import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit {
  id: string;
  showDetails: string;
  showWarning = false;

  sender: Observer<boolean>;
  showWarning = false;

  sender: Observer<boolean>;
  showWarning = false;

  constructor(private route: ActivatedRoute) {
  }

  decide(decision: boolean): void {
    this.showWarning = false;
    this.sender.next(decision);
    this.sender.complete();
  }

  canDeactivate(): Observable<boolean> {
    return Observable.create((sender: Observer<boolean>) => {
      this.sender = sender;
      this.showWarning = true;
    });

  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];
    });
  }

}
