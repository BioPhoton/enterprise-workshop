import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { CityPipe } from './pipes/city.pipe';
import { AuthInterceptorService } from './auth/services/auth-interceptor.service';
import {AuthService} from './auth/services/auth.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
  imports: [CommonModule],
  declarations: [CityPipe],
  exports: [CityPipe],
  providers: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        AuthInterceptorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true
        }
      ]
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
