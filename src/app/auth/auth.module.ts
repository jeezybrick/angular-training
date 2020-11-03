import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ButtonModule } from '@shared/components/button/button.module';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { InputModule } from '@shared/directives/input/input.module';
import { QuicklinkModule } from 'ngx-quicklink';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    InputModule,
    QuicklinkModule
  ]
})
export class AuthModule { }
