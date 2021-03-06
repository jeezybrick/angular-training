import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosListPageComponent } from './containers/photos-list-page/photos-list-page.component';
import { QuicklinkModule } from 'ngx-quicklink';
import { ButtonModule } from '../shared/components/button/button.module';
import { MainLayoutModule } from '../shared/layout/main-layout/main-layout.module';
import { PhotoDetailPageComponent } from './containers/photo-detail-page/photo-detail-page.component';
import { PhotoDetailApiAdapter } from './http-adapters/photo-detail-api.adapter';
import { PhotosListApiAdapter } from './http-adapters/photos-list-api.adapter';
import { PhotosService } from './services/photos.service';
import { CardModule } from '@shared/components/card/card.module';

@NgModule({
  declarations: [PhotosListPageComponent, PhotoDetailPageComponent],
  imports: [CommonModule, PhotosRoutingModule, QuicklinkModule, ButtonModule, MainLayoutModule, CardModule],
  providers: [PhotosService, PhotoDetailApiAdapter, PhotosListApiAdapter],
})
export class PhotosModule {}
