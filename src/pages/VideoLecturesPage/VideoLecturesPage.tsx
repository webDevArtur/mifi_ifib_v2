import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import RegistraionBlock from '../../components/RegistrationBlock/RegistrationBlock';
import styles from './VideoLecturesPage.module.scss';

const VideoLecturesPage = () => {
  const lectures = [
    {
      id: 1,
      title:
        'Основы позитронно-эмиссионной томографии (ПЭТ): Принципы и Применение',
      teacher: 'Банникова Ирина, медицинская физика',
      locked: true,
    },
    {
      id: 2,
      title: 'Радионуклидная терапия: Технологии и Клинические Применения',
      teacher: 'Банникова Ирина, медицинская физика',
      locked: true,
    },
    {
      id: 3,
      title: 'Радионуклидная терапия: Технологии и Клинические Применения',
      teacher: 'Банникова Ирина, медицинская физика',
      locked: true,
    },
    {
      id: 4,
      title:
        'Основы позитронно-эмиссионной томографии (ПЭТ): Принципы и Применение',
      teacher: 'Банникова Ирина, медицинская физика',
      locked: true,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> /{' '}
        <Link to="/introduction">Введение в медицинскую физику</Link> /
        Видеолекции
      </div>

      <h1>Видеолекции</h1>
      <p className={styles.description}>
        Рекомендуется проходить материалы в указанной последовательности для
        лучшего усвоения темы. Все видеолекции и подкасты должны быть прослушаны
        до выполнения практических заданий.
      </p>

      <Input
        className={styles.searchInput}
        placeholder="Введите название видеолекции"
        prefix={<SearchOutlined />}
        bordered={false}
      />

      <div className={styles.videoGrid}>
        {lectures.map((lecture) => (
          <div key={lecture.id} className={styles.videoCard}>
            <Link to="1">
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
            </Link>
          </div>
        ))}
      </div>

      <RegistraionBlock />
    </div>
  );
};

export default VideoLecturesPage;
