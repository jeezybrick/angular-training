import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UsersListApiAdapter } from '@app/users/http-adapters/users-list-api.adapter';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserInterface } from '@app/users/interfaces/user.interface';
import { ApiUserInterface } from '@app/users/interfaces/api-user.interface';
import { UserDetailApiAdapter } from '@app/users/http-adapters/user-detail-api.adapter';

@Injectable()
export class UsersService {

  constructor(@Inject(HttpClient) private http: HttpClient,
              private usersListApiAdapter: UsersListApiAdapter,
              private userDetailApiAdapter: UserDetailApiAdapter) { }

  public getList(): Observable<UserInterface[]> {
    return this.http
      .get<ApiUserInterface[]>('/users')
      .pipe(
        map(data => this.usersListApiAdapter.adapt(data)),
      );
  }

  public getDetail(userId: number): Observable<UserInterface> {
    return this.http
      .get<ApiUserInterface>(`/users/${userId}`)
      .pipe(
        map(data => this.userDetailApiAdapter.adapt(data)),
      );
  }
}
