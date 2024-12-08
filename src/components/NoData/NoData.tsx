import React from "react";
import noData from "../../assets/noData.gif";
import styles from "./NoData.module.scss";

interface NoDataProps {
  text?: string;
}

export const NoData: React.FC<NoDataProps> = ({ text = "Список пуст" }) => {
  return (
    <div className={styles.noResults}>
      <img src={noData} alt="noData" className={styles.noDataImage} />
      <p className={styles.noDataText}>{text}</p>
    </div>
  );
};
