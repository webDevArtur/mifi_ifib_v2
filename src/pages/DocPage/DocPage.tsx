import React from "react";
import { useParams } from "react-router-dom";
import { Spin, Typography, Alert } from "antd";
import { useDocContent } from "hooks/useDocContent";
import styles from "./DocPage.module.scss";

const { Title } = Typography;

const DocPage: React.FC = () => {
  const { category, filename } = useParams<{ category: string; filename: string }>();

  const { data: htmlContent, isLoading, error } = useDocContent(category, filename);

  if (isLoading) return <Spin size="large" />;
  if (error) return <Alert message={String(error)} type="error" showIcon />;

  return (
    <div className={styles.docPage}>
      <Title level={2}>{filename}</Title>
      {htmlContent ? (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ) : (
        <Alert message="Не удалось загрузить документ" type="error" showIcon />
      )}
    </div>
  );
};

export default DocPage;
