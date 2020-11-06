import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersService } from '@app/users/services/users.service';
import { Observable, of } from 'rxjs';
import { UserInterface } from '@app/users/interfaces/user.interface';
import { RouterTestingModule } from '@angular/router/testing';
import { UserDetailPageComponent } from '@app/users/containers/user-detail-page/user-detail-page.component';

const mockUser = {id: 123} as UserInterface;
class MockUsersService {
  getDetail(userId: number): Observable<UserInterface> {
    return of(mockUser);
  }
}

describe('UserDetailPageComponent', () => {
  let component: UserDetailPageComponent;
  let fixture: ComponentFixture<UserDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UserDetailPageComponent],
      providers: [{ provide: UsersService, useClass: MockUsersService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Setup component', () => {

    describe('ngOnInit', () => {
      it('should assign to user$ UsersService.getDetail(id) observable', () => {
        component.ngOnInit();
        expect(component.user$).toBeTruthy();
      });

    });

  });

});
