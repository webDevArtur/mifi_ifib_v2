import { Link, useParams } from "react-router-dom";
import tasksImage from "./assets/tasks.png";
import styles from "./TasksPage.module.scss";
import { termTitles, TermKeys } from "catalogs/terms";
import IframeWithLoader from "components/IframeWithLoader/IframeWithLoader";

const TasksPage = () => {
  const { type } = useParams<{ type: TermKeys }>();

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/knowledge">База знаний</Link> / {termTitles[type as TermKeys] || ""}
      </div>

      <div className={styles.containerHeader} >
        <div className={styles.leftContainer}>
          <h1 className={styles.h1}>{termTitles[type as TermKeys] || ""}</h1>

          <p className={styles.description}>
            Предлагаем тебе следующий план для работы с разделом:
          </p>

          <p className={styles.description}>
            Просмотри термины для дальнейшего изучения раздела. После этого можешь
            переходить к учебным материалам.
          </p>

          <p className={styles.description}>
            В учебных материалах находится справочник медицинских физиков с краткой
            теорией по темам и перекрестными ссылками внутри, чтобы сразу убрать
            возникающие вопросы.
          </p>

          <p className={styles.description}>
            После изучения материалов предлагаем ответить на тестовые задания в
            соответствующей вкладке.
          </p>

          <p className={styles.description}>
            Если материал, представленный в справочнике медицинского физика кажется
            вам сложным и непонятным, ознакомься с видеоматериалами, научно –
            популярными статьями и
            <Link className={styles.textLink} to="/equipment">
              {" "}
              3Д моделями используемого оборудования{" "}
            </Link>{" "}
            с описательными карточками.
          </p>
        </div>

          <Link to="https://info.cern.ch/hypertext/WWW/TheProject.html" target="_blank" className={styles.card}>
            <img
              src={tasksImage}
              alt='Учебные материалы'
              className={styles.cardImage}
            />
            <h3 className={styles.cardTitle}>Учебные материалы</h3>
          </Link>
      </div>

      <div className={styles.tabs}>
        <Link to={`/knowledge/${type}`} className={styles.tab}>
          Термины
        </Link>
        <Link to={`/knowledge/${type}/tasks`} className={styles.activeTab}>
          Задания
        </Link>
      </div>

      <IframeWithLoader src="https://stepik.org/course/67/syllabus"/>
    </div>
  );
};

export default TasksPage;
