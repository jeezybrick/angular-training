import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import { QuicklinkModule } from 'ngx-quicklink';
import { ButtonModule } from '../shared/components/button/button.module';
import { InputModule } from '../shared/directives/input/input.module';
import { MainLayoutModule } from '../shared/layout/main-layout/main-layout.module';


@NgModule({
  declarations: [DemoComponent],
  imports: [
    CommonModule,
    DemoRoutingModule,
    QuicklinkModule,
    ButtonModule,
    InputModule,
    MainLayoutModule,
  ]
})
export class DemoModule { }
