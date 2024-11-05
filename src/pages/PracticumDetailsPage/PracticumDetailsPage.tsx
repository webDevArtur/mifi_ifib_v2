import { useParams, Link } from "react-router-dom";
import RegistrationBlock from "components/RegistrationBlock/RegistrationBlock";
import styles from "./PracticumDetailsPage.module.scss";
import { practicumTitles, PracticumKeys } from "catalogs/practicums";

const PracticumDetailsPage = () => {
  const { id } = useParams<{ id: PracticumKeys }>();

  const practicumTitle = id ? practicumTitles[id] : "Неизвестный практикум";

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/practicum">Практикум</Link> /{" "}
        {practicumTitle}
      </nav>

      <h1 className={styles.h1}>{practicumTitle}</h1>

      <p className={styles.description}>
        Рекомендуется проходить материалы в указанной последовательности для
        лучшего усвоения темы. Все видеолекции и подкасты должны быть прослушаны
        до выполнения практических заданий.
      </p>

      <iframe
        src="https://stepik.org/course/67/syllabus"
        title="Stepik Course"
        className={styles.iframe}
      ></iframe>

      <RegistrationBlock />
    </div>
  );
};

export default PracticumDetailsPage;
