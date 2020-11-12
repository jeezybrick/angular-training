import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardComponent,
  MyCardActionsDirective,
  MyCardAvatarDirective,
  MyCardContentDirective,
  MyCardFooterDirective,
  MyCardHeaderComponent,
  MyCardImageDirective,
  MyCardSubtitleDirective,
  MyCardTitleDirective,
  MyCardTitleGroupComponent,
} from './card.component';

const components = [
  CardComponent,
  MyCardHeaderComponent,
  MyCardTitleGroupComponent,
  MyCardContentDirective,
  MyCardTitleDirective,
  MyCardImageDirective,
  MyCardFooterDirective,
  MyCardSubtitleDirective,
  MyCardActionsDirective,
  MyCardAvatarDirective,
];

@NgModule({
  declarations: components,
  imports: [CommonModule],
  exports: components,
})
export class CardModule {}
