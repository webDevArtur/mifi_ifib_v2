import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import RegistrationBlock from "components/RegistrationBlock/RegistrationBlock";
import styles from "./QuestDetailsPage.module.scss";

const QuestDetailsPage = () => {
  const { name } = useParams();
  const [activeTab, setActiveTab] = useState("online");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
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

        <div className={styles.tabContent}>
          {activeTab === "online" && (
            <iframe
              src="https://stepik.org/course/67/syllabus"
              title="Stepik Course"
              className={styles.iframe}
            ></iframe>
          )}
          {activeTab === "offline" && (
            <p>Здесь будет информация о оффлайн заданиях и материалах.</p>
          )}
        </div>
      </div>

      <RegistrationBlock />
    </div>
  );
};

export default QuestDetailsPage;
