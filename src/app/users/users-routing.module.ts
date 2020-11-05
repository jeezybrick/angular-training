import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListPageComponent } from './containers/users-list-page/users-list-page.component';
import { UserDetailPageComponent } from './containers/user-detail-page/user-detail-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: UsersListPageComponent },
      { path: ':userId', component: UserDetailPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
