import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject, Input,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { coerceBooleanProperty } from '../../../helpers/utils';

const BUTTON_HOST_ATTRIBUTES = [
  'my-button',
  'my-flat-button',
  'my-raised-button',
  'my-stroked-button',
];

class MatButtonBase {
  // tslint:disable-next-line:variable-name
  constructor(public _elementRef: ElementRef) {}
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: `button[my-button], button[my-raised-button], button[my-icon-button],
             button[my-fab], button[my-mini-fab], button[my-stroked-button],
             button[my-flat-button]`,
  exportAs: 'myButton',
  host: {
    '[attr.disabled]': 'disabled || null',
    '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
    '[class.my-button-disabled]': 'disabled',
    'class': 'mat-focus-indicator',
  },
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent extends MatButtonBase {
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  protected _disabled = false;

  constructor(elementRef: ElementRef,
              @Optional() @Inject(ANIMATION_MODULE_TYPE) public _animationMode: string) {
    super(elementRef);

    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr)) {
        (this._getHostElement() as HTMLElement).classList.add(attr);
      }
    }

    // Add a class that applies to all buttons. This makes it easier to target if somebody
    // wants to target all Material buttons. We do it here rather than `host` to ensure that
    // the class is applied to derived classes.
    elementRef.nativeElement.classList.add('mat-button-base');

  }

  // tslint:disable-next-line:typedef
  private _getHostElement() {
    return this._elementRef.nativeElement;
  }

  // tslint:disable-next-line:typedef
  private _hasHostAttributes(...attributes: string[]) {
    return attributes.some(attribute => this._getHostElement().hasAttribute(attribute));
  }


}

@Component({
  // tslint:disable-next-line:component-selector
  selector: `a[my-button], a[my-raised-button], a[my-icon-button], a[my-fab],
             a[my-mini-fab], a[my-stroked-button], a[my-flat-button]`,
  exportAs: 'myButton, myAnchor',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[attr.tabindex]': 'disabled ? -1 : (tabIndex || 0)',
    '[attr.disabled]': 'disabled || null',
    '[attr.aria-disabled]': 'disabled.toString()',
    '(click)': '_haltDisabledEvents($event)',
    '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
    '[class.my-button-disabled]': 'disabled',
    'class': 'mat-focus-indicator',
  },
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['disabled', 'disableRipple', 'color'],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnchorComponent extends ButtonComponent {
  @Input() tabIndex: number;

  constructor(
    elementRef: ElementRef,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode: string) {
    super(elementRef, animationMode);
  }

  // tslint:disable-next-line:typedef
  _haltDisabledEvents(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
