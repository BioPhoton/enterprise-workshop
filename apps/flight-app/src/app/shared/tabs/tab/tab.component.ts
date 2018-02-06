import {Component, Input} from '@angular/core';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html'
})
export class TabComponent {
  @Input() title: string;
  @Input() id: number;
  @Input() active: boolean = false;
}
