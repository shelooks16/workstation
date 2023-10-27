import { Workstation } from "./Workstation";
import styles from "./WorkstationList.module.css";

export const WorkStationList = () => {
  return (
    <div className={styles.list}>
      <Workstation id="GehybvWork" />
      <Workstation id="IdxzgStation" />
      <Workstation id="Asbn7nda" />
      <Workstation id="HzcGsge3" />
    </div>
  );
};
