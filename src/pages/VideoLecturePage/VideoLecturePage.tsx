import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Spin, Flex } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import RegistraionBlock from 'components/RegistrationBlock/RegistrationBlock';
import styles from './VideoLecturePage.module.scss';

const VideoLecturePage = () => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> /{' '}
        <Link to="/introduction">Введение в медицинскую физику</Link> /{' '}
        <Link to="/video-lectures">Видеолекции</Link> /
      </div>

      <h1>
        Основы позитронно-эмиссионной томографии (ПЭТ): Принципы и Применение
      </h1>
      <p className={styles.subtitle}>#томография</p>

      {loading && (
        <Flex className={styles.spinner} justify="center" align="center">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </Flex>
      )}

      <iframe
        src="https://www.youtube.com/embed/iSjvnUn27EU"
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
        className={styles.video}
        onLoad={handleLoad}
        style={loading ? { display: 'none' } : { display: 'block' }}
      />
      <RegistraionBlock />
    </div>
  );
};

export default VideoLecturePage;
