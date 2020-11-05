import { ApiAddressInterface } from './api-address.interface';
import { ApiCompanyInterface } from './api-company.interface';

export interface ApiUserInterface {
  id: number;
  name: string;
  username: string;
  email: string;
  address: ApiAddressInterface;
  phone: string;
  website: string;
  company: ApiCompanyInterface;
}
