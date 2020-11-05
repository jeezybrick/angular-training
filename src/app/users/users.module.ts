import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListPageComponent } from './containers/users-list-page/users-list-page.component';
import { UserDetailPageComponent } from './containers/user-detail-page/user-detail-page.component';
import { UsersListApiAdapter } from './http-adapters/users-list-api.adapter';
import { AddressApiAdapter } from './http-adapters/address-api.adapter';
import { CompanyApiAdapter } from './http-adapters/company-api.adapter';
import { QuicklinkModule } from 'ngx-quicklink';
import { UsersService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailApiAdapter } from './http-adapters/user-detail-api.adapter';
import { ButtonModule } from '../shared/components/button/button.module';

@NgModule({
  declarations: [UsersListPageComponent, UserDetailPageComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    QuicklinkModule,
    HttpClientModule,
    ButtonModule,
  ],
  providers: [UsersService, UsersListApiAdapter, UserDetailApiAdapter, AddressApiAdapter, CompanyApiAdapter]
})
export class UsersModule {}
