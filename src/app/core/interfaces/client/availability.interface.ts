import { DayOfWeekShortCodeEnum } from '../../enums/day-of-week-short-code.enum';

export interface AvailabilityInterface {
  dayOfWeek: DayOfWeekShortCodeEnum;
  hourStart: number;
  minuteStart: number;
  hourEnd: number;
  minuteEnd: number;
}
