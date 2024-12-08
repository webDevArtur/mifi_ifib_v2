import { useState, useEffect } from "react";
import { Input, Pagination, Skeleton } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useArticles } from "hooks/useArticles";
import RegistrationBlock from "components/RegistrationBlock/RegistrationBlock";
import styles from "./ArticlePage.module.scss";
import { NoData } from "components/NoData/NoData";
import cover from "./assets/cover.png";

const ArticlePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page") || "1", 10);
  const initialSearch = queryParams.get("search") || "";

  const [page, setPage] = useState(initialPage);
  const pageSize = 10;
  const [search, setSearch] = useState<string>(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(initialSearch);

  const { data, isLoading } = useArticles(undefined, page, pageSize, debouncedSearch);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);

      const newParams = new URLSearchParams();
      newParams.set("page", "1");
      if (search.trim()) {
        newParams.set("search", search);
      }

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
      Как посчитать траекторию движения вашей кошки? Как работает МРТ? Какие виды опухоли бывают? Ответы на эти и другие вопросы вы сможете найти в статьях в данном разделе. 
      </p>

      <p>
      Если какая-то статья зацепила, но нет времени дочитать прям сейчас, вы можете сохранить ее в личном кабинете и вернуться к ней позже.
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
        <div className={styles.loading}>
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <Skeleton.Button
                key={index}
                className={styles.skeletonButton}
                active
                size="large"
              />
            ))}
        </div>
      )}


        {!isLoading &&
          data?.items.map((article) => (
            <li key={article.id}>
              <Link
                to={`/articles/${article.id}`}
                className={styles.articleItem}
              >
                <img
                  src={`${article.cover}`}
                  alt={article.name}
                  className={styles.articleImage}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = cover;
                  }}
                />

                <div className={styles.articleDetails}>
                  <h3 className={styles.articleTitle} >{article.name}</h3>
                  <p className={styles.articleAuthor} >{article.author}</p>
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
