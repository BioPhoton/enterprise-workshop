import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ModuleWithProviders} from '@angular/core/src/metadata/ng_module';
import {CityPipe} from './pipes/city.pipe';
import { TabComponent } from './tabs/tab/tab.component';
import { TabbedPaneComponent } from './tabs/tabbed-pane/tabbed-pane.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CityPipe,
    TabComponent,
    TabbedPaneComponent,
  ],
  exports: [
    CityPipe,
    TabComponent,
    TabbedPaneComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    }
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    }
  }

}
