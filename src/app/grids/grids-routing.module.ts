import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridsComponent } from './containers/grids/grids.component';
import { GridsLayoutComponent } from './layout/grids-layout/grids-layout.component';

const routes: Routes = [
  {
    path: '',
    component: GridsLayoutComponent,
    children: [{ path: '', component: GridsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GridsRoutingModule {}
