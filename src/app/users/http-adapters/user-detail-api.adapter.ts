import { Injectable } from '@angular/core';
import { ApiUserInterface } from '../interfaces/api-user.interface';
import { UserInterface } from '../interfaces/user.interface';
import { AdapterInterface } from '@core/http-adapters/adapter.interface';
import { AddressApiAdapter } from './address-api.adapter';
import { CompanyApiAdapter } from './company-api.adapter';

@Injectable()
export class UserDetailApiAdapter implements AdapterInterface<UserInterface> {

  constructor(private addressApiAdapter: AddressApiAdapter, private companyApiAdapter: CompanyApiAdapter) {
  }
  public adapt(data: ApiUserInterface): UserInterface {
    return {
      id: data.id,
      name: data.name,
      username: data.username,
      email: data.email,
      address: this.addressApiAdapter.adapt(data.address),
      phone: data.phone,
      website: data.website,
      company: this.companyApiAdapter.adapt(data.company)
    };
  }
}
