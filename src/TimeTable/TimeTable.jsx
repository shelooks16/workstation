import { useMemo, useState } from "react";
import { cls, numberRange } from "../extra/utils";
import { DateManager } from "../extra/date.manager";
import { TimeManager } from "../extra/time.manager";
import styles from "./TimeTable.module.css";

const timeArray = TimeManager.generateTimesArray({ interval: 30 });

export const TimeTable = ({
  startWeekFromDayIdx = 1,
  tableContainerClassName = "",
  unavailableDateTimes = [],
  timeZone = "",
  maxDate = "",
  onDayClick,
}) => {
  const timeZoneWithFallback = timeZone || DateManager.userTimeZone();

  const [visibleWeek, setVisibleWeek] = useState(() =>
    DateManager.d().tz(timeZoneWithFallback)
  );

  const daysOfWeek = useMemo(
    () =>
      numberRange(startWeekFromDayIdx, 7).concat(
        numberRange(7, 7 + startWeekFromDayIdx)
      ),
    [startWeekFromDayIdx]
  );

  const isPrevDisabled = visibleWeek.isSame(
    DateManager.d().tz(timeZoneWithFallback),
    "week"
  );
  const isNextDisabled =
    maxDate &&
    visibleWeek.isSame(DateManager.d(maxDate).tz(timeZoneWithFallback), "week");

  const handleNextWeekClick = () => {
    setVisibleWeek((c) => c.add(1, "week"));
  };
  const handlePrevWeekClick = () => {
    setVisibleWeek((c) => c.subtract(1, "week"));
  };
  const handleTodayClick = () => {
    setVisibleWeek(DateManager.d().tz(timeZoneWithFallback));
  };
  const handleDayClick = (weekDayIdx, time) => {
    if (!onDayClick) return;

    const date = makeDateFromCell(weekDayIdx, time);

    if (!isDateDisabled(date)) {
      onDayClick({
        date: date.format("YYYY-MM-DD"),
        time,
      });
    }
  };

  const formattedDaysOfWeek = daysOfWeek.map((idx) => ({
    date: visibleWeek.set("day", idx).format("DD/MM"),
    weekLabel: visibleWeek.set("day", idx).format("dd"),
  }));

  const makeDateFromCell = (weekDayIdx, time) => {
    const final = visibleWeek
      .set("day", weekDayIdx + startWeekFromDayIdx)
      .tz(timeZoneWithFallback);

    if (time) {
      return final.set("hour", time.hours).set("minute", time.minutes);
    }

    return final;
  };

  const isDateUnavailable = (date) =>
    unavailableDateTimes.some((dateTime) => {
      const unavailableDate = DateManager.d(dateTime.date).tz(
        timeZoneWithFallback,
        true
      );

      const from = unavailableDate
        .set("hour", dateTime.from.hours)
        .set("minute", dateTime.from.minutes);
      const to = unavailableDate
        .set("hour", dateTime.to.hours)
        .set("minute", dateTime.to.minutes);

      return date.isAfter(from) && date.isBefore(to);
    });

  const isDateDisabled = (date) =>
    date.isBefore(DateManager.d()) || (maxDate && date.isAfter(maxDate));

  const dayClassNames = (weekDayIdx, time) => {
    const date = makeDateFromCell(weekDayIdx, time);
    const isDisabled = isDateDisabled(date);

    const classes = [];

    if (isDateUnavailable(date) && !isDisabled) {
      classes.push(styles.notAvailable);
    }

    if (isDisabled) {
      classes.push(styles.disabled);
    }

    return classes.join(" ");
  };

  const isToday = (weekDayIdx) =>
    makeDateFromCell(weekDayIdx).isSame(
      DateManager.d().tz(timeZoneWithFallback),
      "date"
    );

  return (
    <div className={styles.container}>
      <div className={styles.navs}>
        <button
          className="btn btn-sm"
          onClick={handlePrevWeekClick}
          disabled={isPrevDisabled}
        >
          Prev week
        </button>
        <button className="btn btn-sm" onClick={handleTodayClick}>
          Today
        </button>
        <button
          className="btn btn-sm"
          onClick={handleNextWeekClick}
          disabled={isNextDisabled}
        >
          Next week
        </button>
      </div>

      <div className={tableContainerClassName}>
        <table className={styles.timeTable}>
          <thead>
            <tr>
              <th />
              {formattedDaysOfWeek.map((formatted, idx) => (
                <th
                  key={formatted.date}
                  className={cls(isToday(idx) && styles.today)}
                >
                  {formatted.date}
                  <div>{formatted.weekLabel}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {timeArray.map((time) => (
              <tr key={time.hours + time.minutes}>
                <td className={styles.hours}>{TimeManager.formatTime(time)}</td>
                {Array(7)
                  .fill(null)
                  .map((_, weekDayIdx) => (
                    <td
                      key={weekDayIdx}
                      className={dayClassNames(weekDayIdx, time)}
                      onClick={() => handleDayClick(weekDayIdx, time)}
                    />
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={styles.notAvailableBox} /> Time not available
        </div>
      </div>
    </div>
  );
};
