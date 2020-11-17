import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { DeactiveGuard } from '@core/guards/deactive.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
  {
    path: 'auth',
    // canActivate: [IsLoggedGuard],
    // component: BaseLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'photos',
    loadChildren: () => import('./photos/photos.module').then((m) => m.PhotosModule),
    data: {
      preload: false,
    },
  },
  {
    path: 'hooks',
    loadChildren: () => import('./hooks/hooks.module').then((m) => m.HooksModule),
    data: {
      preload: false,
    },
  },
  {
    path: 'grids',
    loadChildren: () => import('./grids/grids.module').then((m) => m.GridsModule),
    data: {
      preload: false,
    },
  },
  {
    path: 'demo',
    loadChildren: () => import('./demo/demo.module').then((m) => m.DemoModule),
    data: {
      preload: false,
    },
    canDeactivate: [DeactiveGuard],
  },
  // { path: '**', redirectTo: '/404' },
  // { path: '404', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
