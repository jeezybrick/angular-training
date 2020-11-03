import { DayOfWeekShortCodeEnum } from '../../enums/day-of-week-short-code.enum';

export interface ApiAvailabilityInterface {
  day_of_week: DayOfWeekShortCodeEnum;
  hour_start: number;
  hour_end: number;
  minute_start: number;
  minute_end: number;
}
