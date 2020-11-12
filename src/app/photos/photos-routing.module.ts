import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../shared/layout/main-layout/main-layout.component';
import { PhotosListPageComponent } from './containers/photos-list-page/photos-list-page.component';
import { PhotoDetailPageComponent } from './containers/photo-detail-page/photo-detail-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: PhotosListPageComponent },
      { path: ':photoId', component: PhotoDetailPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotosRoutingModule {}
