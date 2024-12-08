import { useParams, Link } from "react-router-dom";
import { NoData } from "components/NoData/NoData";
import { usePractices } from "hooks/usePracticum";
import { Skeleton } from 'antd';
import styles from "./PracticumDetailsPage.module.scss";
import { practicumTitles, PracticumKeys, practicumDescriptions } from "catalogs/practicums";
import IframeWithLoader from "components/IframeWithLoader/IframeWithLoader";

const PracticumDetailsPage = () => {
  const { id } = useParams<{ id: PracticumKeys }>();
  if (!id) {
    return <div>Ошибка: id не удалось получить</div>;
  }

  const { data: practices, isLoading } = usePractices(undefined, [id]);

  const practicumTitle = id ? practicumTitles[id] : "Неизвестный практикум";
  const practicumDescription = practicumDescriptions[id] || "";

  if (isLoading) {
    return (
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link to="/">Главная</Link> / <Link to="/practicum">Практикум</Link> /{" "}
          <Skeleton.Button className={styles.skeletonBreadcrumb} active={true} />
        </nav>

        <h1 className={styles.h1}>
          <Skeleton.Input className={styles.skeletonTitle} active={true} size="large" />
        </h1>

        <p className={styles.description}>
          <Skeleton active paragraph={{ rows: 5 }} className={styles.skeletonDescription} />
        </p>

        <Skeleton.Button className={styles.skeletonContent} active />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/practicum">Практикум</Link> /{" "}
        {practicumTitle}
      </nav>

      <h1 className={styles.h1}>{practicumTitle}</h1>

      <p className={styles.description} dangerouslySetInnerHTML={{ __html: practicumDescription }} />

      {practices?.[0]?.link ? (
        <IframeWithLoader src={practices[0].link} />
      ) : (
        <NoData text="Практикум пуст" />
      )}

    </div>
  );
};

export default PracticumDetailsPage;
