import { Link } from "react-router-dom";
import RegistrationBlock from "components/RegistrationBlock/RegistrationBlock";
import styles from "./PracticumPage.module.scss";
import arrowIcon from "./assets/arrow-icon.png";
import cardImage1 from "./assets/VERT.png";
import cardImage2 from "./assets/radionuclide-diagnostics.png";
import cardImage3 from "./assets/planningSystem.png";
import cardImage4 from "./assets/ultrasound.png";
import cardImage5 from "./assets/mri.png";
import cardImage6 from "./assets/gamma.png";
import cardImage7 from "./assets/Biopac.png";
import cardImage8 from "./assets/GATE.jpg";
import cardImage9 from "./assets/Monitor.png";
import cardImage10 from "./assets/LingWaves.jpg";

const cardData = [
  { to: "/practicum/vert", src: cardImage1, alt: "VERT", title: "VERT" },
  {
    to: "/practicum/virtualSimulators",
    src: cardImage2,
    alt: "Виртуальные тренажеры ИФИБ",
    title: "Виртуальные тренажеры ИФИБ",
  },
  {
    to: "/practicum/planningSystem",
    src: cardImage3,
    alt: "Система планирования",
    title: "Система планирования",
  },
  { to: "/practicum/ultrasound", src: cardImage4, alt: "УЗИ", title: "УЗИ" },
  { to: "/practicum/mri", src: cardImage5, alt: "МРТ", title: "МРТ" },
  {
    to: "/practicum/gamma",
    src: cardImage6,
    alt: "Гамма-спектрометр",
    title: "Гамма-спектрометр",
  },
  { to: "/practicum/biopac", src: cardImage7, alt: "Biopac", title: "Biopac" },
  { to: "/practicum/gate", src: cardImage8, alt: "GATE", title: "GATE" },
  {
    to: "/practicum/monitor",
    src: cardImage9,
    alt: "Monitor",
    title: "Monitor",
  },
  {
    to: "/practicum/lingwaves",
    src: cardImage10,
    alt: "Lingwaves",
    title: "Lingwaves",
  },
];

const PracticumPage = () => {
  return (
    <div className={styles.introPage}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / Практикум
      </nav>

      <div className={styles.contentBlock}>
        <h2>Правила работы с блоком</h2>
        <p>
          В этом блоке вы узнаете, с чем сталкивается студент – медицинский
          физик во время обучения в ИФИБ НИЯУ МИФИ.
        </p>
        <p>
          Вас ждут практические, ситуационные задачи и лабораторные работы.
          Разделы этого блока – оборудование и ПО, используемое в учебных целях
          в ИФИБ НИЯУ МИФИ. В каждом разделе есть краткая теоретическая справка
          про оборудование и ПО: физические основы, область применения,
          функционал.
        </p>
        <p>
          Задачи выполняются после изучения теоретических материалов в "Базе
          знаний". Во всех разделах размещены задачи разного уровня, поэтому
          рекомендуем двигаться по порядку - от простых к сложным.
        </p>
        <p>
          Для выполнения заданий вам необходимо быть зарегистрированными на
          платформе Stepik.
        </p>
      </div>

      <div className={styles.cardsContainer}>
        {cardData.map((card) => (
          <Link to={card.to} className={styles.card} key={card.title}>
            <img src={card.src} alt={card.alt} className={styles.cardImage} />
            <h3>{card.title}</h3>
            <img src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
          </Link>
        ))}
      </div>

      <RegistrationBlock />
    </div>
  );
};

export default PracticumPage;
