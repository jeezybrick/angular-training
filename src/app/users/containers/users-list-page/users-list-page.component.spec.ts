import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListPageComponent } from './users-list-page.component';
import { UsersService } from '@app/users/services/users.service';
import { Observable, of } from 'rxjs';
import { UserInterface } from '@app/users/interfaces/user.interface';
import { RouterTestingModule } from '@angular/router/testing';

const mockUser = { id: 123 } as UserInterface;
class MockUsersService {
  getList(): Observable<UserInterface[]> {
    return of([mockUser]);
  }
}

describe('UsersListPageComponent', () => {
  let component: UsersListPageComponent;
  let fixture: ComponentFixture<UsersListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UsersListPageComponent],
      providers: [{ provide: UsersService, useClass: MockUsersService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Setup component', () => {
    describe('ngOnInit', () => {
      it('should assign to users$ UsersService.getList() observable', () => {
        component.ngOnInit();
        expect(component.users$).toBeTruthy();
      });
    });

    describe('trackByFn', () => {
      it('should return item id', () => {
        component.ngOnInit();
        expect(component.trackByFn(1, mockUser)).toBe(mockUser.id);
      });
    });
  });
});
