import { StatusDot } from "../StatusDot";
import { cls } from "../extra/utils";
import styles from "./StatusMessage.module.css";

const statusToMessageClassName = {
  available: "text-available",
  unavailable: "text-unavailable",
};

export const StatusMessage = ({ status }) => {
  const message = status === "available" ? "Available" : "Unavailable";

  return (
    <div className={styles.message}>
      <StatusDot status={status} />
      <div className={cls(statusToMessageClassName[status])}>{message}</div>
    </div>
  );
};
