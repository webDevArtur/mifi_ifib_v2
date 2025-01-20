import { useEffect } from "react";
import PDFViewer from "./components/PdfViewer/PdfViewer";
import { Link, useParams } from "react-router-dom";
import { Skeleton } from "antd";
import { useArticles } from "hooks/useArticles";
import { useArticleAsRead } from "hooks/useArticleAsRead";
import { useAuth } from "hooks/AuthProvider";
import styles from "./ArticleDetailsPage.module.scss";
import cover from "./assets/cover.png";
import RegistrationBlock from "components/RegistrationBlock/RegistrationBlock";

const ArticleDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useArticles([Number(id)]);
  const { isAuthenticated } = useAuth();
  const { mutate: markAsRead } = useArticleAsRead();

  useEffect(() => {
    if (isAuthenticated && id) {
      markAsRead(Number(id));
    }
  }, [isAuthenticated, id, markAsRead]);

  const article = data?.items.find((item) => item.id === Number(id));

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link to="/">Главная</Link> /{" "}
          <Link to="/introduction">Введение в медицинскую физику</Link> /{" "}
          <Link to="/articles">Научно-популярные статьи</Link> /
         </div>

          <div className={styles.articleHeader}>
            <div className={styles.articleContainer}>
              <Skeleton.Button className={styles.skeletonImage} />
              <div className={styles.articleInfo}>
                <Skeleton.Input className={styles.skeletonTitle} active />
                <Skeleton active paragraph={{ rows: 2 }} className={styles.skeletonText} />
              </div>
            </div>
          </div>

          <Skeleton.Button active className={styles.skeletonPdf} />

          <RegistrationBlock />
      </div>
    );
  }

  if (error || !article) {
    return <div>Статья не найдена или произошла ошибка загрузки.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> /{" "}
        <Link to="/introduction">Введение в медицинскую физику</Link> /{" "}
        <Link to="/articles">Научно-популярные статьи</Link> /
      </div>

      <div className={styles.articleHeader}>
        <div className={styles.articleContainer}>
          <img
            src={article.cover || cover}
            alt={article.name || "Статья"}
            className={styles.articleImage}
            onError={(e) => {
              (e.target as HTMLImageElement).src = cover; 
            }}
          />

          <div className={styles.articleInfo}>
            <h1>{article.name}</h1>
            <p className={styles.author}>{article.author}</p>
            <p className={styles.description}>{article.description}</p>
          </div>
        </div>
      </div>

      {article.document && (
        <PDFViewer file={article.document} />
      )}

      <RegistrationBlock />
    </div>
  );
};

export default ArticleDetailsPage;
