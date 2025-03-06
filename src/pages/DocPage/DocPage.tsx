import React from "react";
import { useParams } from "react-router-dom";
import { NoData } from "components/NoData/NoData";
import { Skeleton, Alert } from "antd";
import { useDocContent } from "hooks/useDocContent";
import DocHeader from "./components/DocHeader/DocHeader";
import styles from "./DocPage.module.scss";

const DocPage: React.FC = () => {
  const { category, filename } = useParams<{ category: string; filename: string }>();

  const { data: htmlContent, isLoading, error } = useDocContent(category, filename);

  if (isLoading) {
    return (
      <div className={styles.docPage}>
        <Skeleton active paragraph={{ rows: 24 }} />
      </div>
    );
  }

  if (error) return <NoData text={`Мы стараемся сделать учебные материалы интересными... Скоро загрузим!`} />;

  return (
    <>
      <DocHeader />

      <div className={styles.docPage}>
        {htmlContent ? (
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        ) : (
          <Alert message="Не удалось загрузить документ" type="error" showIcon />
        )}
      </div>
    </>
  );
};

export default DocPage;
