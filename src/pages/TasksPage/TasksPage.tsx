import { Link, useParams } from "react-router-dom";
import RegistrationBlock from "components/RegistrationBlock/RegistrationBlock";
import styles from "./TasksPage.module.scss";
import { termTitles, TermKeys } from "catalogs/terms";

const TasksPage = () => {
  const { type } = useParams<{ type: TermKeys }>();

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/knowledge">База знаний</Link> / <Link to={`/knowledge/${type}`}>{termTitles[type as TermKeys]}</Link> /
      </div>

      <h1>Задания</h1>
      <p className={styles.description}>
        Рекомендуется проходить материалы в указанной последовательности для лучшего усвоения темы. Все видео и подкасты должны быть прослушаны до выполнения практических заданий.
      </p>

      <div className={styles.tabs}>
        <Link to={`/knowledge/${type}`}>Термины</Link>
        <Link to="/equipment">Используемое оборудование</Link>
        <a href="https://info.cern.ch/hypertext/WWW/TheProject.html" target="_blank" rel="noopener noreferrer">
          Учебные материалы
        </a>
        <Link to={`/knowledge/${type}/tasks`}>Задания</Link>
      </div>

      <iframe 
        src="https://stepik.org/course/67/syllabus" 
        style={{ width: '100%', height: '90vh', border: 'none', marginBottom: '50px' }} 
        title="Stepik Course"
      ></iframe>

      <RegistrationBlock />
    </div>
  );
};

export default TasksPage;
