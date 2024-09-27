import { Carousel } from 'antd';
import styles from './AboutSection.module.scss';
import aboutIfib1 from './assets/aboutIFIB1.png';

const AboutSection = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Об ИФИБ</h1>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
        <Carousel autoplay dots dotPosition='bottom' className={styles.imageCarusel}>
            <div>
              <img
                src={aboutIfib1}
                alt="Students at the Institute"
                className={styles.image}
              />
            </div>

            <div>
              <img
                src={aboutIfib1}
                alt="Another description"
                className={styles.image}
              />
            </div>

            <div>
              <img
                src={aboutIfib1}
                alt="Another description"
                className={styles.image}
              />
            </div>
          </Carousel>
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
