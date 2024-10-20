import { Button, Carousel } from "antd";
import styles from "./AboutSection.module.scss";
import aboutIfib1 from "./assets/aboutIFIB1.png";
import aboutIfib2 from "./assets/aboutIFIB2.png";

const AboutSection = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Об ИФИБ</h1>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <Carousel
            adaptiveHeight
            autoplay
            dots
            dotPosition="bottom"
            className={styles.imageCarusel}
          >
            <div>
              <img
                src={aboutIfib1}
                alt="Students at the Institute 1"
                className={styles.image}
              />
            </div>

            <div>
              <img
                src={aboutIfib2}
                alt="Students at the Institute 2"
                className={styles.image}
              />
            </div>
          </Carousel>
        </div>

        <div className={styles.textContainer}>
          <p>
            ИФИБ (Инженерно - физический институт биомедицины) НИЯУ МИФИ —
            ведущий образовательный и научный центр, готовящий специалистов в
            области медицинской физики, биоинженерии и информационных технологий
            в медицине.
          </p>

          <p>
            В институте реализуются современные образовательные программы,
            которые сочетают фундаментальные знания с практическими навыками.
          </p>

          <div className={styles.buttonContainer}>
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
    </div>
  );
};

export default AboutSection;
