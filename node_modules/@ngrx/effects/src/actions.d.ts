import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
export declare class Actions<V = Action> extends Observable<V> {
    constructor(source?: Observable<V>);
    lift<R>(operator: Operator<V, R>): Observable<R>;
    ofType<V2 extends V = V>(...allowedTypes: string[]): Actions<V2>;
}
export declare function ofType<T extends Action>(...allowedTypes: string[]): (source: Observable<Action>) => Observable<T>;
