import { ChangeDetectionStrategy, Component, Directive, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-card',
  exportAs: 'myCard',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @HostBinding('class.my-card')
  public get addBaseClass(): boolean {
    return true;
  }

}

@Component({
  selector: 'my-card-header',
  templateUrl: 'card-header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyCardHeaderComponent {
  @HostBinding('class.my-card-header')
  public get addBaseClass(): boolean {
    return true;
  }
}

@Component({
  selector: 'my-card-title-group',
  templateUrl: 'card-title-group.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyCardTitleGroupComponent {
  @HostBinding('class.my-card-title-group')
  public get addBaseClass(): boolean {
    return true;
  }
}

@Directive({
  selector: 'my-card-content, [my-card-content], [myCardContent]'
})
export class MyCardContentDirective {
  @HostBinding('class.my-card-content')
  public get addBaseClass(): boolean {
    return true;
  }
}

@Directive({
  selector: 'my-card-title, [my-card-title], [myCardTitle]'
})
export class MyCardTitleDirective {
  @HostBinding('class.my-card-title')
  public get addBaseClass(): boolean {
    return true;
  }
}

@Directive({
  selector: 'my-card-subtitle, [my-card-subtitle], [myCardSubtitle]'
})
export class MyCardSubtitleDirective {
  @HostBinding('class.my-card-subtitle')
  public get addBaseClass(): boolean {
    return true;
  }
}

@Directive({
  selector: 'my-card-actions, [my-card-actions], [myCardActions]',
  exportAs: 'myCardActions',
})
export class MyCardActionsDirective {
  @Input() align: 'start' | 'end' = 'start';

  @HostBinding('class.my-card-actions')
  public get addBaseClass(): boolean {
    return true;
  }
  @HostBinding('class.my-card-actions-align-end')
  public get addAlignEndClass(): boolean {
    return this.align === 'end';
  }
}

@Directive({
  selector: 'my-card-image, [my-card-image], [myCardImage]'
})
export class MyCardImageDirective {
  @HostBinding('class.my-card-image')
  public get addBaseClass(): boolean {
    return true;
  }
}

@Directive({
  selector: 'my-card-footer, [my-card-footer], [myCardFooter]'
})
export class MyCardFooterDirective {
  @HostBinding('class.my-card-footer')
  public get addBaseClass(): boolean {
    return true;
  }
}

@Directive({
  selector: 'my-card-avatar, [my-card-avatar], [myCardAvatar]'
})
export class MyCardAvatarDirective {
  @HostBinding('class.my-card-avatar')
  public get addBaseClass(): boolean {
    return true;
  }
}
