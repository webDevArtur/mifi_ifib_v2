import { useState, useEffect } from "react";
import { Input, Skeleton } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RegistraionBlock from "components/RegistrationBlock/RegistrationBlock";
import { useVideos } from "hooks/useVideos";
import { NoData } from "components/NoData/NoData";
import styles from "./VideoLecturesPage.module.scss";

const VideoLecturesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("search") || "";
  const initialPage = Number(queryParams.get("page")) || 1;
  const initialPageSize = Number(queryParams.get("pageSize")) || 20;

  const [search, setSearch] = useState<string>(initialSearch);
  const [page, setPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(initialSearch);

  const { data: videos, isLoading } = useVideos(
    undefined,
    debouncedSearch,
    page,
    pageSize
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);

      const params = new URLSearchParams();
      if (search.trim()) {
        params.set("search", search);
      }
      if (page !== 1) {
        params.set("page", String(page));
      }
      if (pageSize !== 20) {
        params.set("pageSize", String(pageSize));
      }
      navigate(`?${params.toString()}`, { replace: true });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search, page, pageSize, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> /{" "}
        <Link to="/introduction">Введение в медицинскую физику</Link> / Видео
      </div>

      <h1>Видео</h1>

      <p className={styles.description}>
      Кто такие медицинские физики? Мы не стали брать информацию из википедии, а напрямую спросили это у практикующих специалистов. Смотрите видео ниже и погружайтесь в сферу! 
      </p>

      <p className={styles.description}>
      Помимо интервью со специалистами вы можете найти и научно – популярные ролики, в которых покажут, как работает циклотрон, что такое линейный ускоритель и как делать МРТ лошади. 
      </p>

      <p className={styles.description}>
      Внимание! Некоторые видео на английском языке.
      </p>

      <Input
        className={styles.searchInput}
        placeholder="Введите название или тему видео"
        prefix={<SearchOutlined />}
        bordered={false}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isLoading && (
        <div className={styles.videoGrid}>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div key={index} className={styles.videoCard}>
                  <Skeleton.Button className={styles.skeleton} active />
              </div>
            ))}
        </div>
      )}


      {!isLoading && videos?.items && (
        <div className={styles.videoGrid}>
          {videos.items.map((video) => (
            <div key={video.id} className={styles.videoCard}>
              <Link to={`/video-lectures/${video.id}`}>
                <div className={styles.thumbnail}>
                  <div className={styles.overlay}>
                    <img
                      className={styles.cover}
                      src={video.cover}
                      alt="Обложка"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/fallback-cover.png";
                      }}
                    />
                  </div>
                </div>

                <div className={styles.lectureInfo}>
                  <h3>{video.name}</h3>
                  <p>{video.theme}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {!isLoading && (!videos || videos.items.length === 0) && <NoData />}

      <RegistraionBlock />
    </div>
  );
};

export default VideoLecturesPage;
