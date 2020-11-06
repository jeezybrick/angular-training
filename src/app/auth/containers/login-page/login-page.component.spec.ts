import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  // Alternative option for spy on router
  // let mockRouter = {
  //   navigate: jasmine.createSpy('navigate')
  // };
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      declarations: [ LoginPageComponent ],
     // providers: [{ provide: Router, useValue: mockRouter }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe( 'Setup component', () => {
    describe( 'ngOnInit', () => {

      it( 'should call setForm method', () => {
        expect(component.form).toBeUndefined();
        component.ngOnInit();

        expect(component.form).toBeTruthy();
      });

    });
  });

  describe( 'nameControl', () => {

    it( 'should return truthy value', () => {
      component.ngOnInit();
      expect(component.nameControl).toBeTruthy();
    });

  });

  describe( 'form', () => {

    describe( 'form instance', () => {
      it( 'should be NOT valid by default', () => {
        component.ngOnInit();
        expect(component.form.valid).toBeFalsy();
      });

      it( 'should be valid if name field is valid', () => {
        component.ngOnInit();

        const nameControl = component.nameControl;
        nameControl.setValue('123');

        expect(component.form.valid).toBeTruthy();
      });

    });

    describe( 'name field', () => {

      it( 'should have "required" error if empty', () => {
        component.ngOnInit();
        const nameControl = component.nameControl;
        nameControl.setValue('');

        expect(nameControl.hasError('required')).toBeTruthy();
      });

      it( 'should have "maxlength" error if more than 6 chars', () => {
        component.ngOnInit();
        const nameControl = component.nameControl;
        nameControl.setValue('1234567');

        expect(nameControl.hasError('maxlength')).toBeTruthy();
      });

      it( 'should NOT have errors if less than 6 chars and more than 1', () => {
        component.ngOnInit();
        const nameControl = component.nameControl;
        nameControl.setValue('1234');

        expect(nameControl.valid).toBeTruthy();
      });

    });

  });

  describe( 'onSubmit', () => {
    it( 'should NOT navigate to users page if form is invalid', () => {
      component.ngOnInit();
      component.onSubmit();

      const navigateSpy = spyOn(router, 'navigate');
      expect(navigateSpy).not.toHaveBeenCalledWith(['/users']);
      // expect(mockRouter.navigate).not.toHaveBeenCalledWith(['/users']);
    });

    it('should navigate to users page if form is valid', () => {
      component.ngOnInit();
      const nameControl = component.nameControl;
      const navigateSpy = spyOn(router, 'navigate');

      nameControl.setValue('1234');
      component.onSubmit();

      expect(navigateSpy).toHaveBeenCalledWith(['/users']);
      // expect(mockRouter.navigate).toHaveBeenCalledWith(['/users']);
    });
  });



});
