import {Link} from 'react-router-dom';
import styles from './PlatformSection.module.scss';
import books from '../../../../assets/books.png';

const PlatformSection = () => {
  return (
    <section className={styles.platformSection}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img
            src={books}
            alt="Stack of books"
            className={styles.image}
          />
        </div>

        <div className={styles.textContainer}>
          <h2 className={styles.heading}>Для кого эта платформа?</h2>
          
          <div className={styles.chipContainer}>
            <span className={styles.chip}>Школьники старших классов</span>

            <span className={styles.chip}>
              Студенты – медицинские физики
            </span>

            <span className={styles.chip}>Практикующие специалисты</span>
          </div>
        </div>
      </div>

      <Link to="/registration" className={styles.registerButton}>
        Зарегистрироваться
      </Link>
    </section>
  );
};

export default PlatformSection;
