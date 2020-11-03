import {
  ChangeDetectionStrategy,
  Component,
  ElementRef, HostBinding, HostListener,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

const BUTTON_HOST_ATTRIBUTES = [
  'my-button',
  'my-flat-button',
  'my-raised-button',
  'my-stroked-button',
];

class MatButtonBase {
  // tslint:disable-next-line:variable-name
  constructor(public _elementRef: ElementRef) {
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: `button[my-button], button[my-raised-button],
             button[my-stroked-button],
             button[my-flat-button]`,
  exportAs: 'myButton',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent extends MatButtonBase {
  @HostBinding('attr.disabled')
  public get isAttrDisabled(): boolean | null {
    return this.disabled || null;
  }

  @HostBinding('class.my-button-disabled')
  public get isClassDisabled(): boolean {
    return this.disabled;
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  // tslint:disable-next-line:variable-name
  protected _disabled = false;

  constructor(elementRef: ElementRef) {
    super(elementRef);

    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr)) {
        (this._getHostElement() as HTMLElement).classList.add(attr);
      }
    }

    elementRef.nativeElement.classList.add('my-button-base');

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
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnchorComponent extends ButtonComponent {
  @Input() tabIndex: number;

  @HostBinding('attr.tabindex')
  public get getTabIndex(): number {
    return this.disabled ? -1 : (this.tabIndex || 0);
  }

  @HostBinding('attr.aria-disabled')
  public get attrAriaDisabled(): string {
    return this.disabled.toString();
  }


  @HostListener('click', ['$event'])
  public _haltDisabledEvents(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  constructor(
    elementRef: ElementRef) {
    super(elementRef);
  }

}
