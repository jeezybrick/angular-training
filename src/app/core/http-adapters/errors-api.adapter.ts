import { Injectable } from '@angular/core';
import { AdapterInterface } from './adapter.interface';
import { ErrorModel } from '../models/error.model';
import { ApiErrorResponseInterface } from '../interfaces/api/api-error-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ErrorsApiAdapter implements AdapterInterface<ErrorModel> {
  public adapt(data: ApiErrorResponseInterface): ErrorModel {
    const exceptionMessage = data.errors.exception as string | null;
    const formErrors = data.errors;
    return new ErrorModel(exceptionMessage, { ...formErrors, exception: undefined });
  }
}
