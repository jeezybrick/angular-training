import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UsersListApiAdapter } from '@app/users/http-adapters/users-list-api.adapter';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserInterface } from '@app/users/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(@Inject(HttpClient) private http: HttpClient, private usersListApiAdapter: UsersListApiAdapter) { }

  public getList(): Observable<UserInterface[]> {
    return this.http
      .get<any>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map(data => this.usersListApiAdapter.adapt(data)),
      );
  }

  public getDetail(): Observable<any> {
    return of(true);
  }
}
