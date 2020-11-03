import { ApiResponseStatusEnum } from '../../enums/api-response.status.enum';

export interface ApiErrorResponseInterface {
  status: ApiResponseStatusEnum.error;
  errors: {
    [key: string]: string[] | string;
  };
}
