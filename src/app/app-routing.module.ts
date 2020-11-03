import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
  {
    path: 'auth',
    // canActivate: [IsLoggedGuard],
    // canLoad: [AuthGuard],
    // component: BaseLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  // { path: '**', redirectTo: '/404' },
  // { path: '404', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
