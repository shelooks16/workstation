import { useEffect, useState } from "react";
import { workstationApi } from "./apiMock";

export const useWorkstation = (id) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  const refetch = async () => {
    setError(null);

    try {
      const data = await workstationApi.getById(id);
      setData(data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    refetch();
  }, [id]);

  return {
    isWorkstationLoading: data === undefined && !error,
    workstation: data,
    workstationError: error,
    refetchWorkstation: refetch,
  };
};
