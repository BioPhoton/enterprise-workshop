import { Component } from '@angular/core';
import { LoggerService } from 'logger-lib';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
private loggerService: LoggerService
  ) {
    this.loggerService.log('log');
    this.loggerService.debug('debug');
  }

}

