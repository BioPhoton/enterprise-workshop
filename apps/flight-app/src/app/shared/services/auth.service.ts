import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  userName: string;

  constructor() { }

  login() {
    this.userName = 'Max';
  }

  logout() {
    this.userName = null;
  }

}
