import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

// tslint:disable-next-line:no-conflicting-lifecycle
@Component({
  selector: 'my-hooks-one',
  templateUrl: './hooks-one.component.html',
  styleUrls: ['./hooks-one.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HooksOneComponent
  implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
  @Input() primitive: string;
  @Input() arr: string[];
  @Input() obj: { name: string; email: string };

  @ViewChild('wrapper') wrapper: ElementRef;
  @ContentChild('parentContent') content: ElementRef;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    console.log('my-hooks-one - constructor');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log('my-hooks-one - ngOnChanges');
  }

  public ngOnInit(): void {
    console.log('my-hooks-one - ngOnInit');
  }

  public ngDoCheck(): void {
    console.log('my-hooks-one - ngDoCheck');
    // this.changeDetectorRef.markForCheck();
  }

  public ngAfterContentInit(): void {
    console.log('my-hooks-one - ngAfterContentInit - wrapper', this.wrapper);
    console.log('my-hooks-one - ngAfterContentInit - content', this.content);
  }

  public ngAfterContentChecked(): void {
    console.log('my-hooks-one - ngAfterContentChecked');
  }

  public ngAfterViewInit(): void {
    console.log('my-hooks-one - ngAfterViewInit - wrapper', this.wrapper);
    console.log('my-hooks-one - ngAfterViewInit - content', this.content);
  }

  public ngAfterViewChecked(): void {
    console.log('my-hooks-one - ngAfterViewChecked');
  }
}
