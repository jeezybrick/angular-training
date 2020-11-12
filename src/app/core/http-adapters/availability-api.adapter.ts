import { Injectable } from '@angular/core';
import { AdapterInterface } from './adapter.interface';
import { ApiAvailabilityInterface } from '../interfaces/api/api-availability.interface';
import { AvailabilityInterface } from '../interfaces/client/availability.interface';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityApiAdapter implements AdapterInterface<AvailabilityInterface[]> {
  public adapt(item: ApiAvailabilityInterface[]): AvailabilityInterface[] {
    return item.map((availability) => {
      return {
        dayOfWeek: availability.day_of_week,
        hourStart: availability.hour_start,
        hourEnd: availability.hour_end,
        minuteStart: availability.minute_start,
        minuteEnd: availability.minute_end,
      };
    });
  }
}
