import { useState } from "react";
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

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded((prev) => !prev);
  };

  const getTruncatedText = (text: string) => {
    const breakPoint = text.indexOf('Читать дальше');
    if (breakPoint !== -1) {
      return text.slice(0, breakPoint);
    }
    return text;
  };

  const questId = questsData?.items[0]?.id;
  const questArray = questId ? [questId] : [];

  const hasReadMore = practicumDescription.includes('Читать дальше');

  const getFullText = (text: string) => text.replace("Читать дальше", "");

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/practicum">Практикум</Link> / {practicumTitle}
      </nav>

      <h1 className={styles.h1}>{practicumTitle}</h1>

      <div>
      <p
        className={styles.description}
        dangerouslySetInnerHTML={{
          __html: isExpanded ? getFullText(practicumDescription) : getTruncatedText(practicumDescription),
        }}
      ></p>


        {/* Показываем кнопку только если текст содержит "Читать далее" */}
        {hasReadMore && (
          <button onClick={toggleText} className={styles.readMoreButton}>
            {isExpanded ? 'Скрыть' : 'Читать дальше...'}
          </button>
        )}
      </div>

      <QuestPage pageType="practicum" questArray={questArray} pageSize={4} />
    </div>
  );
};

export default PracticumDetailsPage;
