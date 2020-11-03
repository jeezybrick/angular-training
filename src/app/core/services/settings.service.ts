import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiAvailabilityInterface } from '../interfaces/api/api-availability.interface';
import { AvailabilityApiAdapter } from '../http-adapters/availability-api.adapter';
import { AvailabilityInterface } from '../interfaces/client/availability.interface';
import { ApiResponseInterface } from '../interfaces/api/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(
    @Inject(HttpClient) private http: HttpClient,
    private availabilityApiAdapter: AvailabilityApiAdapter,
  ) {
  }

  public getAvailability(): Observable<AvailabilityInterface[]> {
    return this.http.get<ApiResponseInterface<ApiAvailabilityInterface[]>>('/api/v1/user/lesson-availability').pipe(
      map(response => response.data),
      map(data => this.availabilityApiAdapter.adapt(data)),
    );
  }

}
