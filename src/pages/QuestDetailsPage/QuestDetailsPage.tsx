import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import IframeWithLoader from "components/IframeWithLoader/IframeWithLoader";
import styles from "./QuestDetailsPage.module.scss";

const QuestDetailsPage = () => {
  const { name } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabFromURL = searchParams.get("tab") || "online";
  const [activeTab, setActiveTab] = useState(activeTabFromURL);

  useEffect(() => {
    setActiveTab(activeTabFromURL);
  }, [activeTabFromURL]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/quests">База знаний</Link> /{" "}
        <Link to={`/quests/${name}`}>{name}</Link>
      </div>

      <h1 className={styles.h1}>Квест</h1>

      <p className={styles.description}>
        В этом блоке вы узнаете, с чем сталкивается студент – медицинский физик
        во время обучения в ИФИБ НИЯУ МИФИ.
      </p>

      <p className={styles.description}>
        Для выполнения заданий вам необходимо быть зарегистрированными на
        платформе Stepik.
      </p>

      <p className={styles.description}>Выберите уровень сложности:</p>

      <div className={styles.tabsContainer}>
        <div className={styles.tabHeaders}>
          <button
            className={`${styles.tab} ${activeTab === "online" ? styles.active : ""}`}
            onClick={() => handleTabChange("online")}
          >
            Онлайн
          </button>
          <button
            className={`${styles.tab} ${activeTab === "offline" ? styles.active : ""}`}
            onClick={() => handleTabChange("offline")}
          >
            Оффлайн
          </button>
        </div>

        <div>
          {activeTab === "online" && (
            <IframeWithLoader src="https://stepik.org/course/67/syllabus" />
          )}
          {activeTab === "offline" && (
            <p className={styles.description}>
              Здесь будет информация о оффлайн заданиях и материалах.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestDetailsPage;
