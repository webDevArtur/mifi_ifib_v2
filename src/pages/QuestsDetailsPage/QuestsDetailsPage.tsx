import { Link, useParams } from "react-router-dom";
import { Skeleton } from "antd"; // Импорт Skeleton из Ant Design
import { useQuests } from "hooks/useQuests";
import { NoData } from "components/NoData/NoData";
import QuestCard from "components/QuestCard/QuestCard";
import styles from "./QuestsDetailsPage.module.scss";

const questTypeTranslations = {
  nuclear_medicine_history: "История ядерной медицины",
  diagnostics: "Диагностика",
  therapy: "Терапия",
  common_quest: "Общий квест",
  nuclear_medicine_economics: "Экономика ядерной медицины",
  clinical_cases: "Клинические случаи",
  emergency_situations: "Аварийные ситуации",
};

const QuestsDetailsPage = () => {
  const { name: questType } = useParams<{ name: string }>();
  const { data, isLoading, error } = useQuests(questType);

  const quests = data?.items || [];
  const title = (questType && questTypeTranslations[questType as keyof typeof questTypeTranslations]) || "Неизвестный квест";

  return (
    <div className={styles.introPage}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/quests">Квесты</Link> / {title}
      </nav>

      <div className={styles.contentBlock}>
        <h2>{title}</h2>
        <p className={styles.description}>
          В этом блоке вы узнаете, с чем сталкивается студент – медицинский
          физик во время обучения в ИФИБ НИЯУ МИФИ.
        </p>
      </div>

      {isLoading ? (
        <div className={styles.cardsContainer}>
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div key={index} className={styles.card}>
                <Skeleton.Button className={styles.skeletonCard} active />
              </div>
            ))}
        </div>
      ) : quests.length === 0 ? (
        <NoData text="Квесты отсутствуют." />
      ) : (
        <div className={styles.cardsContainer}>
          {quests.map((quest) => (
            <Link
              to={`/quests/${quest.questType}/${quest.id}`}
              key={quest.id}
            >
              <QuestCard
                title={quest.name}
                isOnline={quest.isOnline}
                rating={quest.complexity}
                backgroundImage={quest.cover}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestsDetailsPage;
