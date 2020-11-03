import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnchorComponent, ButtonComponent } from './button.component';

@NgModule({
  declarations: [ButtonComponent, AnchorComponent],
  imports: [
    CommonModule
  ],
  exports: [ButtonComponent, AnchorComponent],
})
export class ButtonModule { }
