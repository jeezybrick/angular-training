import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout.component';
import { RouterModule } from '@angular/router';
import { NavbarModule } from '../navbar/navbar.module';
import { FooterModule } from '../footer/footer.module';
import { ButtonModule } from '../../components/button/button.module';

@NgModule({
  declarations: [AuthLayoutComponent],
  imports: [CommonModule, RouterModule, NavbarModule, FooterModule, ButtonModule],
  exports: [AuthLayoutComponent],
})
export class AuthLayoutModule {}
