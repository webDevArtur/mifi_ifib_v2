import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Skeleton, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { NoData } from "components/NoData/NoData";
import { useQuestTasks, useSubmitQuestTask } from "hooks/useQuestTasks";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { QuestTask } from "entities";
import styles from "./OfflineQuestDetailsPage.module.scss";

const questTypeTranslations = {
  nuclear_medicine_history: "Погружение в историю",
  diagnostics: "Диагностика",
  therapy: "Терапия",
  common_quest: "Общий квест",
  nuclear_medicine_economics: "Экономика ядерной медицины",
  clinical_cases: "Клинические случаи",
  emergency_situations: "Аварийные ситуации",
};

const OfflineQuestDetailsPage = () => {
  const { name: questType, id: questId } = useParams<{ name: string; id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const title = (questType && questTypeTranslations[questType as keyof typeof questTypeTranslations]) || "Неизвестный квест";

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/quests">Квесты</Link> /{" "}
        <Link to={`/quests/${questType}`}>{title}</Link>
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
          <Link to={`/quests/${questType}/${questId}`} className={`${styles.tab}`}>
            Онлайн
          </Link>
          <Link to={`/quests/${questType}/${questId}/offline`} className={`${styles.tab} ${styles.active}`}>
            Оффлайн
          </Link>
        </div>
        
        <div>
            <p className={styles.description}>
              Здесь будет информация о оффлайн заданиях и материалах.
            </p>
        </div>
      </div>
    </div>
  );
};

export default OfflineQuestDetailsPage;
