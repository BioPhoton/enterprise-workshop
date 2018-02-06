import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AirportService {

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<string[]> {
    const url = 'http://www.angular.at/api/airport';
    return this.httpClient.get<string[]>(url);
  }

}
