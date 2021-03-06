import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { QuicklinkModule } from 'ngx-quicklink';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, CoreModule, QuicklinkModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
