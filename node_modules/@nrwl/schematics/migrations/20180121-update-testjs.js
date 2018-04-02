"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
exports.default = {
    description: 'Update test.js',
    run: function () {
        fs.writeFileSync('test.js', "\n// This file is required by karma.conf.js and loads recursively all the .spec and framework files\nrequire('zone.js/dist/zone-testing');\nconst getTestBed  = require('@angular/core/testing').getTestBed;\nconst BrowserDynamicTestingModule  = require('@angular/platform-browser-dynamic/testing').BrowserDynamicTestingModule;\nconst platformBrowserDynamicTesting  = require('@angular/platform-browser-dynamic/testing').platformBrowserDynamicTesting;\n\n// Prevent Karma from running prematurely.\n__karma__.loaded = function () {};\n\n// First, initialize the Angular testing environment.\ngetTestBed().initTestEnvironment(\n  BrowserDynamicTestingModule,\n  platformBrowserDynamicTesting()\n);\n// Then we find all the tests.\nconst contextApps = require.context('./apps', true, /\\.spec\\.ts$/);\n// And load the modules.\ncontextApps.keys().map(contextApps);\n\nconst contextLibs = require.context('./libs', true, /\\.spec\\.ts$/);\n// And load the modules.\ncontextLibs.keys().map(contextLibs);\n\n// Finally, start Karma to run the tests.\n__karma__.start();    \n    ");
    }
};
