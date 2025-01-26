import { useParams } from "react-router-dom";
import { useQuests } from "hooks/useQuests";
import QuestPage from "components/QuestComponent/QuestComponent";
import { practicumTitles, PracticumKeys, practicumDescriptions } from "catalogs/practicums";
import { Link } from "react-router-dom";
import styles from "./PracticumDetailsPage.module.scss";

const PracticumDetailsPage = () => {
  const { id: questType } = useParams<{ id: string }>();
  const validQuestType = questType ?? "";

  const { data: questsData, isLoading: questsLoading, error: questsError } = useQuests(questType);

  const practicumTitle = questType ? practicumTitles[questType as PracticumKeys] : "Неизвестный практикум";
  const practicumDescription = practicumDescriptions[questType as PracticumKeys] || "";

  const questId = questsData?.items[0]?.id;
  const questArray = questId ? [questId] : [];

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/practicum">Практикум</Link> / {practicumTitle}
      </nav>

      <h1 className={styles.h1}>{practicumTitle}</h1>

      <p
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: practicumDescription }}
      ></p>

      <QuestPage title="Practicum Tasks" questArray={questArray} questType={validQuestType} />
    </div>
  );
};

export default PracticumDetailsPage;
