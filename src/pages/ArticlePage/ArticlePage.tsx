import { useState, useEffect } from "react";
import { Input, Pagination, Spin, Flex } from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useArticles } from "hooks/useArticles";
import RegistrationBlock from "components/RegistrationBlock/RegistrationBlock";
import styles from "./ArticlePage.module.scss";
import { NoData } from "components/NoData/NoData";

const ArticlePage = () => {
  const location = useLocation(); // Получение текущего местоположения
  const navigate = useNavigate(); // Для навигации

  const queryParams = new URLSearchParams(location.search); // Используем URLSearchParams
  const initialPage = parseInt(queryParams.get("page") || "1", 10);
  const initialSearch = queryParams.get("search") || "";

  const [page, setPage] = useState(initialPage);
  const pageSize = 10;
  const [search, setSearch] = useState<string>(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(initialSearch);

  const { data, isLoading } = useArticles(page, pageSize, debouncedSearch);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);

      const newParams = new URLSearchParams();
      newParams.set("page", "1");
      if (search.trim()) {
        newParams.set("search", search);
      }

      // Используем navigate для обновления URL
      navigate(`/articles?${newParams.toString()}`, { replace: true });
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [search, navigate]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);

    const newParams = new URLSearchParams();
    newParams.set("page", pageNumber.toString());
    if (search) {
      newParams.set("search", search);
    }

    // Используем navigate для обновления URL
    navigate(`/articles?${newParams.toString()}`, { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> /{" "}
        <Link to="/introduction">Введение в медицинскую физику</Link> /
        Научно-популярные статьи
      </div>

      <h1>Научно-популярные статьи</h1>

      <p>
        Рекомендуется проходить материалы в указанной последовательности для
        лучшего усвоения темы. Все видеолекции и подкасты должны быть прослушаны
        до выполнения практических заданий.
      </p>

      <Input
        className={styles.searchInput}
        placeholder="Введите название автора или статьи"
        prefix={<SearchOutlined />}
        value={search}
        onChange={handleSearchChange}
        bordered={false}
      />

      <ul className={styles.articleList}>
        {isLoading && (
          <Flex className={styles.spinner} justify="center" align="center">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </Flex>
        )}

        {!isLoading &&
          data?.items.map((article) => (
            <li key={article.id}>
              <Link
                to={`/articles/${article.id}`}
                className={styles.articleItem}
              >
                <img
                  src={`https://cybernexvpn-stage.ru/${article.coverUrl}`}
                  alt={article.name}
                  className={styles.articleImage}
                />

                <div className={styles.articleDetails}>
                  <h3>{article.name}</h3>
                  <p>{article.author}</p>
                </div>
              </Link>
            </li>
          ))}

        {!isLoading && !data?.items?.length && <NoData />}
      </ul>

      {data && data?.totalItems > pageSize && (
        <Pagination
          align="center"
          current={page}
          pageSize={pageSize}
          total={data?.totalItems || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      )}

      <RegistrationBlock />
    </div>
  );
};

export default ArticlePage;
