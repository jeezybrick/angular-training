import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplayControlValueChanges } from '@helpers/replay-control-value-changes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private subs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.setForm();

    this.subs.push(new ReplayControlValueChanges(this.nameControl).subscribe(value => {}));
  }

  public ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.router.navigate(['/users']);
  }

  private setForm(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(6)]],
    });
  }

}
