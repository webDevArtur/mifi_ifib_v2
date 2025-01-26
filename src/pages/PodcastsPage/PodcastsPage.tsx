import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input, Skeleton } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import RegistraionBlock from "components/RegistrationBlock/RegistrationBlock";
import { NoData } from "components/NoData/NoData";
import ReactPlayer from "react-player";
import styles from "./PodcastsPage.module.scss";
import { usePodcasts } from "hooks/usePodcasts";
import { useAuth } from "hooks/AuthProvider"
import { usePodcastAsMark } from "hooks/usePodcastAsMark";
import { usePodcastAsViewed } from "hooks/usePodcastAsViewed";
import marked from "./assets/marked.png";
import unmarked from "./assets/unmarked.png";

const PodcastsPage = () => {
  const [currentPodcastUrl, setCurrentPodcastUrl] = useState("");
  const [currentPodcastId, setCurrentPodcastId] = useState<number | null>(null);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [markedPodcasts, setMarkedPodcasts] = useState<Set<number>>(new Set());

  const { isAuthenticated } = useAuth();

  const { data: podcastsData, isLoading, refetch } = usePodcasts(1, 20, debouncedSearch);

  const { mutate: markPodcastAsViewed } = usePodcastAsViewed();
  const { mutate: markPodcast } = usePodcastAsMark();

  useEffect(() => {
    refetch();
  }, [markedPodcasts, refetch]);  

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    if (podcastsData?.items) {
      const initialMarkedPodcasts = new Set(
        podcastsData.items.filter((podcast) => podcast.marked).map((podcast) => podcast.id)
      );
      setMarkedPodcasts(initialMarkedPodcasts);
    }
  }, [podcastsData?.items]);

  const handleMarkPodcast = async (podcastId: number) => {
    try {
      await markPodcast(podcastId);

      setMarkedPodcasts((prev) => {
        const newMarkedPodcasts = new Set(prev);
        if (newMarkedPodcasts.has(podcastId)) {
          newMarkedPodcasts.delete(podcastId);
        } else {
          newMarkedPodcasts.add(podcastId);
        }
        return newMarkedPodcasts;
      });
    } catch (error) {
      console.error("Ошибка при пометке подкаста:", error);
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleCardClick = (url: string, id: number) => {
    setCurrentPodcastUrl(url);
    setCurrentPodcastId(id);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (isAuthenticated && currentPodcastId) {
      markPodcastAsViewed(currentPodcastId);
    }
  }, [currentPodcastId, markPodcastAsViewed]);

  const podcasts = podcastsData?.items || [];

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> /{" "}
        <Link to="/introduction">Введение в медицинскую физику</Link> / Подкасты
      </div>

      <h1>Подкасты</h1>
      <p className={styles.description}>
        Новости медицинской физики, диалоги с практикующими медицинскими физиками о карьерном пути, локальные шуточки медицинских физиков – все это вы можете услышать в наших подкастах.
      </p>

      <a className={styles.textLink} href="https://music.yandex.ru/album/24891803" target="_blank">
        Яндекс.Музыка
      </a>

      <Input
        className={styles.searchInput}
        placeholder="Введите название подкаста или автора"
        prefix={<SearchOutlined />}
        bordered={false}
        value={search}
        onChange={handleSearchChange}
      />

      {isLoading && (
        <div className={styles.podcastGrid}>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div key={index} className={styles.podcastCard}>
                <Skeleton.Button className={styles.skeleton} active />
              </div>
            ))}
        </div>
      )}

      {!isLoading && podcasts.length === 0 && <NoData />}

      <div className={styles.podcastGrid}>
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            className={styles.podcastCard}
            onClick={() => handleCardClick(podcast.link, podcast.id)}
          >
            <div className={styles.thumbnail}>
              <div className={styles.overlay}>
                <img
                  src={podcast.cover || "./assets/cover.png"}
                  alt={podcast.name}
                  className={styles.coverImage}
                />
              </div>
            </div>
            <div className={styles.lectureInfo}>
              <h3>{podcast.name}</h3>
              <p>{podcast.description}</p>

              {isAuthenticated && (
                <input
                  type="checkbox"
                  className={styles.isCompletedCheckbox}
                  checked={podcast.completed}
                />
              )}

              {isAuthenticated && (
                <div
                  className={styles.iconCheckbox}
                  onClick={(e) => {
                    handleCheckboxClick(e);
                    handleMarkPodcast(podcast.id);
                  }}
                >
                  {markedPodcasts.has(podcast.id) ? (
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
          </div>
        ))}
      </div>

      <RegistraionBlock />

      {currentPodcastUrl && (
        <div className={styles.audioPlayerContainer}>
          <ReactPlayer
            url={currentPodcastUrl}
            controls={true}
            width="100%"
            height="50px"
          />
        </div>
      )}
    </div>
  );
};

export default PodcastsPage;
