import { Link, useParams } from "react-router-dom";
import { Skeleton, Input, Select, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useQuests } from "hooks/useQuests";
import { NoData } from "components/NoData/NoData";
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

  const { data, isLoading } = useQuests(questType, page, pageSize, complexity || undefined, debouncedSearch, isOnline || undefined);

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

  return (
    <div className={styles.introPage}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/quests">Квесты</Link> / {title}
      </nav>

      <div className={styles.contentBlock}>
        <h2>{title}</h2>
        <p className={styles.description}>
          В этом блоке вы узнаете, с чем сталкивается студент – медицинский физик во время обучения в ИФИБ НИЯУ МИФИ.
        </p>

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
