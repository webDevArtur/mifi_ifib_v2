import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Spin, Flex} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import RegistrationBlock from '../../components/RegistrationBlock/RegistrationBlock';
import styles from './KnowledgePage.module.scss';

const KnowledgePage = () => {
    const [loading, setLoading] = useState(true);

    const handleLoad = () => {
      setLoading(false);
    };

  return (
    <div className={styles.introPage}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / База знаний
      </nav>

      <div className={styles.contentBlock}>
        <h2>Правила работы с блоком</h2>

        <p>Цель блока: <br/> Ознакомить студентов с основами медицинской физики и её роль в диагностике и лечении заболеваний с использованием ядерной медицины.</p>

        <p>Структура материала: <br/> Блок включает научно-популярные статьи, видеолекции, подкасты и информацию об оборудовании ядерной медицины.</p>

        <p>Изучение материалов:
            <br/> Рекомендуется проходить материалы в указанной последовательности для лучшего усвоения темы.

            <br/>Все видеолекции и подкасты должны быть прослушаны до выполнения практических заданий.
        </p>

        <p>Следование этим правилам поможет обеспечить эффективное и продуктивное обучение в области медицинской физики. Удачи в учебе!</p>
      </div>

      <div className={styles.cardsContainer}>
        <Link to="/diagnostics" className={styles.card}>
            <h3>Диагностика</h3>

            <ul>
                <li>            
                    Обзор актуальных тем в медицинской физике
                </li>

                <li>
                    Доступное объяснение сложных понятий и технологий
                </li>

                <li>
                    Исторические факты и достижения в области ядерной медицины
                </li>
            </ul>
        </Link>

        <Link to="/therapy" className={styles.card}>
            <h3>Терапия</h3>

            <ul>
                <li>
                Визуальное представление теоретических основ медицинской физики.
                </li>

                <li>
                Примеры применения ядерной медицины в практике.
                </li>

                <li>
                Интервью с экспертами и практиками в области.
                </li>
            </ul>
        </Link>

        <Link to="/radianuclides" className={styles.card}>
            <h3>Радионуклиды</h3>

            <ul>
                <li>
                    Обсуждение актуальных вопросов и новостей в медицинской физике.
                </li>
            
                <li>
                    Интерактивные беседы с учеными и врачами.
                </li>

                <li>
                    Удобный формат для изучения во время поездок или тренировок.
                </li>
            </ul>
        </Link>

        <Link to="/documents" className={styles.card}>
            <h3>Нормативно-правовые документы</h3>

            <ul>
                <li>
                    Описание основных устройств и технологий, используемых в ядерной медицине.
                </li>

                <li>
                    Принципы работы и области применения оборудования.
                </li>

                <li>
                    Информация о новых разработках и инновациях в данной сфере.
                </li>
            </ul>
        </Link>
      </div>

      {loading && (
        <Flex className={styles.spinner} justify="center" align="center" >
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </Flex>
      )}

      <iframe
        src="https://www.youtube.com/embed/iSjvnUn27EU"
        frameBorder="0"
        allowFullScreen
        className={styles.video}
        onLoad={handleLoad}
        style={loading ? { display: 'none' } : { display: 'block' }}
      />
      <RegistrationBlock />
    </div>
  );
};

export default KnowledgePage;
