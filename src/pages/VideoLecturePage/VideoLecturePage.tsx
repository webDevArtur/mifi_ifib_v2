import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import VideoPlayer from "components/VideoPlayer/VideoPlayer";
import RegistrationBlock from "components/RegistrationBlock/RegistrationBlock";
import { useAuth } from "hooks/AuthProvider";
import { Skeleton } from "antd";
import { useVideos } from "hooks/useVideos";
import { useVideoAsRead } from "hooks/useVideoAsRead";
import styles from "./VideoLecturePage.module.scss";

const VideoLecturePage = () => {
  const { id } = useParams<{ id: string }>();
  const videoId = id ? parseInt(id, 10) : undefined;

  const { isAuthenticated } = useAuth();
  const { mutate: markAsRead } = useVideoAsRead();

  const { data: videos, isLoading, error } = useVideos(
    [videoId as number],
    undefined,
    undefined,
    undefined
  );

  useEffect(() => {
    if (isAuthenticated && id) {
      markAsRead(Number(id));
    }
  }, [isAuthenticated, id, markAsRead]);

  const video = videos?.items[0];

  if (isLoading) {
    return (
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link to="/">Главная</Link> /{" "}
          <Link to="/introduction">Введение в медицинскую физику</Link> /{" "}
          <Link to="/video-lectures">Видео</Link> /{" "}
          <Skeleton.Button className={styles.skeletonBreadcrumb} active />
        </nav>

        <h1 className={styles.h1}>
          <Skeleton.Button active size="large" className={styles.skeletonTitle} />
        </h1>

        <p className={styles.subtitle}>
          <Skeleton.Button active size="large" className={styles.skeletonSubtitle} />
        </p>
        
        <div className={styles.videoContainer}>
          <Skeleton.Button active className={styles.skeletonVideo} />
        </div>

        <RegistrationBlock />
      </div>
    );
  }

  if (error || !video) {
    return <div>Видео не найдено или произошла ошибка при загрузке.</div>;
  }

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Главная</Link> /{" "}
        <Link to="/introduction">Введение в медицинскую физику</Link> /{" "}
        <Link to="/video-lectures">Видео</Link> / {video.name}
      </nav>

      <h1>{video.name}</h1>
      <p className={styles.subtitle}>{video.theme}</p>

      <p className={styles.description}>{video.description}</p>

      <div className={styles.videoContainer}>
        <VideoPlayer src={video.link} isLoading={isLoading} />
      </div>

      <RegistrationBlock />
    </div>
  );
};

export default VideoLecturePage;
