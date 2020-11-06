import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { httpInterceptorProviders } from '@core/interceptors';

// core providers vs providedIn: 'root'
// https://stackoverflow.com/questions/50860898/angular-6-services-providedin-root-vs-coremodule
@NgModule({
  imports: [BrowserModule, RouterModule, HttpClientModule],
  exports: [BrowserModule, HttpClientModule],
  providers: [
    httpInterceptorProviders
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() coreModule?: CoreModule) {
    if (coreModule) {
      throw new Error('CoreModule has already been loaded. Import Core modules in the AppModule only.');
    }
  }
}
