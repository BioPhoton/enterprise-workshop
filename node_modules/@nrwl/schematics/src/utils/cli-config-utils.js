"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function getAppDirectoryUsingCliConfig() {
    var appArg = findAppArg();
    var cli = JSON.parse(fs.readFileSync(process.cwd() + '/.angular-cli.json', 'UTF-8'));
    if (appArg) {
        var appName_1 = appArg.split('=')[1];
        var app = cli.apps.filter(function (a) { return a.name === appName_1; })[0];
        if (!app) {
            console.error("Cannot find app '" + appName_1 + "'.");
            process.exit(1);
        }
        else if (app.root.startsWith('libs')) {
            console.error("Cannot run e2e tests for a library.");
            process.exit(1);
        }
        else {
            return "apps/" + appName_1;
        }
    }
    else {
        console.error("Please provide the app name using --app or -a.");
        process.exit(1);
    }
}
exports.getAppDirectoryUsingCliConfig = getAppDirectoryUsingCliConfig;
function makeSureNoAppIsSelected() {
    if (findAppArg()) {
        console.error('Nx only supports running unit tests for all apps and libs.');
        console.error('You cannot use -a or --app.');
        console.error('Use fdescribe or fit to select a subset of tests to run.');
        process.exit(1);
    }
}
exports.makeSureNoAppIsSelected = makeSureNoAppIsSelected;
function findAppArg() {
    return process.argv.filter(function (a) {
        return a.startsWith("-a=") ||
            a.startsWith("--app=") ||
            a.startsWith("\"-a=\"") ||
            a.startsWith("\"--app=\"") ||
            a.startsWith("'-a='") ||
            a.startsWith("'--app='");
    })[0];
}
