import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Spin, Flex } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import RegistrationBlock from 'components/RegistrationBlock/RegistrationBlock';
import styles from './KnowledgePage.module.scss';
import cardImage1 from './assets/radionuclide-diagnostics.png'; // Image paths
import cardImage2 from './assets/radiation-therapy.png';
import cardImage3 from './assets/ultrasound.png';
import cardImage4 from './assets/mri.png';
import cardImage5 from './assets/safety.png';
import cardImage6 from './assets/documents.png';
import arrowIcon from './assets/arrow-icon.png';

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

        <p>
        Этот блок - настоящий кладезь знаний для медицинского физика, иными словами, справочник
        медицинского физика. Если вы зарегистрированы на платформе, то вам открывается доступ к
        справочным материалам по таким темам как:
        </p>

        <ul>
          <li>Лучевая терапия</li>
          <li>Радионуклидная диагностика и терапия</li>
          <li>УЗИ</li>
          <li>МРТ</li>
        </ul>

        <p>
        Также мы собрали для вас в одном месте все важные нормативные документы, регулирующие работу
        медицинского физика, уделили особое внимание технике безопасности.
        </p>

        <p>
        Для выполнения тестовых заданий по темам вам необходимо быть зарегистрированным на платформе
        Stepik.
        </p>

        <p>
        Внутри справочника медицинского физика есть множество гиперссылок, поэтому вы сможете
        проследить связь между темами.
        </p>

        <p>
        В конце каждой темы есть список литературных источников, если вам нужно будет узнать еще больше
        деталей.
        </p>

        <p>
        Вы всегда можете обращаться к этому блоку как к справочнику и как к глоссарию.
        </p>
      </div>

      <div className={styles.cardsContainer}>
        <Link to="/knowledge/radionuclidesDiagnosis" className={styles.card}>
          <img src={cardImage1} alt="Радионуклидная диагностика и терапия" className="cardImage" />
          <h3>Радионуклидная диагностика и терапия</h3>
          <img src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
        </Link>

        <Link to="/knowledge/radiationTherapy" className={styles.card}>
          <img src={cardImage2} alt="Лучевая терапия" className={styles.cardImage} />
          <h3>Лучевая терапия</h3>
          <img src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
        </Link>

        <Link to="/knowledge/ultraSoundDiagnosis" className={styles.card}>
          <img src={cardImage3} alt="УЗИ" className={styles.cardImage} />
          <h3>УЗИ</h3>
          <img src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
        </Link>

        <Link to="/knowledge/mriDiagnosis" className={styles.card}>
          <img src={cardImage4} alt="МРТ" className={styles.cardImage} />
          <h3>МРТ</h3>
          <img src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
        </Link>

        <Link to="/knowledge/safety" className={styles.card}>
          <img src={cardImage5} alt="Техника безопасности" className={styles.cardImage} />
          <h3>Техника безопасности</h3>
          <img src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
        </Link>

        <Link to="/knowledge/regulatoryDocuments" className={styles.card}>
          <img src={cardImage6} alt="Нормативно-правовые документы" className={styles.cardImage} />
          <h3>Нормативно-правовые документы</h3>
          <img src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
        </Link>
      </div>

      {loading && (
        <Flex className={styles.spinner} justify="center" align="center">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </Flex>
      )}

      <iframe
        src="https://www.youtube.com/embed/iSjvnUn27EU"
        title="YouTube video player"
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
