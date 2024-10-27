import { Link } from "react-router-dom";
import RegistrationBlock from "components/RegistrationBlock/RegistrationBlock";
import styles from "./IntroPage.module.scss";
import arrowIcon from "./assets/arrow-icon.png";
import cardImage1 from "./assets/videoLecture.png";
import cardImage2 from "./assets/articles.png";
import cardImage3 from "./assets/podcast.png";
import cardImage4 from "./assets/equipment.png";

const cardsData = [
  {
    to: "/articles",
    title: "Научно-популярные статьи",
    description: [
      "Обзор актуальных тем в медицинской физике",
      "Доступное объяснение сложных понятий и технологий",
      "Исторические факты и достижения в области ядерной медицины",
    ],
    image: cardImage1,
  },
  {
    to: "/video-lectures",
    title: "Видео",
    description: [
      "Визуальное представление теоретических основ медицинской физики.",
      "Примеры применения ядерной медицины в практике.",
      "Интервью с экспертами и практиками в области.",
    ],
    image: cardImage2,
  },
  {
    to: "/podcasts",
    title: "Подкасты",
    description: [
      "Обсуждение актуальных вопросов и новостей в медицинской физике.",
      "Интерактивные беседы с учеными и врачами.",
      "Удобный формат для изучения во время поездок или тренировок.",
    ],
    image: cardImage3,
  },
  {
    to: "/equipment",
    title: "Оборудование ядерной медицины",
    description: [
      "Описание основных устройств и технологий, используемых в ядерной медицине.",
      "Принципы работы и области применения оборудования.",
      "Информация о новых разработках и инновациях в данной сфере.",
    ],
    image: cardImage4,
  },
];

const IntroPage = () => {
  return (
    <div className={styles.introPage}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / Введение в медицинскую физику
      </nav>

      <h1>Введение в медицинскую физику</h1>

      <div className={styles.contentBlock}>
        <h2>Правила работы с блоком</h2>
        <p>
          Перед вами сейчас открывается дверь в мир медицинской физики. Смело
          шагайте вперед, а мы вам в этом поможем!
        </p>
        <p>
          В этом блоке представлены научно-популярные статьи, виделекции,
          подкасты и 3D модели оборудования ядерной медицины с описательными
          карточками.
        </p>
        <p>
          Вы можете в комфортном для себя темпе изучать материалы по
          интересующим вас темам. А если здесь вы не найдете ответы на какие-то
          свои вопросы, смело переходите к блоку «База знаний».
        </p>
      </div>

      <div className={styles.cardsContainer}>
        {cardsData.map((card, index) => (
          <Link key={index} to={card.to} className={styles.card}>
            <img
              src={card.image}
              alt={card.title}
              className={styles.cardImage}
            />
            <h3>{card.title}</h3>
            <ul>
              {card.description.map((desc, descIndex) => (
                <li key={descIndex}>{desc}</li>
              ))}
            </ul>
            <img src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
          </Link>
        ))}
      </div>

      <RegistrationBlock />
    </div>
  );
};

export default IntroPage;
