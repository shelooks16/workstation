import { cls } from "../extra/utils";
import styles from "./StatusDot.module.css";

const statusToDotClassName = {
  available: "bg-available",
  unavailable: "bg-unavailable",
};

export const StatusDot = ({ status }) => {
  return <span className={cls(styles.dot, statusToDotClassName[status])} />;
};
