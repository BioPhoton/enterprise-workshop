import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DataPersistence} from '@nrwl/nx';
import {AppState} from './+state/app.interfaces';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  count$: Observable<number>;

  constructor(private s: DataPersistence<AppState>) {
    this.count$ = s.store.select((state) => state.app.count);
  }

  countUp() {
    this.s.store.dispatch({type: 'INCREASE_BY', payload: {amount: 1}})
  }
}
