import { Subject } from 'rxjs/Subject';
import { ErrorHandler } from '@angular/core';
export declare class EffectSources extends Subject<any> {
    private errorHandler;
    constructor(errorHandler: ErrorHandler);
    addEffects(effectSourceInstance: any): void;
}
