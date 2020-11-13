import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

// tslint:disable-next-line:no-conflicting-lifecycle
@Component({
  selector: 'my-hooks',
  templateUrl: './hooks.component.html',
  styleUrls: ['./hooks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HooksComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
  public primitive: string = '123';
  public arr: string[] = ['1'];
  public obj: { name: string; email: string } = { name: 'Lal', email: '1@gmail.com' };

  constructor() {
    console.log('my-hooks - constructor');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log('my-hooks - ngOnChanges');
  }

  public ngOnInit(): void {
    console.log('my-hooks - ngOnInit');
  }

  public ngDoCheck(): void {
    console.log('my-hooks - ngDoCheck');
  }

  public ngAfterContentInit(): void {
    console.log('my-hooks - ngAfterContentInit');
  }

  public ngAfterContentChecked(): void {
    console.log('my-hooks - ngAfterContentChecked');
  }

  public ngAfterViewInit(): void {
    console.log('my-hooks - ngAfterViewInit');
  }

  public ngAfterViewChecked(): void {
    console.log('my-hooks - ngAfterViewChecked');
  }

  public changePrimitive(): void {
    this.primitive = 'Changed';
  }

  public changeArrByMutation(): void {
    this.arr.push('Added');
  }

  public changeArr(): void {
    this.arr = ['changed'];
  }

  public changeObj(): void {
    this.obj = { name: 'Changed', email: 'chnaged@gmail.com' };
  }

  public changeObjProp(): void {
    this.obj.name = 'Changed';
  }
}
