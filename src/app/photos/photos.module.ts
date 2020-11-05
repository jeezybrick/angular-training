import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosListPageComponent } from './containers/photos-list-page/photos-list-page.component';
import { QuicklinkModule } from 'ngx-quicklink';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from '../shared/components/button/button.module';
import { MainLayoutModule } from '../shared/layout/main-layout/main-layout.module';


@NgModule({
  declarations: [PhotosListPageComponent],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    QuicklinkModule,
    HttpClientModule,
    ButtonModule,
    MainLayoutModule,
  ]
})
export class PhotosModule { }
