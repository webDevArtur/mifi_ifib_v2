import { useState } from 'react';
import { Link } from 'react-router-dom';
import RegistrationBlock from '../../components/RegistrationBlock/RegistrationBlock';
import styles from './DiagnosticsPage.module.scss';

const alphabetTerms: Record<string, { term: string; description: string }[]> = {
  А: [
    {
      term: 'Аналгезия',
      description: 'Состояние, при котором отсутствует чувство боли.',
    },
    {
      term: 'Антибиотик',
      description: 'Препарат, используемый для лечения бактериальных инфекций.',
    },
  ],
  Б: [
    {
      term: 'Бронхит',
      description:
        'Воспаление бронхов, сопровождающееся кашлем и затруднением дыхания.',
    },
  ],
  В: [
    {
      term: 'Вакцина',
      description:
        'Биологический препарат, стимулирующий иммунитет к определённому заболеванию.',
    },
  ],
  Г: [{ term: 'Гипотензия', description: 'Пониженное артериальное давление.' }],
  Д: [
    {
      term: 'Депрессия',
      description:
        'Психическое расстройство, характеризующееся подавленным настроением.',
    },
  ],
  Е: [{ term: 'Эмболия', description: 'Закупорка кровеносного сосуда.' }],
  Ж: [
    {
      term: 'Желтуха',
      description:
        'Симптом, характеризующийся желтым окрашиванием кожи и слизистых оболочек.',
    },
  ],
  З: [
    {
      term: 'Заболевание',
      description: 'Отклонение от нормального состояния здоровья.',
    },
  ],
  И: [
    {
      term: 'Иммунитет',
      description:
        'Способность организма противостоять инфекциям и другим заболеваниям.',
    },
  ],
  Й: [
    {
      term: 'Йододефицит',
      description:
        'Нехватка йода в организме, приводящая к заболеваниям щитовидной железы.',
    },
  ],
  К: [
    {
      term: 'Кардиология',
      description: 'Раздел медицины, изучающий сердечно-сосудистую систему.',
    },
  ],
  Л: [{ term: 'Лейкемия', description: 'Онкологическое заболевание крови.' }],
  М: [
    {
      term: 'Мигрень',
      description: 'Сильная головная боль, часто сопровождающаяся тошнотой.',
    },
  ],
  Н: [
    {
      term: 'Невралгия',
      description: 'Болезнь, связанная с поражением нервов.',
    },
  ],
  О: [
    {
      term: 'Остеопороз',
      description: 'Заболевание костной ткани, приводящее к её истончению.',
    },
  ],
  П: [
    {
      term: 'Пневмония',
      description: 'Воспаление лёгких, вызванное инфекцией.',
    },
  ],
  Р: [
    {
      term: 'Рак',
      description:
        'Онкологическое заболевание, характеризующееся неконтролируемым ростом клеток.',
    },
  ],
  С: [
    {
      term: 'Сахарный диабет',
      description:
        'Хроническое заболевание, связанное с нарушением обмена глюкозы.',
    },
  ],
  Т: [
    { term: 'Тромбоз', description: 'Образование сгустков крови в сосудах.' },
  ],
  У: [
    {
      term: 'Урология',
      description: 'Раздел медицины, изучающий мочеполовую систему.',
    },
  ],
  Ф: [
    {
      term: 'Фармакология',
      description: 'Наука, изучающая действие лекарственных средств.',
    },
  ],
  Х: [
    {
      term: 'Холестерин',
      description:
        'Органическое соединение, играющее важную роль в обмене веществ.',
    },
  ],
  Ц: [
    {
      term: 'Цирроз',
      description:
        'Хроническое заболевание печени, приводящее к её разрушению.',
    },
  ],
  Ч: [
    {
      term: 'Чума',
      description:
        'Острое инфекционное заболевание, передающееся через блох и грызунов.',
    },
  ],
  Ш: [
    {
      term: 'Шизофрения',
      description:
        'Хроническое психическое расстройство, нарушающее восприятие реальности.',
    },
  ],
  Щ: [
    {
      term: 'Щитовидная железа',
      description: 'Железа внутренней секреции, регулирующая обмен веществ.',
    },
  ],
  Э: [{ term: 'Энцефалит', description: 'Воспаление головного мозга.' }],
  Ю: [
    {
      term: 'Ювенильный артрит',
      description: 'Воспалительное заболевание суставов у детей и подростков.',
    },
  ],
  Я: [
    {
      term: 'Язвенная болезнь',
      description:
        'Хроническое заболевание, характеризующееся образованием язв в желудке.',
    },
  ],
};

const DiagnosticsPage = () => {
  const [activeTab, setActiveTab] = useState('terms');
  const [selectedLetter, setSelectedLetter] = useState('А');

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/knowledge">База знаний</Link> /
      </div>

      <h1>Диагностика</h1>
      <p className={styles.description}>
        Рекомендуется проходить материалы в указанной последовательности для
        лучшего усвоения темы. Все видеолекции и подкасты должны быть прослушаны
        до выполнения практических заданий.
      </p>

      <div className={styles.tabs}>
        <button
          className={activeTab === 'terms' ? styles.activeTab : ''}
          onClick={() => setActiveTab('terms')}
        >
          Термины
        </button>

        <button
          className={activeTab === 'equipment' ? styles.activeTab : ''}
          onClick={() => setActiveTab('equipment')}
        >
          Используемое оборудование
        </button>

        <button
          className={activeTab === 'materials' ? styles.activeTab : ''}
          onClick={() => setActiveTab('materials')}
        >
          Учебные материалы
        </button>

        <button
          className={activeTab === 'tasks' ? styles.activeTab : ''}
          onClick={() => setActiveTab('tasks')}
        >
          Задания
        </button>
      </div>

      {activeTab === 'terms' && (
        <div className={styles.termsSection}>
          <div className={styles.alphabet}>
            {Object.keys(alphabetTerms).map((letter) => (
              <span
                key={letter}
                className={selectedLetter === letter ? styles.activeLetter : ''}
                onClick={() => setSelectedLetter(letter)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedLetter(letter);
                  }
                }}
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer', marginRight: '10px' }}
              >
                {letter}
              </span>
            ))}
          </div>

          <div className={styles.termsList}>
            {alphabetTerms[selectedLetter]?.map(({ term, description }) => (
              <div className={styles.term} key={term}>
                <h3>{term}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <RegistrationBlock />
    </div>
  );
};

export default DiagnosticsPage;
