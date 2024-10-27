import { useState } from "react";
import { Link } from "react-router-dom";
import VideoPlayer from "components/VideoPlayer/VideoPlayer";
import RegistraionBlock from "components/RegistrationBlock/RegistrationBlock";
import styles from "./VideoLecturePage.module.scss";

const VideoLecturePage = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> /{" "}
        <Link to="/introduction">Введение в медицинскую физику</Link> /{" "}
        <Link to="/video-lectures">Видео</Link> /
      </div>

      <h1>
        Основы позитронно-эмиссионной томографии (ПЭТ): Принципы и Применение
      </h1>
      <p className={styles.subtitle}>#томография</p>

      <div className={styles.videoContainer}>
        <VideoPlayer
          src="https://vk.com/video_ext.php?oid=-142173315&id=456239350&hd=2&autoplay=1"
          loading={loading}
        ></VideoPlayer>
      </div>

      <RegistraionBlock />
    </div>
  );
};

export default VideoLecturePage;
