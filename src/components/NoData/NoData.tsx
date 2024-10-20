import noData from "../../assets/noData.png";
import styles from "./NoData.module.scss";

export const NoData = () => {
  return (
    <div className={styles.noResults}>
      <img src={noData} alt="noData" className={styles.noDataImage} />
      Ничего не найдено
    </div>
  );
};
