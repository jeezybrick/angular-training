import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HooksRoutingModule } from './hooks-routing.module';
import { HooksComponent } from './containers/hooks/hooks.component';
import { HooksOneComponent } from './components/hooks-one/hooks-one.component';
import { HooksTwoComponent } from './components/hooks-two/hooks-two.component';
import { QuicklinkModule } from 'ngx-quicklink';
import { ButtonModule } from '../shared/components/button/button.module';
import { MainLayoutModule } from '../shared/layout/main-layout/main-layout.module';

@NgModule({
  declarations: [HooksComponent, HooksOneComponent, HooksTwoComponent],
  imports: [CommonModule, HooksRoutingModule, QuicklinkModule, ButtonModule, MainLayoutModule],
})
export class HooksModule {}
