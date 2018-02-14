import { OAuthService } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor(private oauthService: OAuthService) {}

  get userName(): string {
    let claims = this.oauthService.getIdentityClaims();
    return claims ? claims['given_name'] : null;
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }
}
