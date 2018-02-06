import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,
  CanDeactivate
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface CanDeactivateComponent {
  canDeactivate(): Observable<boolean>;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanDeactivateComponent> {

  canDeactivate(
    component: CanDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> {

    return component.canDeactivate();

  }

}
