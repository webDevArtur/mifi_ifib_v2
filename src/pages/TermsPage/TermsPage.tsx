import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useTerms } from "hooks/useTerms";
import { useLetters } from "hooks/useLetters";
import { Input, Button, Skeleton, Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { NoData } from "components/NoData/NoData";
import { TermKeys, termTitles } from "catalogs/terms";
import termsImage from "./assets/terms.png";
import styles from "./TermsPage.module.scss";

const DEBOUNCE_DELAY = 800;

const termLinks: Record<TermKeys, string> = {
  radionuclidesDiagnosis: "https://medphysicists.mephi.ru/biowiki/index.html",
  radiationTherapy: "https://medphysicists.mephi.ru/biowiki/index.html",
  ultraSoundDiagnosis: "https://medphysicists.mephi.ru/biowiki/index.html",
  mriDiagnosis: "https://medphysicists.mephi.ru/biowiki/index.html",
  safety: "https://medphysicists.mephi.ru/biowiki/index.html",
  regulatoryDocuments: "https://medphysicists.mephi.ru/biowiki/page8.html",
};

const TermsPage = () => {
  const { type } = useParams<{ type: TermKeys }>();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("search") || "";
  const initialLetter = params.get("letter") || "";

  const [search, setSearch] = useState<string>(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(initialSearch);
  const [selectedLetter, setSelectedLetter] = useState<string>(initialSearch ? "" : initialLetter);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allTerms, setAllTerms] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("russian");

  const pageSize = 10;

  const { data: terms, isLoading: isLoadingTerms } = useTerms(
    type,
    selectedLetter,
    debouncedSearch,
    pageSize,
    currentPage
  );

  const { data: letters, isLoading: isLoadingLetters } = useLetters(type);

  useEffect(() => {
    if (type) {
      setActiveTab("russian");
    }
  }, [type]);

  useEffect(() => {
    if (terms?.items) {
      setAllTerms((prev) =>
        currentPage === 1 ? terms.items : [...prev, ...terms.items]
      );
      setTotalPages(terms.totalPages);
    }
  }, [terms, currentPage]);

  useEffect(() => {
    if (activeTab === "russian" && letters && letters?.russian?.length > 0) {
      setSelectedLetter(letters.russian[0]);
    } else if (activeTab === "english" && letters && letters?.english?.length > 0) {
      setSelectedLetter(letters.english[0]);
    }
  }, [activeTab, letters]);

  useEffect(() => {
    const newParams = new URLSearchParams();
  
    if (debouncedSearch.trim()) {
      newParams.set("search", debouncedSearch);
    }
  
    navigate(`?${newParams.toString()}`, { replace: true });
  }, [debouncedSearch, navigate]);
  

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      if (!search.trim()) {
        setSelectedLetter(initialLetter || "А");
      } else {
        setSelectedLetter("");
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [search, initialLetter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleLetterClick = (letter: string) => {
    if (letter !== selectedLetter && !search.trim()) {
      setSelectedLetter(letter);
      setCurrentPage(1);
    }
  };

  const link = type ? termLinks[type] : "https://medphysicists.mephi.ru/biowiki/index.html";

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/knowledge">База знаний</Link> / {termTitles[type as TermKeys] || ""}
      </div>

      <div className={styles.containerHeader}>
        <div className={styles.leftContainer}>
          <h1 className={styles.h1}>{termTitles[type as TermKeys] || ""}</h1>

          <p className={styles.description}>
            Предлагаем тебе следующий план для работы с разделом:
          </p>

          <p className={styles.description}>
            Просмотри термины для дальнейшего изучения раздела. После этого можешь
            переходить к учебным материалам.
          </p>

          <p className={styles.description}>
            В учебных материалах находится справочник медицинских физиков с краткой
            теорией по темам и перекрестными ссылками внутри, чтобы сразу убрать
            возникающие вопросы.
          </p>

          <p className={styles.description}>
            После изучения материалов предлагаем ответить на тестовые задания в
            соответствующей вкладке.
          </p>

          <p className={styles.description}>
            Если материал, представленный в справочнике медицинского физика кажется
            вам сложным и непонятным, ознакомься с видеоматериалами, научно –
            популярными статьями и
            <Link className={styles.textLink} to="/equipment">
              {" "}
              3Д моделями используемого оборудования{" "}
            </Link>{" "}
            с описательными карточками.
          </p>
        </div>

        <Link to={link} target="_blank" className={styles.card}>
          <img src={termsImage} alt="Учебные материалы" className={styles.cardImage} />
          <h3 className={styles.cardTitle}>Учебные материалы</h3>
        </Link>
      </div>

      <div className={styles.tabs}>
        <Link to="" className={styles.activeTab}>
          Термины
        </Link>
        <Link to={`/knowledge/${type}/tasks`} className={styles.tab}>
          Задания
        </Link>
      </div>

      <Input
        className={styles.searchInput}
        placeholder="Введите название термина"
        prefix={<SearchOutlined />}
        value={search}
        onChange={handleSearchChange}
        bordered={false}
      />

      <Tabs className={styles.alphabetTabs} activeKey={activeTab} onChange={handleTabChange}>
        {letters && letters?.russian?.length > 0 && (
          <Tabs.TabPane tab="Русский" key="russian">
            {!debouncedSearch.trim() && (
              <div className={styles.alphabet}>
                {letters.russian.map((letter) => (
                  <span
                    key={letter}
                    onClick={() => handleLetterClick(letter)}
                    className={selectedLetter === letter ? styles.activeLetter : ""}
                    style={{ cursor: "pointer", marginRight: "5px" }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            )}
          </Tabs.TabPane>
        )}

        {letters && letters?.english?.length > 0 && (
          <Tabs.TabPane tab="English" key="english">
            {!debouncedSearch.trim() && (
              <div className={styles.alphabet}>
                {letters.english.map((letter) => (
                  <span
                    key={letter}
                    onClick={() => handleLetterClick(letter)}
                    className={selectedLetter === letter ? styles.activeLetter : ""}
                    style={{ cursor: "pointer", marginRight: "5px" }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            )}
          </Tabs.TabPane>
        )}
      </Tabs>

      <hr style={{ width: "100%", margin: "15px auto", border: "1px solid rgba(169, 169, 169, 0.1)" }} />

      <div className={styles.termsList}>
        {isLoadingTerms && currentPage === 1 ? (
          <Skeleton active paragraph={{ rows: 18 }} title={false} className={styles.skeleton} />
        ) : allTerms.length > 0 ? (
          allTerms.map(({ name, definition, id }) => (
            <div className={styles.term} key={id}>
              <h3 className={styles.termName}>{name}</h3>
              <p>{definition}</p>
            </div>
          ))
        ) : (
          <NoData text="Мы еще подбираем термины для этого раздела. Скоро загрузим!" />
        )}
      </div>

      <div className={styles.buttonContainer}>
        {!isLoadingTerms && totalPages > currentPage && (
          <Button
            className={styles.button}
            type="primary"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            loading={isLoadingTerms}
          >
            Показать ещё
          </Button>
        )}
      </div>
    </div>
  );
};

export default TermsPage;
