import { useState } from "react";
import { Link } from "react-router-dom";
import RegistrationBlock from "components/RegistrationBlock/RegistrationBlock";
import styles from "./KnowledgePage.module.scss";
import arrowIcon from "./assets/arrow-icon.png";
import cardImage1 from "./assets/radionuclide-diagnostics.png";
import cardImage2 from "./assets/radiation-therapy.png";
import cardImage3 from "./assets/ultrasound.png";
import cardImage4 from "./assets/mri.png";
import cardImage5 from "./assets/safety.png";
import cardImage6 from "./assets/documents.png";

const cardsData = [
  {
    to: "/knowledge/radionuclidesDiagnosis",
    image: cardImage1,
    alt: "Радионуклидная диагностика и терапия",
    title: "Радионуклидная диагностика и терапия",
  },
  {
    to: "/knowledge/radiationTherapy",
    image: cardImage2,
    alt: "Лучевая терапия",
    title: "Лучевая терапия",
  },
  {
    to: "/knowledge/ultraSoundDiagnosis",
    image: cardImage3,
    alt: "УЗИ",
    title: "УЗИ",
  },
  {
    to: "/knowledge/mriDiagnosis",
    image: cardImage4,
    alt: "МРТ",
    title: "МРТ",
  },
  {
    to: "/knowledge/safety",
    image: cardImage5,
    alt: "Техника безопасности",
    title: "Техника безопасности",
  },
  {
    to: "/knowledge/regulatoryDocuments",
    image: cardImage6,
    alt: "Нормативно-правовые документы",
    title: "Нормативно-правовые документы",
  },
];

const KnowledgePage = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.introPage}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / База знаний
      </nav>

      <div className={styles.contentBlock}>
        <h2>Правила работы с блоком</h2>
        <p>
          Этот блок - настоящий кладезь знаний для медицинского физика, иными
          словами, справочник медицинского физика. Если вы зарегистрированы на
          платформе, то вам открывается доступ к справочным материалам по таким
          темам как:
        </p>
        <ul>
          <li>Лучевая терапия</li>
          <li>Радионуклидная диагностика и терапия</li>
          <li>УЗИ</li>
          <li>МРТ</li>
        </ul>
        <p>
          Также мы собрали для вас в одном месте все важные нормативные
          документы, регулирующие работу медицинского физика, уделили особое
          внимание технике безопасности.
        </p>
        <p>
          Для выполнения тестовых заданий по темам вам необходимо быть
          зарегистрированным на платформе Stepik.
        </p>
        <p>
          Внутри справочника медицинского физика есть множество гиперссылок,
          поэтому вы сможете проследить связь между темами.
        </p>
        <p>
          В конце каждой темы есть список литературных источников, если вам
          нужно будет узнать еще больше деталей.
        </p>
        <p>
          Вы всегда можете обращаться к этому блоку как к справочнику и как к
          глоссарию.
        </p>
      </div>

      <div className={styles.cardsContainer}>
        {cardsData.map((card, index) => (
          <Link key={index} to={card.to} className={styles.card}>
            <img src={card.image} alt={card.alt} className={styles.cardImage} />
            <h3>{card.title}</h3>
            <img src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
          </Link>
        ))}
      </div>

      <RegistrationBlock />
    </div>
  );
};

export default KnowledgePage;
