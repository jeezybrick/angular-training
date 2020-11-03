import { ApiResponseStatusEnum } from '../../enums/api-response.status.enum';

export interface ApiResponseInterface<T> {
  message: string | null;
  data: T;
  status: ApiResponseStatusEnum.success | ApiResponseStatusEnum.error;
}
