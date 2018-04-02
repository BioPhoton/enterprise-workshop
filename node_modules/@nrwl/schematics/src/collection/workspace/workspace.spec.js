"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular-devkit/schematics/testing");
var path = require("path");
var schematics_1 = require("@angular-devkit/schematics");
describe('workspace', function () {
    var schematicRunner = new testing_1.SchematicTestRunner('@nrwl/schematics', path.join(__dirname, '../../collection.json'));
    var appTree;
    beforeEach(function () {
        appTree = new schematics_1.VirtualTree();
    });
    it('should error if no package.json is present', function () {
        expect(function () {
            var tree = schematicRunner.runSchematic('workspace', { name: 'myApp' }, appTree);
        }).toThrow('Cannot find package.json');
    });
    it('should error if no protractor.conf.js is present', function () {
        expect(function () {
            appTree.create('/package.json', JSON.stringify({}));
            var tree = schematicRunner.runSchematic('workspace', { name: 'myApp' }, appTree);
        }).toThrow('Cannot find protractor.conf.js');
    });
    it('should error if no .angular-cli.json is present', function () {
        expect(function () {
            appTree.create('/package.json', JSON.stringify({}));
            appTree.create('/protractor.conf.js', '');
            var tree = schematicRunner.runSchematic('workspace', { name: 'myApp' }, appTree);
        }).toThrow('Cannot find .angular-cli.json');
    });
    it('should error if the .angular-cli.json specifies more than one app', function () {
        expect(function () {
            appTree.create('/package.json', JSON.stringify({}));
            appTree.create('/protractor.conf.js', '');
            appTree.create('/.angular-cli.json', JSON.stringify({
                apps: [{}, {}]
            }));
            var tree = schematicRunner.runSchematic('workspace', { name: 'myApp' }, appTree);
        }).toThrow('Can only convert projects with one app');
    });
});
