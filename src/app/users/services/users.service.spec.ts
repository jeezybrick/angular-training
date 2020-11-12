import { getTestBed, TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersListApiAdapter } from '@app/users/http-adapters/users-list-api.adapter';
import { UserDetailApiAdapter } from '@app/users/http-adapters/user-detail-api.adapter';
import { UserInterface } from '@app/users/interfaces/user.interface';

describe('UsersService', () => {
  let service: UsersService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  const mockUsers: UserInterface[] = [{ id: 1 }, { id: 2 }] as UserInterface[];
  const mockUser: UserInterface = mockUsers[0];
  const emsg = 'simulated network error';
  const mockError = new ErrorEvent('Network error', {
    message: emsg,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UsersService,
        { provide: UsersListApiAdapter, useValue: { adapt: jest.fn().mockReturnValue(mockUsers) } },
        { provide: UserDetailApiAdapter, useValue: { adapt: jest.fn().mockReturnValue(mockUser) } },
      ],
    });
    injector = getTestBed();

    service = injector.inject(UsersService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getList', () => {
    it('should return an Observable<UserInterface[]>', (done) => {
      service.getList().subscribe((users) => {
        expect(users.length).toBe(2);
        expect(users).toEqual(mockUsers);
        done();
      });

      const req = httpMock.expectOne(`/users`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });

    it('should return an error', (done) => {
      service.getList().subscribe({
        error: (error) => {
          expect(error).toBeDefined();
          done();
        },
      });

      const req = httpMock.expectOne(`/users`);
      expect(req.request.method).toBe('GET');
      req.error(mockError);
    });
  });

  describe('#getDetail', () => {
    it('should return an Observable<UserInterface>', (done) => {
      service.getDetail(mockUser.id).subscribe((user) => {
        expect(user).toEqual(mockUser);
        done();
      });

      const req = httpMock.expectOne(`/users/${mockUser.id}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });

    it('should return an error', (done) => {
      service.getDetail(mockUser.id).subscribe({
        error: (error) => {
          expect(error).toBeDefined();
          done();
        },
      });

      const req = httpMock.expectOne(`/users/${mockUser.id}`);
      expect(req.request.method).toBe('GET');
      req.error(mockError);
    });
  });
});
