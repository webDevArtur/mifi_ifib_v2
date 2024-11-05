import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useTermsIdByType, useTerms } from "hooks/useTerms";
import RegistrationBlock from "components/RegistrationBlock/RegistrationBlock";
import { Input, Button, Skeleton } from "antd";
import { FileFilled, SearchOutlined } from "@ant-design/icons";
import { NoData } from "components/NoData/NoData";
import { TermKeys, termTitles } from "catalogs/terms";
import styles from "./TermsPage.module.scss";

const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");

const DEBOUNCE_DELAY = 800;

const TermsPage = () => {
  const { type } = useParams<{ type: TermKeys }>();
  const navigate = useNavigate();
  const location = useLocation();

  const initialSearch =
    new URLSearchParams(location.search).get("search") || "";
  const initialLetter =
    new URLSearchParams(location.search).get("letter") || "А";

  const [selectedLetter, setSelectedLetter] = useState<string>(
    initialSearch ? "" : initialLetter,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const [search, setSearch] = useState<string>(initialSearch);
  const [allTerms, setAllTerms] = useState<any[]>([]);

  const { data: termsId } = useTermsIdByType(type);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  const { data: terms, isLoading: isLoadingTerms } = useTerms(
    termsId?.id,
    selectedLetter,
    debouncedSearch,
    pageSize,
    currentPage,
  );

  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (terms?.items) {
      setAllTerms((prev) =>
        currentPage === 1 ? terms.items : [...prev, ...terms.items],
      );
      setTotalPages(terms.totalPages);
    }
  }, [terms, currentPage]);

  useEffect(() => {
    const newParams = new URLSearchParams(location.search);

    if (debouncedSearch.trim() === "") {
      newParams.delete("search");
    } else {
      newParams.set("search", debouncedSearch);
    }

    if (selectedLetter === "А" || selectedLetter === "") {
      newParams.delete("letter");
    } else {
      newParams.set("letter", selectedLetter);
    }

    navigate(`?${newParams.toString()}`, { replace: true });
  }, [debouncedSearch, selectedLetter, navigate]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSelectedLetter(search.trim() === "" ? "А" : "");
      setDebouncedSearch(search);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    setCurrentPage(1);
  };

  const handleLetterClick = (letter: string) => {
    if (letter !== selectedLetter && search.trim() === "") {
      setSelectedLetter(letter);
      setCurrentPage(1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/knowledge">База знаний</Link> /
      </div>

      <h1 className={styles.h1}>{termTitles[type as TermKeys] || ""}</h1>

      <p className={styles.description}>
        Предлагаем тебе следующий план для работы с разделом:
      </p>

      <p className={styles.description}>
        Просмотри термины для дальнейшего изучения раздела. После этого можешь
        переходить к учебным материалам.
      </p>

      <a
        className={styles.materialLink}
        href="https://info.cern.ch/hypertext/WWW/TheProject.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FileFilled className={styles.materialIcon} />
        Учебные материалы
      </a>

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

      {debouncedSearch.trim() === "" && (
        <div className={styles.alphabet}>
          {alphabet.map((letter) => (
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

      <div className={styles.termsList}>
        {isLoadingTerms && currentPage === 1 ? (
          <Skeleton
            active
            paragraph={{ rows: 18 }}
            title={false}
            className={styles.skeleton}
          />
        ) : allTerms.length > 0 ? (
          allTerms.map(({ name, definition, id }) => (
            <div className={styles.term} key={id}>
              <h3>{name}</h3>
              <p>{definition}</p>
            </div>
          ))
        ) : (
          <NoData />
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

      <RegistrationBlock />
    </div>
  );
};

export default TermsPage;
