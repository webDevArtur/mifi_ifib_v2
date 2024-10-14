import { useState } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useMainVideo } from 'hooks/useMainVideo';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';
import atom from './assets/atom.png';
import styles from './MainBanner.module.scss';

const MainBanner = () => {
  const [loading, setLoading] = useState(false);

  // const { data } = useMainVideo();

  return (
    <section className={styles.bannerContainer}>
      <div className={styles.bannerContent}>
        <div className={styles.leftContainer}>
          <h1 className={styles.title}>Платформа медицинских физиков</h1>

          <div className={styles.infoContainer}>
            <div className={styles.info}>
              <p className={styles.subtitle}>
                Обучайся передовым технологиям в медицине вместе с нами!
              </p>

              <div className={styles.buttonGroup}>
                <Link to="/video-lectures">
                  <Button className={styles.button} type="default">
                    Видеолекции
                  </Button>
                </Link>

                <Link to="/articles">
                  <Button className={styles.button} type="default">
                    Статьи
                  </Button>
                </Link>

                <Link to="/podcasts">
                  <Button className={styles.button} type="default">
                    Подкасты
                  </Button>
                </Link>

                <Link to="/">
                  <Button className={styles.button} type="default">
                    VR тренажеры
                  </Button>
                </Link>

                <Link to="/">
                  <Button className={styles.button} type="default">
                    Практика
                  </Button>
                </Link>

                <Button href="https://physbio.mephi.ru/" target="_blank" rel="noopener noreferrer" className={styles.button} type="default">
                  ИФИБ
                </Button>
              </div>
            </div>

            <div className={styles.atomContainer}>
              <img className={styles.atom} src={atom} alt="Preview" />
            </div>
          </div>
        </div>

        <Link style={{ width: '100%' }} to="/registration">
          <Button className={styles.registerBtn} type="primary">
            Зарегистрироваться
          </Button>
        </Link>
      </div>



      <div className={styles.videoContainer}>
        <VideoPlayer src="https://vk.com/video_ext.php?oid=-142173315&id=456239350&hd=2&autoplay=1" loading={loading}></VideoPlayer>
      </div>
    </section>
  );
};

export default MainBanner;
