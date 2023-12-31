import { DateManager } from "../extra/date.manager";
import { waitSome } from "../extra/utils";

export const workstationApi = {
  getById: async (id) => {
    await waitSome(500);

    return {
      id,
      deskNumber: 15,
      isReserved: Math.random() < 0.5,
    };
  },
  getTimeTableById: async (id) => {
    await waitSome(1000);

    const timeZone = "Europe/London";

    return {
      id,
      timeZone,
      maxAvailableDate: DateManager.d()
        .tz(timeZone)
        .add(5, "days")
        .format("YYYY-MM-DD"),
      unavailableDateTimes: [
        {
          date: "2023-10-28",
          from: {
            hours: 15,
            minutes: 0,
          },
          to: {
            hours: 15,
            minutes: 30,
          },
        },
        {
          date: DateManager.d().add(1, "day").format("YYYY-MM-DD"),
          from: {
            hours: 5,
            minutes: 30,
          },
          to: {
            hours: 10,
            minutes: 0,
          },
        },
        {
          date: DateManager.d().add(3, "day").format("YYYY-MM-DD"),
          from: {
            hours: 8,
            minutes: 30,
          },
          to: {
            hours: 16,
            minutes: 0,
          },
        },
        {
          date: DateManager.d().add(3, "day").format("YYYY-MM-DD"),
          from: {
            hours: 1,
            minutes: 30,
          },
          to: {
            hours: 2,
            minutes: 0,
          },
        },
      ],
    };
  },
};
