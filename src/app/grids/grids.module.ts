import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridsRoutingModule } from './grids-routing.module';
import { GridsComponent } from './containers/grids/grids.component';
import { QuicklinkModule } from 'ngx-quicklink';
import { ButtonModule } from '../shared/components/button/button.module';
import { MainLayoutModule } from '../shared/layout/main-layout/main-layout.module';
import { GridsLayoutComponent } from './layout/grids-layout/grids-layout.component';

@NgModule({
  declarations: [GridsComponent, GridsLayoutComponent],
  imports: [CommonModule, GridsRoutingModule, QuicklinkModule, ButtonModule, MainLayoutModule],
})
export class GridsModule {}
