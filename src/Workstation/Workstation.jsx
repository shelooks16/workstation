import { useState } from "react";
import styles from "./Workstation.module.css";
import { useWorkstation } from "./useWorkstation";
import { StatusMessage } from "../StatusMessage";
import { TimeTable } from "../TimeTable";
import { useWorkstationTimetable } from "./useWorkstationTimetable";

const WorkstationTimetable = ({ id }) => {
  const {
    workstationTimetable,
    workstationTimetableError,
    isWorkstationTimetableLoading,
  } = useWorkstationTimetable(id);

  const [showTimeTable, setShowTimeTable] = useState(false);

  return (
    <div>
      <button
        className="btn"
        onClick={() => setShowTimeTable((s) => !s)}
        disabled={isWorkstationTimetableLoading || workstationTimetableError}
      >
        {showTimeTable ? "Hide reservation times" : "Show reservation times"}
      </button>
      {!!workstationTimetableError && (
        <div>Timetable error: {workstationTimetableError.message}</div>
      )}
      {showTimeTable && !!workstationTimetable && (
        <div className={styles.timetableWrapper}>
          <TimeTable
            unavailableDateTimes={workstationTimetable.unavailableDateTimes}
            timeZone={workstationTimetable.timeZone}
            maxDate={workstationTimetable.maxAvailableDate}
            tableContainerClassName={styles.timetable}
            onDayClick={(data) => alert(JSON.stringify(data))}
          />
        </div>
      )}
    </div>
  );
};

export const Workstation = ({ id }) => {
  const { workstation, workstationError } = useWorkstation(id);

  const markup = () => {
    if (workstationError) {
      return (
        <div>
          <h3>Failed to load workstation</h3>
          <div>{workstationError.message}</div>
        </div>
      );
    }

    if (workstation) {
      return (
        <>
          <div>
            <div className={styles.titleSection}>
              <h2 className={styles.wsId}>{workstation.id}</h2>
              <div className={styles.wsDeskNumber}>
                Desk {workstation.deskNumber}
              </div>
            </div>
            <StatusMessage
              status={workstation.isReserved ? "unavailable" : "available"}
            />
          </div>
          <div className={styles.footer}>
            <WorkstationTimetable id={id} />
          </div>
        </>
      );
    }

    return <div>Loading...</div>;
  };

  return <div className={styles.container}>{markup()}</div>;
};
