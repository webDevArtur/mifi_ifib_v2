import { Link, useParams } from "react-router-dom";
import styles from "./QuestsDetailsPage.module.scss";
import arrowIcon from "./assets/arrow-icon.png";
import cardImage1 from "./assets/radionuclide-diagnostics.png";
import cardImage2 from "./assets/radiation-therapy.png";
import cardImage3 from "./assets/ultrasound.png";
import cardImage4 from "./assets/mri.png";

const cardsData = [
  {
    id: 1,
    image: cardImage1,
    alt: "Радионуклидная диагностика и терапия",
    title: "Радионуклидная диагностика и терапия",
  },
  {
    id: 2,
    image: cardImage2,
    alt: "Лучевая терапия",
    title: "Лучевая терапия",
  },
  {
    id: 3,
    image: cardImage3,
    alt: "УЗИ",
    title: "УЗИ",
  },
  {
    id: 4,
    image: cardImage4,
    alt: "МРТ",
    title: "МРТ",
  },
];

const QuestsDetailsPage = () => {
  const { name } = useParams();

  return (
    <div className={styles.introPage}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/quests">Квесты</Link> / {name}
      </nav>

      <div className={styles.contentBlock}>
        <h2>{name}</h2>
        <p className={styles.description}>
          В этом блоке вы узнаете, с чем сталкивается студент – медицинский
          физик во время обучения в ИФИБ НИЯУ МИФИ.
        </p>

        <p className={styles.description}>
          Для выполнения заданий вам необходимо быть зарегистрированными на
          платформе Stepik.
        </p>
      </div>

      <div className={styles.cardsContainer}>
        {cardsData.map((card) => (
          <Link
            key={card.id}
            to={`/quests/${name}/${card.id}`}
            className={styles.card}
          >
            <img src={card.image} alt={card.alt} className={styles.cardImage} />
            <h3>{card.title}</h3>
            <img src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuestsDetailsPage;
