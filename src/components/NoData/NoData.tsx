import React from "react";
import noData from "../../assets/noData.gif";
import styles from "./NoData.module.scss";

interface NoDataProps {
  text?: string;
  hideImage?: boolean;
}

export const NoData: React.FC<NoDataProps> = ({ text = "Список пуст", hideImage = false }) => {
  return (
    <div className={styles.noResults}>
      {!hideImage && <img src={noData} alt="noData" className={styles.noDataImage} />}
      <p className={styles.noDataText}>{text}</p>
    </div>
  );
};
