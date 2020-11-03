import { Component, OnInit } from '@angular/core';
import { ReplayControlValueChanges } from '@helpers/replay-control-value-changes';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'my-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public formControl: FormControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
    const value$ = new ReplayControlValueChanges(this.formControl).subscribe();
  }

}
