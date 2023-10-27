import { numberRange } from "./utils";

export const TimeManager = {
  isSame(target, target2) {
    return (
      target &&
      target2 &&
      target.hours === target2.hours &&
      target.minutes === target2.minutes
    );
  },
  isBefore(target, pivot) {
    return (
      target.hours < pivot.hours ||
      (target.hours === pivot.hours && target.minutes < pivot.minutes)
    );
  },
  isAfter(target, pivot) {
    return (
      target.hours > pivot.hours ||
      (target.hours === pivot.hours && target.minutes > pivot.minutes)
    );
  },
  isInTimeRange(timeRange, time) {
    return (
      TimeManager.isAfter(time, timeRange.from) &&
      TimeManager.isBefore(time, timeRange.to)
    );
  },
  generateTimesArray(options = {}) {
    const { maxTime, minTime, interval = 30 } = options;

    const minuteIntervals = numberRange(0, 60 / interval).map(
      (t) => t * interval
    );

    const result = [];

    const min = minTime ?? { hours: 0, minutes: interval };
    const max = maxTime ?? { hours: 23, minutes: 59 };

    for (let hours = 0; hours < 24; hours++)
      minuteIntervals.forEach((minutes) => {
        const time = {
          hours,
          minutes,
        };

        if (
          !TimeManager.isBefore(time, min) &&
          !TimeManager.isAfter(time, max)
        ) {
          result.push(time);
        }
      });

    return result;
  },
  formatTime({ hours, minutes }) {
    const hh = hours < 10 ? "0" + hours : hours;
    const mm = minutes < 10 ? "0" + minutes : minutes;

    return `${hh}:${mm}`;
  },
};
