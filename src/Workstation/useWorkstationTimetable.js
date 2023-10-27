import { useEffect, useState } from "react";
import { workstationApi } from "./apiMock";

export const useWorkstationTimetable = (workstationId) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  const refetch = async () => {
    setError(null);

    try {
      const data = await workstationApi.getTimeTableById(workstationId);
      setData(data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    refetch();
  }, [workstationId]);

  return {
    isWorkstationTimetableLoading: data === undefined && !error,
    workstationTimetable: data,
    workstationTimetableError: error,
    refetchWorkstationTimetable: refetch,
  };
};
