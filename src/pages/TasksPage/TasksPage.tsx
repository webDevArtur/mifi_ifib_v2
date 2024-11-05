import { Link, useParams } from "react-router-dom";
import RegistrationBlock from "components/RegistrationBlock/RegistrationBlock";
import { FileFilled } from "@ant-design/icons";
import styles from "./TasksPage.module.scss";
import { termTitles, TermKeys } from "catalogs/terms";

const TasksPage = () => {
  const { type } = useParams<{ type: TermKeys }>();

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/knowledge">База знаний</Link> /
      </div>

      <h1 className={styles.h1}>Задания</h1>

      <p className={styles.description}>
        Предлагаем тебе следующий план для работы с разделом:
      </p>

      <p className={styles.description}>
        Просмотри термины для дальнейшего изучения раздела. После этого можешь
        переходить к учебным материалам.
      </p>

      <a
        className={styles.materialLink}
        href="https://info.cern.ch/hypertext/WWW/TheProject.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FileFilled className={styles.materialIcon} />
        Учебные материалы
      </a>

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

      <div className={styles.tabs}>
        <Link to={`/knowledge/${type}`} className={styles.tab}>
          Термины
        </Link>
        <Link to={`/knowledge/${type}/tasks`} className={styles.activeTab}>
          Задания
        </Link>
      </div>

      <iframe
        src="https://stepik.org/course/67/syllabus"
        title="Stepik Course"
        className={styles.iframe}
      ></iframe>

      <RegistrationBlock />
    </div>
  );
};

export default TasksPage;
