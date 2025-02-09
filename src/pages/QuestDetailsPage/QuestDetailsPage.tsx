import { useParams, Link } from "react-router-dom";
import QuestPage from "components/QuestComponent/QuestComponent";
import styles from "./QuestDetailsPage.module.scss";

const questTypeTranslations: { [key: string]: string } = {
  nuclear_medicine_history: "Погружение в историю",
  diagnostics: "Диагностика",
  therapy: "Терапия",
  common_quest: "Общий квест",
  nuclear_medicine_economics: "Экономика ядерной медицины",
  clinical_cases: "Клинические случаи",
  emergency_situations: "Аварийные ситуации",
};

const QuestDetailsPage = () => {
  const { name: questType, id: questId } = useParams<{ name: string; id: string }>();

  const practicumTitle = questType ? questTypeTranslations[questType] ?? "Задание" : "Задание";
  const questArray = questId ? [parseInt(questId, 10)] : [];

  if (!questType) {
    return null;
  }

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/quests">Квесты</Link> / {questType !== "common_quest" ? (
  <Link to={`/quests/${questType}`}>{practicumTitle}</Link>
) : (
  <span>{practicumTitle}</span>
)}

      </nav>

      <h1 className={styles.h1}>Квест</h1>

      <QuestPage questArray={questArray} />
    </div>
  );
};

export default QuestDetailsPage;
