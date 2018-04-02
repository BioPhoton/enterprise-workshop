import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { CityPipe } from './pipes/city.pipe';
import { TabComponent } from './tabs/tab/tab.component';
import { TabbedPaneComponent } from './tabs/tabbed-pane/tabbed-pane.component';
import { PagerComponent } from './tabs/pager/pager.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CityPipe,
    TabComponent,
    TabbedPaneComponent,
    PagerComponent
  ],
  exports: [
    CityPipe,
    TabComponent,
    TabbedPaneComponent,
    PagerComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
