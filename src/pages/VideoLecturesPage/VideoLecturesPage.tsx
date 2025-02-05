import { useState, useEffect } from "react";
import { Input, Skeleton, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RegistraionBlock from "components/RegistrationBlock/RegistrationBlock";
import { useVideos } from "hooks/useVideos";
import { useAuth } from "hooks/AuthProvider";
import { NoData } from "components/NoData/NoData";
import { useVideoAsMark } from "hooks/useVideoAsMark";
import styles from "./VideoLecturesPage.module.scss";
import marked from "./assets/marked.png";
import unmarked from "./assets/unmarked.png";

const categories = [
  { label: "Все", value: "" },
  { label: "Лекции от практикующих медицинских физиков", value: "lectures" },
  { label: "Как это работает?", value: "how_does_it_work" },
  { label: "Анимации", value: "animations" },
  { label: "Теоретические основы", value: "theoretical_base" },
];

const VideoLecturesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const queryParams = new URLSearchParams(location.search);

  const initialSearch = queryParams.get("search") || "";
  const initialPage = Number(queryParams.get("page")) || 1;
  const initialPageSize = Number(queryParams.get("pageSize")) || 20;
  const initialCategory = queryParams.get("category") || "";

  const [search, setSearch] = useState<string>(initialSearch);
  const [page, setPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(initialSearch);
  const [category, setCategory] = useState<string>(initialCategory);

  const { data: videos, isLoading, refetch } = useVideos(
    undefined,
    debouncedSearch,
    page,
    pageSize,
    category
  );

  const [markedVideos, setMarkedVideos] = useState<Set<number>>(new Set());
  const { mutate: markVideo } = useVideoAsMark();

  useEffect(() => {
    refetch();
  }, [markedVideos, refetch]);  

  useEffect(() => {
    if (videos?.items) {
      const initialMarkedVideos = new Set(
        videos.items.filter((video) => video.marked).map((video) => video.id)
      );
      setMarkedVideos(initialMarkedVideos);
    }
  }, [videos?.items]);

  const handleMarkVideo = async (videoId: number) => {
    try {
      await markVideo(videoId);

      setMarkedVideos((prev) => {
        const newMarkedVideos = new Set(prev);
        if (newMarkedVideos.has(videoId)) {
          newMarkedVideos.delete(videoId);
        } else {
          newMarkedVideos.add(videoId);
        }
        return newMarkedVideos;
      });
    } catch (error) {
      console.error("Ошибка при пометке видео:", error);
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);

      const params = new URLSearchParams();
      if (search.trim()) {
        params.set("search", search);
      }
      if (category) {
        params.set("category", category);
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
  }, [search, page, pageSize, category, navigate]);

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

      <Input
        className={styles.searchInput}
        placeholder="Введите название или тему видео"
        prefix={<SearchOutlined />}
        bordered={false}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Select
        value={category}
        onChange={(value) => setCategory(value)}
        options={categories}
        className={styles.select}
        dropdownClassName={styles.selectList}
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

                  {isAuthenticated && (
                      <input
                        type="checkbox"
                        className={styles.isCompletedCheckbox}
                        checked={video.completed}
                      />
                  )}

                  {isAuthenticated && (
                    <div
                      className={styles.iconCheckbox}
                      onClick={(e) => {
                        handleCheckboxClick(e);
                        handleMarkVideo(video.id);
                      }}
                    >
                      {markedVideos.has(video.id) ? (
                        <img
                          src={marked}
                          alt="Отмечено"
                          className={styles.marked}
                        />
                      ) : (
                        <img
                          src={unmarked}
                          alt="Не отмечено"
                          className={styles.unmarked}
                        />
                      )}
                    </div>
                  )}
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
