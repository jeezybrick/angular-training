import { Injectable } from '@angular/core';
import { ApiUserInterface } from '../interfaces/api-user.interface';
import { UserInterface } from '../interfaces/user.interface';
import { AdapterInterface } from '@core/http-adapters/adapter.interface';
import { UserDetailApiAdapter } from '@app/users/http-adapters/user-detail-api.adapter';

@Injectable()
export class UsersListApiAdapter implements AdapterInterface<UserInterface[]> {
  constructor(private userDetailApiAdapter: UserDetailApiAdapter) {}

  public adapt(data: ApiUserInterface[]): UserInterface[] {
    return data.map((item) => this.userDetailApiAdapter.adapt(item));
  }
}
