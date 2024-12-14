import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input, Skeleton } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import RegistraionBlock from "components/RegistrationBlock/RegistrationBlock";
import { NoData } from "components/NoData/NoData";
import ReactPlayer from "react-player";
import styles from "./PodcastsPage.module.scss";
import { usePodcasts } from "hooks/usePodcasts";

const PodcastsPage = () => {
  const [currentPodcastUrl, setCurrentPodcastUrl] = useState("");
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const { data: podcastsData, isLoading, error } = usePodcasts(1, 20, debouncedSearch);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleCardClick = (url: string) => {
    setCurrentPodcastUrl(url);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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
            onClick={() => handleCardClick(podcast.link)}
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
