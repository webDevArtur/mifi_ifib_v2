import { Link } from "react-router-dom";
import QuestCard from "components/QuestCard/QuestCard";
import styles from "./QuestsPage.module.scss";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";

const quests = [
  {
    title: "История ядерной медицины",
    isOnline: true,
    rating: 2,
    key: 1,
    backgroundImage: image1,
  },
  {
    title: "Диагностика и терапия",
    isOnline: true,
    rating: 3,
    questCount: 6,
    key: 2,
    backgroundImage: image2,
  },
  {
    title: "Общий квест",
    isOnline: false,
    rating: 1,
    key: 3,
    backgroundImage: image3,
  },
];

const QuestsPage = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / Квесты
      </nav>

      <h1 className={styles.h1}>Квесты</h1>

      <h3 className={styles.h3}>Правила работы с блоком</h3>

      <p className={styles.description}>
        В этом блоке вы узнаете, с чем сталкивается студент – медицинский физик
        во время обучения в ИФИБ НИЯУ МИФИ.
      </p>

      <p className={styles.description}>
        Вас ждут практические, ситуационные задачи и лабораторные работы.
        Разделы этого блока – оборудование и ПО, используемое в учебных целях в
        ИФИБ НИЯУ МИФИ. В каждом разделе есть краткая теоретическая справка про
        оборудование и ПО: физические основы, область применения, функционал.
      </p>

      <p className={styles.description}>
        Задачи выполняются после изучения теоретических материалов в "Базе
        знаний". Во всех разделах размещены задачи разного уровня, поэтому
        рекомендуем двигаться по порядку - от простых к сложным.
      </p>

      <p className={styles.description}>
        Для выполнения заданий вам необходимо быть зарегистрированными на
        платформе Stepik.
      </p>

      <p className={styles.assesment}>Количество баллов:</p>

      <div className={styles.cards}>
        {quests.map((quest) => (
          <Link
            to={`/quests/${encodeURIComponent(quest.title)}`}
            key={quest.key}
          >
            <QuestCard {...quest} />
          </Link>
        ))}
      </div>

    </div>
  );
};

export default QuestsPage;
