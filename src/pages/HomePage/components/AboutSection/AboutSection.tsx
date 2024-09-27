import styles from './AboutSection.module.scss';
import aboutIfib from './assets/aboutIFIB.png';

const AboutSection = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Об ИФИБ</h1>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img
            src={aboutIfib}
            alt="Students at the Institute"
            className={styles.image}
          />
        </div>

        <div className={styles.textContainer}>
          <p>
            Факультет ИФИБ (Институт физики и инженерии биомедицинских систем)
            НИЯУ МИФИ — ведущий образовательный и научный центр, готовящий
            специалистов в области медицинской физики, биоинженерии и
            информационных технологий в медицине.
          </p>

          <p>
            На факультете реализуются современные образовательные программы,
            которые сочетают фундаментальные знания с практическими навыками.
          </p>

          <a
            href="https://physbio.mephi.ru/"
            target="_blank"
            className={styles.button}
            rel="noreferrer"
          >
            Перейти на сайт ИФИБ
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
