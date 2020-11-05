import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListPageComponent } from './containers/users-list-page/users-list-page.component';
import { UserDetailPageComponent } from './containers/user-detail-page/user-detail-page.component';
import { UsersListApiAdapter } from './http-adapters/users-list-api.adapter';
import { AddressApiAdapter } from './http-adapters/address-api.adapter';
import { CompanyApiAdapter } from './http-adapters/company-api.adapter';
import { QuicklinkModule } from 'ngx-quicklink';

@NgModule({
  declarations: [UsersListPageComponent, UserDetailPageComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    QuicklinkModule,
  ],
  providers: [UsersListApiAdapter, AddressApiAdapter, CompanyApiAdapter]
})
export class UsersModule { }
