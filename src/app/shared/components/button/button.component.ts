import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  CanColor,
  CanColorCtor,
  CanDisable,
  CanDisableCtor,
  CanDisableRipple,
  CanDisableRippleCtor,
  mixinColor,
  mixinDisabled,
  mixinDisableRipple,
} from '@angular/material/core';
import { FocusableOption, FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { ThemePalette } from '@angular/material/core/common-behaviors/color';

const BUTTON_HOST_ATTRIBUTES = ['my-button', 'my-flat-button', 'my-raised-button', 'my-stroked-button'];

class MatButtonBase {
  // tslint:disable-next-line:variable-name
  constructor(public _elementRef: ElementRef) {}
}

const _MatButtonMixinBase: CanDisableRippleCtor & CanDisableCtor & CanColorCtor & typeof MatButtonBase = mixinColor(
  mixinDisabled(mixinDisableRipple(MatButtonBase)),
);

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
export class ButtonComponent
  extends _MatButtonMixinBase
  implements AfterViewInit, OnDestroy, CanDisable, CanColor, CanDisableRipple, FocusableOption {
  // tslint:disable-next-line:variable-name
  static ngAcceptInputType_disabled: BooleanInput;
  // tslint:disable-next-line:variable-name
  static ngAcceptInputType_disableRipple: BooleanInput;

  // tslint:disable-next-line:variable-name
  protected _disabled = false;
  // tslint:disable-next-line:variable-name
  protected _disableRipple = false;

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

  @Input()
  get disableRipple(): boolean {
    return this._disableRipple;
  }

  set disableRipple(value: boolean) {
    this._disableRipple = coerceBooleanProperty(value);
  }

  @Input() public color: ThemePalette;
  @Input() public defaultColor: ThemePalette | undefined;

  constructor(
    elementRef: ElementRef,
    private _focusMonitor: FocusMonitor,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) public _animationMode: string,
  ) {
    super(elementRef);

    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr)) {
        (this._getHostElement() as HTMLElement).classList.add(attr);
      }
    }

    elementRef.nativeElement.classList.add('my-button-base');
  }

  public ngAfterViewInit(): void {
    this._focusMonitor.monitor(this._elementRef, true);
  }

  public ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  /** Focuses the button. */
  focus(origin?: FocusOrigin, options?: FocusOptions): void {
    if (origin) {
      this._focusMonitor.focusVia(this._getHostElement(), origin, options);
    } else {
      this._getHostElement().focus(options);
    }
  }

  // tslint:disable-next-line:typedef
  private _getHostElement() {
    return this._elementRef.nativeElement;
  }

  // tslint:disable-next-line:typedef
  private _hasHostAttributes(...attributes: string[]) {
    return attributes.some((attribute) => this._getHostElement().hasAttribute(attribute));
  }

  private _isRippleDisabled(): boolean {
    return this.disableRipple || this.disabled;
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
    return this.disabled ? -1 : this.tabIndex || 0;
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

  constructor(focusMonitor: FocusMonitor, elementRef: ElementRef, @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode: string) {
    super(elementRef, focusMonitor, animationMode);
  }
}
