(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ngrx/store'), require('rxjs/observable/merge'), require('rxjs/operator/ignoreElements'), require('rxjs/operator/materialize'), require('rxjs/operator/map'), require('@angular/core'), require('rxjs/Observable'), require('rxjs/operators'), require('rxjs/operator/groupBy'), require('rxjs/operator/mergeMap'), require('rxjs/operator/exhaustMap'), require('rxjs/operator/dematerialize'), require('rxjs/operator/filter'), require('rxjs/Subject')) :
	typeof define === 'function' && define.amd ? define(['exports', '@ngrx/store', 'rxjs/observable/merge', 'rxjs/operator/ignoreElements', 'rxjs/operator/materialize', 'rxjs/operator/map', '@angular/core', 'rxjs/Observable', 'rxjs/operators', 'rxjs/operator/groupBy', 'rxjs/operator/mergeMap', 'rxjs/operator/exhaustMap', 'rxjs/operator/dematerialize', 'rxjs/operator/filter', 'rxjs/Subject'], factory) :
	(factory((global.ngrx = global.ngrx || {}, global.ngrx.effects = {}),global.ngrx.store,global.Rx.Observable,global.Rx.Observable.prototype,global.materialize,global.map,global.ng.core,global.Rx,global.operators,global.groupBy,global.mergeMap,global.exhaustMap,global.dematerialize,global.Rx.Observable.prototype,global.Subject));
}(this, (function (exports,store,merge,ignoreElements,materialize,map,core,Observable,operators,groupBy,mergeMap,exhaustMap,dematerialize,filter$1,Subject) { 'use strict';

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var METADATA_KEY = '__@ngrx/effects__';
/**
 * @record
 */
/**
 * @param {?} sourceProto
 * @return {?}
 */
function getEffectMetadataEntries(sourceProto) {
    return sourceProto.constructor[METADATA_KEY] || [];
}
/**
 * @param {?} sourceProto
 * @param {?} entries
 * @return {?}
 */
function setEffectMetadataEntries(sourceProto, entries) {
    var /** @type {?} */ constructor = sourceProto.constructor;
    var /** @type {?} */ meta = constructor.hasOwnProperty(METADATA_KEY)
        ? ((constructor))[METADATA_KEY]
        : Object.defineProperty(constructor, METADATA_KEY, { value: [] })[METADATA_KEY];
    Array.prototype.push.apply(meta, entries);
}
/**
 * @param {?=} __0
 * @return {?}
 */
function Effect(_a) {
    var dispatch = (_a === void 0 ? { dispatch: true } : _a).dispatch;
    return function (target, propertyName) {
        var /** @type {?} */ metadata = { propertyName: propertyName, dispatch: dispatch };
        setEffectMetadataEntries(target, [metadata]);
    };
}
/**
 * @param {?} instance
 * @return {?}
 */
function getSourceForInstance(instance) {
    return Object.getPrototypeOf(instance);
}
var getSourceMetadata = store.compose(getEffectMetadataEntries, getSourceForInstance);
/**
 * @template T
 * @param {?} instance
 * @return {?}
 */
function getEffectsMetadata(instance) {
    var /** @type {?} */ metadata = {};
    getSourceMetadata(instance).forEach(function (_a) {
        var propertyName = _a.propertyName, dispatch = _a.dispatch;
        metadata[propertyName] = { dispatch: dispatch };
    });
    return metadata;
}
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
var onRunEffectsKey = 'ngrxOnRunEffects';
/**
 * @param {?} sourceInstance
 * @return {?}
 */
function isOnRunEffects(sourceInstance) {
    var /** @type {?} */ source = getSourceForInstance(sourceInstance);
    return (onRunEffectsKey in source && typeof source[onRunEffectsKey] === 'function');
}
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} sourceInstance
 * @return {?}
 */
function mergeEffects(sourceInstance) {
    var /** @type {?} */ sourceName = getSourceForInstance(sourceInstance).constructor.name;
    var /** @type {?} */ observables = getSourceMetadata(sourceInstance).map(function (_a) {
        var propertyName = _a.propertyName, dispatch = _a.dispatch;
        var /** @type {?} */ observable = typeof sourceInstance[propertyName] === 'function'
            ? sourceInstance[propertyName]()
            : sourceInstance[propertyName];
        if (dispatch === false) {
            return ignoreElements.ignoreElements.call(observable);
        }
        var /** @type {?} */ materialized$ = materialize.materialize.call(observable);
        return map.map.call(materialized$, function (notification) { return ({
            effect: sourceInstance[propertyName],
            notification: notification,
            propertyName: propertyName,
            sourceName: sourceName,
            sourceInstance: sourceInstance,
        }); });
    });
    return merge.merge.apply(void 0, observables);
}
/**
 * @param {?} sourceInstance
 * @return {?}
 */
function resolveEffectSource(sourceInstance) {
    var /** @type {?} */ mergedEffects$ = mergeEffects(sourceInstance);
    if (isOnRunEffects(sourceInstance)) {
        return sourceInstance.ngrxOnRunEffects(mergedEffects$);
    }
    return mergedEffects$;
}
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Actions = (function (_super) {
    __extends(Actions, _super);
    /**
     * @param {?=} source
     */
    function Actions(source) {
        var _this = _super.call(this) || this;
        if (source) {
            _this.source = source;
        }
        return _this;
    }
    /**
     * @template R
     * @param {?} operator
     * @return {?}
     */
    Actions.prototype.lift = function (operator) {
        var /** @type {?} */ observable = new Actions();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    /**
     * @template V2
     * @param {...?} allowedTypes
     * @return {?}
     */
    Actions.prototype.ofType = function () {
        var allowedTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            allowedTypes[_i] = arguments[_i];
        }
        return (ofType.apply(void 0, allowedTypes)(/** @type {?} */ (this)));
    };
    return Actions;
}(Observable.Observable));
Actions.decorators = [
    { type: core.Injectable },
];
/** @nocollapse */
Actions.ctorParameters = function () { return [
    { type: Observable.Observable, decorators: [{ type: core.Inject, args: [store.ScannedActionsSubject,] },] },
]; };
/**
 * @template T
 * @param {...?} allowedTypes
 * @return {?}
 */
function ofType() {
    var allowedTypes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        allowedTypes[_i] = arguments[_i];
    }
    return operators.filter(function (action) { return allowedTypes.some(function (type) { return type === action.type; }); });
}
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
/**
 * @param {?} output
 * @param {?} reporter
 * @return {?}
 */
function verifyOutput(output, reporter) {
    reportErrorThrown(output, reporter);
    reportInvalidActions(output, reporter);
}
/**
 * @param {?} output
 * @param {?} reporter
 * @return {?}
 */
function reportErrorThrown(output, reporter) {
    if (output.notification.kind === 'E') {
        reporter.handleError(output.notification.error);
    }
}
/**
 * @param {?} output
 * @param {?} reporter
 * @return {?}
 */
function reportInvalidActions(output, reporter) {
    if (output.notification.kind === 'N') {
        var /** @type {?} */ action = output.notification.value;
        var /** @type {?} */ isInvalidAction = !isAction(action);
        if (isInvalidAction) {
            reporter.handleError(new Error("Effect " + getEffectName(output) + " dispatched an invalid action: " + action));
        }
    }
}
/**
 * @param {?} action
 * @return {?}
 */
function isAction(action) {
    return action && action.type && typeof action.type === 'string';
}
/**
 * @param {?} __0
 * @return {?}
 */
function getEffectName(_a) {
    var propertyName = _a.propertyName, sourceInstance = _a.sourceInstance, sourceName = _a.sourceName;
    var /** @type {?} */ isMethod = typeof sourceInstance[propertyName] === 'function';
    return "\"" + sourceName + "." + propertyName + (isMethod ? '()' : '') + "\"";
}
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var EffectSources = (function (_super) {
    __extends(EffectSources, _super);
    /**
     * @param {?} errorHandler
     */
    function EffectSources(errorHandler) {
        var _this = _super.call(this) || this;
        _this.errorHandler = errorHandler;
        return _this;
    }
    /**
     * @param {?} effectSourceInstance
     * @return {?}
     */
    EffectSources.prototype.addEffects = function (effectSourceInstance) {
        this.next(effectSourceInstance);
    };
    /**
     * \@internal
     * @return {?}
     */
    EffectSources.prototype.toActions = function () {
        var _this = this;
        return mergeMap.mergeMap.call(groupBy.groupBy.call(this, getSourceForInstance), function (source$) { return dematerialize.dematerialize.call(filter$1.filter.call(map.map.call(exhaustMap.exhaustMap.call(source$, resolveEffectSource), function (output) {
            verifyOutput(output, _this.errorHandler);
            return output.notification;
        }), function (notification) { return notification.kind === 'N'; })); });
    };
    return EffectSources;
}(Subject.Subject));
EffectSources.decorators = [
    { type: core.Injectable },
];
/** @nocollapse */
EffectSources.ctorParameters = function () { return [
    { type: core.ErrorHandler, },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var IMMEDIATE_EFFECTS = new core.InjectionToken('ngrx/effects: Immediate Effects');
var ROOT_EFFECTS = new core.InjectionToken('ngrx/effects: Root Effects');
var FEATURE_EFFECTS = new core.InjectionToken('ngrx/effects: Feature Effects');
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var EffectsRunner = (function () {
    /**
     * @param {?} effectSources
     * @param {?} store
     */
    function EffectsRunner(effectSources, store$$1) {
        this.effectSources = effectSources;
        this.store = store$$1;
        this.effectsSubscription = null;
    }
    /**
     * @return {?}
     */
    EffectsRunner.prototype.start = function () {
        if (!this.effectsSubscription) {
            this.effectsSubscription = this.effectSources
                .toActions()
                .subscribe(this.store);
        }
    };
    /**
     * @return {?}
     */
    EffectsRunner.prototype.ngOnDestroy = function () {
        if (this.effectsSubscription) {
            this.effectsSubscription.unsubscribe();
            this.effectsSubscription = null;
        }
    };
    return EffectsRunner;
}());
EffectsRunner.decorators = [
    { type: core.Injectable },
];
/** @nocollapse */
EffectsRunner.ctorParameters = function () { return [
    { type: EffectSources, },
    { type: store.Store, },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ROOT_EFFECTS_INIT = '@ngrx/effects/init';
var EffectsRootModule = (function () {
    /**
     * @param {?} sources
     * @param {?} runner
     * @param {?} store
     * @param {?} rootEffects
     * @param {?} storeRootModule
     * @param {?} storeFeatureModule
     */
    function EffectsRootModule(sources, runner, store$$1, rootEffects, storeRootModule, storeFeatureModule) {
        this.sources = sources;
        runner.start();
        rootEffects.forEach(function (effectSourceInstance) { return sources.addEffects(effectSourceInstance); });
        store$$1.dispatch({ type: ROOT_EFFECTS_INIT });
    }
    /**
     * @param {?} effectSourceInstance
     * @return {?}
     */
    EffectsRootModule.prototype.addEffects = function (effectSourceInstance) {
        this.sources.addEffects(effectSourceInstance);
    };
    return EffectsRootModule;
}());
EffectsRootModule.decorators = [
    { type: core.NgModule, args: [{},] },
];
/** @nocollapse */
EffectsRootModule.ctorParameters = function () { return [
    { type: EffectSources, },
    { type: EffectsRunner, },
    { type: store.Store, },
    { type: Array, decorators: [{ type: core.Inject, args: [ROOT_EFFECTS,] },] },
    { type: store.StoreRootModule, decorators: [{ type: core.Optional },] },
    { type: store.StoreFeatureModule, decorators: [{ type: core.Optional },] },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var EffectsFeatureModule = (function () {
    /**
     * @param {?} root
     * @param {?} effectSourceGroups
     * @param {?} storeRootModule
     * @param {?} storeFeatureModule
     */
    function EffectsFeatureModule(root, effectSourceGroups, storeRootModule, storeFeatureModule) {
        this.root = root;
        effectSourceGroups.forEach(function (group) { return group.forEach(function (effectSourceInstance) { return root.addEffects(effectSourceInstance); }); });
    }
    return EffectsFeatureModule;
}());
EffectsFeatureModule.decorators = [
    { type: core.NgModule, args: [{},] },
];
/** @nocollapse */
EffectsFeatureModule.ctorParameters = function () { return [
    { type: EffectsRootModule, },
    { type: Array, decorators: [{ type: core.Inject, args: [FEATURE_EFFECTS,] },] },
    { type: store.StoreRootModule, decorators: [{ type: core.Optional },] },
    { type: store.StoreFeatureModule, decorators: [{ type: core.Optional },] },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var EffectsModule = (function () {
    function EffectsModule() {
    }
    /**
     * @param {?} featureEffects
     * @return {?}
     */
    EffectsModule.forFeature = function (featureEffects) {
        return {
            ngModule: EffectsFeatureModule,
            providers: [
                featureEffects,
                {
                    provide: FEATURE_EFFECTS,
                    multi: true,
                    deps: featureEffects,
                    useFactory: createSourceInstances,
                },
            ],
        };
    };
    /**
     * @param {?} rootEffects
     * @return {?}
     */
    EffectsModule.forRoot = function (rootEffects) {
        return {
            ngModule: EffectsRootModule,
            providers: [
                EffectsRunner,
                EffectSources,
                Actions,
                rootEffects,
                {
                    provide: ROOT_EFFECTS,
                    deps: rootEffects,
                    useFactory: createSourceInstances,
                },
            ],
        };
    };
    return EffectsModule;
}());
EffectsModule.decorators = [
    { type: core.NgModule, args: [{},] },
];
/** @nocollapse */
EffectsModule.ctorParameters = function () { return []; };
/**
 * @param {...?} instances
 * @return {?}
 */
function createSourceInstances() {
    var instances = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        instances[_i] = arguments[_i];
    }
    return instances;
}

exports.Effect = Effect;
exports.getEffectsMetadata = getEffectsMetadata;
exports.mergeEffects = mergeEffects;
exports.Actions = Actions;
exports.ofType = ofType;
exports.EffectsModule = EffectsModule;
exports.EffectSources = EffectSources;
exports.ROOT_EFFECTS_INIT = ROOT_EFFECTS_INIT;
exports.ɵc = EffectsFeatureModule;
exports.ɵa = createSourceInstances;
exports.ɵb = EffectsRootModule;
exports.ɵf = EffectsRunner;
exports.ɵe = FEATURE_EFFECTS;
exports.ɵd = ROOT_EFFECTS;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=effects.umd.js.map
