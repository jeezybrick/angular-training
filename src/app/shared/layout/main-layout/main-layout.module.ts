import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { RouterModule } from '@angular/router';
import { SidenavModule } from '../sidenav/sidenav.module';
import { NavbarModule } from '../navbar/navbar.module';
import { FooterModule } from '../footer/footer.module';
import { ButtonModule } from '../../components/button/button.module';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    SidenavModule,
    NavbarModule,
    FooterModule,
    ButtonModule,
  ],
  exports: [MainLayoutComponent],
})
export class MainLayoutModule { }
