import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-passenger-search',
  templateUrl: './passenger-search.component.html',
  styleUrls: ['./passenger-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PassengerSearchComponent implements OnInit {

  activePane: number = 2;

  constructor() {
  }

  ngOnInit() {
  }

}
