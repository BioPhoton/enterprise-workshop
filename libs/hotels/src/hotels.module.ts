import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HotelsComponent } from './hotels/hotels.component';

@NgModule({
  imports: [CommonModule,
        RouterModule.forChild([
        {path: '', pathMatch: 'full', component: HotelsComponent}
       ]) ],
  declarations: [HotelsComponent]
})
export class HotelsModule {
}
