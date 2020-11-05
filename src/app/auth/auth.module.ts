import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ButtonModule } from '@shared/components/button/button.module';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { InputModule } from '@shared/directives/input/input.module';
import { QuicklinkModule } from 'ngx-quicklink';
import { AuthLayoutModule } from '../shared/layout/auth-layout/auth-layout.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    ButtonModule,
    InputModule,
    QuicklinkModule,
    AuthLayoutModule
  ]
})
export class AuthModule { }
