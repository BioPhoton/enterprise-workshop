"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createEmptyWorkspace(tree) {
    tree.create('/.angular-cli.json', JSON.stringify({}));
    tree.create('/package.json', JSON.stringify({}));
    tree.create('/tslint.json', JSON.stringify({
        rules: {
            'nx-enforce-module-boundaries': [
                true,
                {
                    npmScope: '<%= npmScope %>',
                    lazyLoad: [],
                    allow: []
                }
            ]
        }
    }));
    return tree;
}
exports.createEmptyWorkspace = createEmptyWorkspace;
function createApp(tree, appName) {
    tree.create("/apps/" + appName + "/src/app/app.module.ts", "\n     import { NgModule } from '@angular/core';\n     import { BrowserModule } from '@angular/platform-browser';\n     import { RouterModule } from '@angular/router';\n     import { AppComponent } from './app.component';\n     @NgModule({\n       imports: [BrowserModule, RouterModule.forRoot([])],\n       declarations: [AppComponent],\n       bootstrap: [AppComponent]\n     })\n     export class AppModule {}\n  ");
    tree.create("/apps/" + appName + "/src/main.ts", "\n    import { enableProdMode } from '@angular/core';\n    import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';\n\n    import { AppModule } from './app/app.module';\n    import { environment } from './environments/environment';\n\n    if (environment.production) {\n      enableProdMode();\n    }\n\n    platformBrowserDynamic()\n      .bootstrapModule(AppModule)\n      .catch(err => console.log(err));\n  ");
    tree.create("/apps/" + appName + "/src/tsconfig.app.json", JSON.stringify({
        include: ['**/*.ts']
    }));
    tree.create("/apps/" + appName + "/e2e/tsconfig.e2e.json", JSON.stringify({
        include: ['../**/*.ts']
    }));
    tree.overwrite('/.angular-cli.json', JSON.stringify({
        project: {
            name: 'proj',
            npmScope: 'proj'
        },
        apps: [
            {
                name: appName,
                root: "apps/" + appName + "/src",
                main: 'main.ts',
                index: 'index.html'
            }
        ]
    }));
    return tree;
}
exports.createApp = createApp;
