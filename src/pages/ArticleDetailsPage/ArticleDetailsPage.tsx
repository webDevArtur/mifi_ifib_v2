import PDFViewer from "./components/PdfViewer/PdfViewer";
import { Link, useParams } from "react-router-dom";
import { Spin, Flex } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useArticleDetails } from "hooks/useArticleDetails";
import styles from "./ArticleDetailsPage.module.scss";
import cover from "./assets/cover.png";
import RegistrationBlock from "components/RegistrationBlock/RegistrationBlock";

const ArticleDetailsPage = () => {
  const { id } = useParams();
  const { data: article, isLoading } = useArticleDetails(Number(id));

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> /{" "}
        <Link to="/introduction">Введение в медицинскую физику</Link> /{" "}
        <Link to="/articles">Научно-популярные статьи</Link> /
      </div>

      <div className={styles.articleHeader}>
        {isLoading && (
          <Flex className={styles.spinner} justify="center" align="center">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </Flex>
        )}

        {article && (
          <div className={styles.articleContainer}>
            <img
              src={`https://cybernexvpn-stage.ru/${article?.coverUrl}` || cover}
              alt={article?.name || "Статья"}
              className={styles.articleImage}
            />

            <div className={styles.articleInfo}>
              <h1>{article?.name}</h1>
              <p className={styles.author}>{article?.author}</p>
              <p className={styles.description}>{article?.description}</p>
            </div>
          </div>
        )}
      </div>

      {article?.documentUrl && (
        <PDFViewer
          file={`https://cybernexvpn-stage.ru/${article?.documentUrl}`}
        />
      )}

      <RegistrationBlock />
    </div>
  );
};

export default ArticleDetailsPage;
