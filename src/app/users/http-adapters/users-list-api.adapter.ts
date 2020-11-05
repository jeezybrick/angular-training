import { Injectable } from '@angular/core';
import { ApiUserInterface } from '../interfaces/api-user.interface';
import { UserInterface } from '../interfaces/user.interface';
import { AdapterInterface } from '@core/http-adapters/adapter.interface';
import { AddressApiAdapter } from './address-api.adapter';
import { CompanyApiAdapter } from './company-api.adapter';

@Injectable()
export class UsersListApiAdapter implements AdapterInterface<UserInterface[]> {

  constructor(private addressApiAdapter: AddressApiAdapter, private companyApiAdapter: CompanyApiAdapter) {
  }
  public adapt(data: ApiUserInterface[]): UserInterface[] {
    return data.map(item => {
      return {
        id: item.id,
        name: item.name,
        username: item.username,
        email: item.email,
        address: this.addressApiAdapter.adapt(item.address),
        phone: item.phone,
        website: item.website,
        company: this.companyApiAdapter.adapt(item.company)
      };
    });
  }
}
