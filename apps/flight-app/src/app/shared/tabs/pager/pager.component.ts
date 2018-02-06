import {Component} from '@angular/core';
import {TabbedPaneService} from '../services/tabbed-pane.service';

@Component({
  selector: 'pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent {

  constructor(private service: TabbedPaneService) {
  }

  next(): void {
    this.service.next();
  }

  prev(): void {
    this.service.prev();
  }
}
