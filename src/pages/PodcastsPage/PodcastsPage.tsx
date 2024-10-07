import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import RegistraionBlock from 'components/RegistrationBlock/RegistrationBlock';
import ReactPlayer from 'react-player';
import styles from './PodcastsPage.module.scss';

const PodcastsPage = () => {
    const [currentPodcastUrl, setCurrentPodcastUrl] = useState('');

    const lectures = [
      {
        id: 1,
        title: 'Основы позитронно-эмиссионной томографии (ПЭТ): Принципы и Применение',
        teacher: 'Банникова Ирина, медицинская физика',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        locked: false,
      },
      {
        id: 2,
        title: 'Радионуклидная терапия: Технологии и Клинические Применения',
        teacher: 'Банникова Ирина, медицинская физика',
        url: 'https://zaycev.pegasus.zerocdn.com/db298bebc555a1c349c5a62834396b5a:2024100702/track/24891858.mp3',
        locked: false,
      },
      {
        id: 3,
        title: 'Радионуклидная терапия: Технологии и Клинические Применения',
        teacher: 'Банникова Ирина, медицинская физика',
        url: 'https://zaycev.aureolin.zerocdn.com/374d4f0c2ce4a4d4babd46f6602b1fbf:2024100702/track/6717104.mp3',
        locked: false,
      },
      {
        id: 4,
        title: 'Основы позитронно-эмиссионной томографии (ПЭТ): Принципы и Применение',
        teacher: 'Банникова Ирина, медицинская физика',
        url: 'https://zaycev.pe.zerocdn.com/95a487c128ecbc7cd01bca4c343615e6:2024100702/track/24679285.mp3',
        locked: false,
      },
    ];
  
    const handleCardClick = (url: string) => {
      setCurrentPodcastUrl(url);
    };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> /{' '}
        <Link to="/introduction">Введение в медицинскую физику</Link> /
      </div>

      <h1>Подкасты</h1>
      <p className={styles.description}>
        Рекомендуется проходить материалы в указанной последовательности для
        лучшего усвоения темы. Все видеолекции и подкасты должны быть прослушаны
        до выполнения практических заданий.
      </p>

      <Input
        className={styles.searchInput}
        placeholder="Введите название подкаста или автора"
        prefix={<SearchOutlined />}
        bordered={false}
      />

      <div className={styles.podcastGrid}>
        {lectures.map((lecture) => (
          <div key={lecture.id} className={styles.podcastCard} onClick={() => handleCardClick(lecture.url)}>
              <div className={styles.thumbnail}>
                <div className={styles.overlay}>
                  <div className={styles.playButton}></div>
                  {lecture.locked && <div className={styles.locked}></div>}
                </div>
              </div>

              <div className={styles.lectureInfo}>
                <h3>{lecture.title}</h3>
                <p>{lecture.teacher}</p>
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
