import { Link } from "react-router-dom";
import QuestCard from "components/QuestCard/QuestCard";
import { useCurrentUser } from "hooks/useCurrentUser";
import styles from "./QuestsPage.module.scss";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";

const questTypeTranslations = {
  nuclear_medicine_history: "История ядерной медицины",
  diagnostics: "Диагностика",
  therapy: "Терапия",
  common_quest: "Общий квест",
  nuclear_medicine_economics: "Экономика ядерной медицины",
  clinical_cases: "Клинические случаи",
  emergency_situations: "Аварийные ситуации",
};

const quests = [
  {
    id: 1,
    title: questTypeTranslations.nuclear_medicine_history,
    isOnline: true,
    rating: 2,
    questType: "nuclear_medicine_history",
    backgroundImage: image1,
  },
  {
    id: 2,
    title: questTypeTranslations.diagnostics,
    isOnline: true,
    rating: 3,
    questType: "diagnostics",
    backgroundImage: image2,
  },
  {
    id: 3,
    title: questTypeTranslations.common_quest,
    isOnline: false,
    rating: 1,
    questType: "common_quest",
    backgroundImage: image3,
  },
  {
    id: 4,
    title: questTypeTranslations.nuclear_medicine_economics,
    isOnline: true,
    rating: 4,
    questType: "nuclear_medicine_economics",
    backgroundImage: image1,
  },
  {
    id: 5,
    title: questTypeTranslations.clinical_cases,
    isOnline: true,
    rating: 5,
    questType: "clinical_cases",
    backgroundImage: image2,
  },
  {
    id: 6,
    title: questTypeTranslations.emergency_situations,
    isOnline: false,
    rating: 3,
    questType: "emergency_situations",
    backgroundImage: image3,
  },
];


const QuestsPage = () => {
  const { data: user, isLoading: isLoadingUser } = useCurrentUser();

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

      <p className={styles.assesment}>Количество баллов: {user?.user.questsScore || 0}</p>

      <div className={styles.cards}>
        {quests.map((quest) => (
          <Link
            to={`/quests/${quest.questType}`}
            key={quest.id}
          >
            <QuestCard title={quest.title} backgroundImage={quest.backgroundImage} />
          </Link>
        ))}
      </div>

    </div>
  );
};

export default QuestsPage;
