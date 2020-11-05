import { Injectable } from '@angular/core';
import { AdapterInterface } from '@core/http-adapters/adapter.interface';
import { AddressInterface } from '../interfaces/address.interface';
import { ApiAddressInterface } from '../interfaces/api-address.interface';

@Injectable()
export class AddressApiAdapter implements AdapterInterface<AddressInterface> {
  public adapt(data: ApiAddressInterface): AddressInterface {
    return {
      street: data.street,
      suite: data.suite,
      city: data.city,
      zipcode: data.zipcode,
      geo: data.geo,
    };
  }
}
