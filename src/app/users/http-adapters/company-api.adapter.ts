import { Injectable } from '@angular/core';
import { AdapterInterface } from '@core/http-adapters/adapter.interface';
import { ApiCompanyInterface } from '../interfaces/api-company.interface';
import { CompanyInterface } from '../interfaces/company.interface';

@Injectable()
export class CompanyApiAdapter implements AdapterInterface<CompanyInterface> {
  public adapt(data: ApiCompanyInterface): CompanyInterface {
    return {
      name: data.name,
      catchPhrase: data.catchPhrase,
      bs: data.bs,
    };
  }
}
