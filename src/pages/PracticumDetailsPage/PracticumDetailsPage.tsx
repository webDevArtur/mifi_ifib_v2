import { useState } from "react";
import { Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { useQuests } from "hooks/useQuests";
import { useQuestTypes } from 'hooks/useQuestsType';
import QuestPage from "components/QuestComponent/QuestComponent";
import { practicumTitles, PracticumKeys, practicumDescriptions } from "catalogs/practicums";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import styles from "./PracticumDetailsPage.module.scss";

const PracticumDetailsPage = () => {
  const { id: questType } = useParams<{ id: string }>();
  const questCategory = "practice";

  const { data: questsData, isLoading: questsLoading, error: questsError } = useQuests({questType});
  const { data: questTypes, isLoading: questTypesLoading } = useQuestTypes(questCategory, questType);
  
  const practicumTitle = questType ? practicumTitles[questType as PracticumKeys] : "Неизвестный практикум";
  const practicumDescription = questTypes?.[0]?.description || "";

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

      { questTypesLoading ? (
          <Skeleton active />
        ) : (
          <div>
          <p className={styles.description}>
            {parse(isExpanded ? getFullText(practicumDescription) : getTruncatedText(practicumDescription))}
          </p>
    
            {hasReadMore && (
              <button onClick={toggleText} className={styles.readMoreButton}>
                {isExpanded ? 'Скрыть' : 'Читать дальше...'}
              </button>
            )}
          </div>
        )}

      <QuestPage questArray={questArray} pageSize={4} />
    </div>
  );
};

export default PracticumDetailsPage;
