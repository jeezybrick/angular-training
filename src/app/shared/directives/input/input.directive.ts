import { Directive, DoCheck, ElementRef, HostBinding, HostListener, Input, NgZone, Optional, Self } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { getSupportedInputTypes, Platform } from '@angular/cdk/platform';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

// Invalid input type. Using one of these will throw an MatInputUnsupportedTypeError.
const MY_INPUT_INVALID_TYPES = [
  'button',
  'checkbox',
  'file',
  'hidden',
  'image',
  'radio',
  'range',
  'reset',
  'submit'
];

let nextUniqueId = 0;

// Boilerplate for applying mixins to MatInput.
/** @docs-private */
class MatInputBase {
  // tslint:disable-next-line:variable-name
  constructor(public _parentForm: NgForm,
              // tslint:disable-next-line:variable-name
              public _parentFormGroup: FormGroupDirective,
              /** @docs-private */
              public ngControl: NgControl) {
  }
}


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: `input[myInput], textarea[myInput]`,
  exportAs: 'myInput',
})
export class InputDirective extends MatInputBase implements DoCheck {
  @HostBinding('class.my-input-element')
  public get addBaseClass(): boolean {
    return true;
  }

  @HostBinding('attr.readonly')
  public get attrReadonly(): boolean | null {
    return this.readonly && !this._isNativeSelect || null;
  }

  @HostBinding('attr.aria-required')
  public get attrAriaRequired(): string {
    return this.readonly.toString();
  }


  @HostBinding('[disabled]') @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  @HostBinding('attr.id') @Input()
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value || this._uid;
  }

  @HostBinding('[required]') @Input()
  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }

  @Input()
  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value || 'text';
    this._validateType();

    // When using Angular inputs, developers are no longer able to set the properties on the native
    // input element. To ensure that bindings for `type` work, we need to sync the setter
    // with the native property. Textarea elements don't support the type property or attribute.
    if (!this._isTextarea && getSupportedInputTypes().has(this._type)) {
      (this._elementRef.nativeElement as HTMLInputElement).type = this._type;
    }
  }

  @Input()
  get value(): string {
    return this._value;
  }

  set value(value: string) {
    if (value !== this.value) {
      this._value = value;
    }
  }

  /** Whether the element is readonly. */
  @Input()
  get readonly(): boolean {
    return this._readonly;
  }

  set readonly(value: boolean) {
    this._readonly = coerceBooleanProperty(value);
  }


  constructor(
    // tslint:disable-next-line:variable-name
    protected _elementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    // tslint:disable-next-line:variable-name
    protected _platform: Platform,
    @Optional() @Self() public ngControl: NgControl,
    // tslint:disable-next-line:variable-name
    @Optional() _parentForm: NgForm,
    // tslint:disable-next-line:variable-name
    @Optional() _parentFormGroup: FormGroupDirective,
    ngZone: NgZone,
  ) {
    super(_parentForm, _parentFormGroup, ngControl);

    const element = this._elementRef.nativeElement;
    const nodeName = element.nodeName.toLowerCase();

    this._previousNativeValue = this.value;

    // Force setter to be called in case id was not specified.
    this.id = this.id;

    // On some versions of iOS the caret gets stuck in the wrong place when holding down the delete
    // key. In order to get around this we need to "jiggle" the caret loose. Since this bug only
    // exists on iOS, we only bother to install the listener on iOS.
    if (_platform.IOS) {
      ngZone.runOutsideAngular(() => {
        _elementRef.nativeElement.addEventListener('keyup', (event: Event) => {
          const el = event.target as HTMLInputElement;
          if (!el.value && !el.selectionStart && !el.selectionEnd) {
            // Note: Just setting `0, 0` doesn't fix the issue. Setting
            // `1, 1` fixes it for the first time that you type text and
            // then hold delete. Toggling to `1, 1` and then back to
            // `0, 0` seems to completely fix it.
            el.setSelectionRange(1, 1);
            el.setSelectionRange(0, 0);
          }
        });
      });
    }

    this._isServer = !this._platform.isBrowser;
    this._isNativeSelect = nodeName === 'select';
    this._isTextarea = nodeName === 'textarea';
  }

  get empty(): boolean {
    return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput();
  }

  // tslint:disable-next-line:variable-name
  static ngAcceptInputType_disabled: BooleanInput;
  // tslint:disable-next-line:variable-name
  static ngAcceptInputType_required: BooleanInput;

  protected _uid = `my-input-${nextUniqueId++}`;
  protected _previousNativeValue: any;
  private _previousPlaceholder: string | null;

  @HostBinding('class.my-input-server') readonly _isServer: boolean;
  readonly _isNativeSelect: boolean;
  readonly _isTextarea: boolean;

  controlType = 'my-input';
  // tslint:disable-next-line:variable-name
  protected _disabled = false;
  // tslint:disable-next-line:variable-name
  protected _id: string;

  @HostBinding('data-placeholder') @Input() placeholder: string;
  // tslint:disable-next-line:variable-name
  protected _required = false;
  protected _type = 'text';

  @Input('aria-describedby') userAriaDescribedBy: string;
  protected _value: string;
  // tslint:disable-next-line:variable-name
  private _readonly = false;

  // tslint:disable-next-line:variable-name
  protected _neverEmptyInputTypes = [
    'date',
    'datetime',
    'datetime-local',
    'month',
    'time',
    'week'
  ].filter(t => getSupportedInputTypes().has(t));

  public ngDoCheck(): void {
    // We need to dirty-check and set the placeholder attribute ourselves, because whether it's
    // present or not depends on a query which is prone to "changed after checked" errors.
    this._dirtyCheckPlaceholder();
  }

  /** Focuses the input. */
  focus(options?: FocusOptions): void {
    this._elementRef.nativeElement.focus(options);
  }

  @HostListener('input')
  // tslint:disable-next-line:typedef
  _onInput() {
  }

  // tslint:disable-next-line:typedef
  private _dirtyCheckPlaceholder() {
    const placeholder = this.placeholder;
    if (placeholder !== this._previousPlaceholder) {
      const element = this._elementRef.nativeElement;
      this._previousPlaceholder = placeholder;
      placeholder ?
        element.setAttribute('placeholder', placeholder) : element.removeAttribute('placeholder');
    }
  }

  /** Make sure the input is a supported type. */
  // tslint:disable-next-line:typedef
  protected _validateType() {
    if (MY_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
      throw Error('Unsupported input type');
    }
  }

  /** Checks whether the input type is one of the types that are never empty. */
  // tslint:disable-next-line:typedef
  protected _isNeverEmpty() {
    return this._neverEmptyInputTypes.indexOf(this._type) > -1;
  }

  /** Checks whether the input is invalid based on the native validation. */
  // tslint:disable-next-line:typedef
  protected _isBadInput() {
    // The `validity` property won't be present on platform-server.
    const validity = (this._elementRef.nativeElement as HTMLInputElement).validity;
    return validity && validity.badInput;
  }

}
