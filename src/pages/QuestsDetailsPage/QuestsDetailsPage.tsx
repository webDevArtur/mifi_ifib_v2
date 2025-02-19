import { Link, useParams } from "react-router-dom";
import { Skeleton, Input, Select, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useQuests } from "hooks/useQuests";
import { useQuestTypes } from 'hooks/useQuestsType';
import { NoData } from "components/NoData/NoData";
import parse from "html-react-parser";
import QuestCard from "components/QuestCard/QuestCard";
import styles from "./QuestsDetailsPage.module.scss";

const { Search } = Input;

const questTypeTranslations = {
  nuclear_medicine_history: "Погружение в историю",
  diagnostics: "Диагностика",
  therapy: "Терапия",
  common_quest: "Общий квест",
  nuclear_medicine_economics: "Экономика ядерной медицины",
  clinical_cases: "Клинические случаи",
  emergency_situations: "Аварийные ситуации",
};

const QuestsDetailsPage = () => {
  const { name: questType } = useParams<{ name: string }>();
  const [searchText, setSearchText] = useState("");
  const [complexity, setComplexity] = useState<number | null>(null);
  const [hoveredComplexity, setHoveredComplexity] = useState<number | undefined>(undefined);
  const [isOnline, setIsOnline] = useState<"online" | "offline" | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const questCategory = "quest";

  const { data, isLoading } = useQuests({
    questType,
    page,
    size: pageSize,
    complexity: complexity ? complexity : undefined,
    search: debouncedSearch,
    isOnline: isOnline ? isOnline : undefined,
  });

  const { data: questTypes, isLoading: questTypesLoading } = useQuestTypes(questCategory, questType);
  
  const quests = data?.items || [];
  const totalItems = data?.totalItems || 0;

  const title =
    (questType && questTypeTranslations[questType as keyof typeof questTypeTranslations]) ||
    "Неизвестный квест";

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(searchText);
      setPage(1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const handleComplexityChange = (value: number | null) => {
    setComplexity(value);
    setPage(1);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded((prev) => !prev);
  };

  const practicumDescription = questTypes?.[0]?.description || "";

  const getTruncatedText = (text: string) => {
    const breakPoint = text.indexOf('Читать дальше');
    if (breakPoint !== -1) {
      return text.slice(0, breakPoint);
    }
    return text;
  };

  const hasReadMore = practicumDescription.includes('Читать дальше');

  const getFullText = (text: string) => text.replace("Читать дальше", "");

  return (
    <div className={styles.introPage}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/quests">Квесты</Link> / {title}
      </nav>

      <div className={styles.contentBlock}>
        <h2>{title}</h2>

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
        )
      }

        <div className={styles.filtersContainer}>
        {questType !== "nuclear_medicine_history" && (
        <div className={styles.starRating}>
          <p className={styles.starRatingTitle}>Выберите уровень сложности:</p>
            <div className={styles.stars}>
              {[1, 2, 3].map((value) => (
                <span
                  key={value}
                  className={`${styles.star} ${
                    (hoveredComplexity && value <= hoveredComplexity) || (complexity && value <= complexity)
                      ? styles.filled
                      : ""
                  }`}
                  onClick={() => handleComplexityChange(complexity === value ? null : value)}
                  onMouseEnter={() => setHoveredComplexity(value)}
                  onMouseLeave={() => setHoveredComplexity(undefined)}
                >
                  ★
                </span>
              ))}
            </div>
        </div>
        )}

      {questType !== "nuclear_medicine_history" && (
        <div className={styles.tags}>
          <p className={styles.starRatingTitle}>Выберите формат:</p>

          <div className={styles.tagsContainer}>
            <button
              className={`${styles.tag} ${isOnline === "online" ? styles.active : ""}`}
              onClick={() => setIsOnline(isOnline === "online" ? null : "online")}
            >
              Онлайн
            </button>
            <button
              className={`${styles.tag} ${isOnline === "offline" ? styles.active : ""}`}
              onClick={() => setIsOnline(isOnline === "offline" ? null : "offline")}
            >
              Оффлайн
            </button>
          </div>
        </div>
      )}

        <Input
          className={styles.searchInput}
          placeholder="Поиск по квестам"
          prefix={<SearchOutlined />}
          bordered={false}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
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
        <NoData hideImage text="Придумываем сюжеты и готовим лаборатории... Обязательно сообщим о добавлении квестов!" />
      ) : (
        <div className={styles.cardsContainer}>
          {quests.map((quest) => (
            <Link to={`/quests/${quest.questType}/${quest.id}`} key={quest.id}>
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

      {totalItems > pageSize && (
        <Pagination
          current={page}
          pageSize={pageSize}
          total={totalItems}
          onChange={(newPage, newPageSize) => {
            setPage(newPage);
            setPageSize(newPageSize || pageSize);
          }}
          className={styles.pagination}
        />
      )}
    </div>
  );
};

export default QuestsDetailsPage;
