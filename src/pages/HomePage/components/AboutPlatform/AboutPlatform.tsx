import styles from './AboutPlatdorm.module.scss';

const AboutPlatform = () => {
  return (
    <div className={styles.platformInfo}>
      <h1 className={styles.platformInfoTitle}>О платформе</h1>

      <p className={styles.platformInfoDescription}>
      Эта платформа для будущих и практикующих медицинских физиков предоставляет комплексные возможности для
      эффективного обучения.
      </p>

      <p className={styles.platformInfoDescription}>
      Это пространство для всестороннего профессионального развития, где традиционные методы образования сочетаются с
      инновационными интерактивными подходами.
      </p>

      <div className={styles.platformInfoFeatures}>
        <div className={styles.platformInfoFeature}>
          <h2 className={styles.platformInfoFeatureTitle}>Лекции</h2>

          <p className={styles.platformInfoFeatureDescription}>
            Просмотр видеолекций от ведущих специалистов
          </p>
        </div>

        <div className={styles.platformInfoFeature}>
          <h2 className={styles.platformInfoFeatureTitle}>Статьи</h2>

          <p className={styles.platformInfoFeatureDescription}>
            Получение доступа к научно-популярным статьям.
          </p>
        </div>

        <div className={styles.platformInfoFeature}>
          <h2 className={styles.platformInfoFeatureTitle}>Обучение</h2>

          <p className={styles.platformInfoFeatureDescription}>
            Погружение в медицинскую физику с помощью «Базы
            знаний»
          </p>
        </div>

        <div className={styles.platformInfoFeature}>
          <h2 className={styles.platformInfoFeatureTitle}>Квесты</h2>

          <p className={styles.platformInfoFeatureDescription}>
            Прохождение интерактивных квестов для закрепления
            теоретических и практических навыков
          </p>
        </div>
      </div>
  </div>
  );
};

export default AboutPlatform;