import { Link } from "react-router-dom";
import { useAuth } from "hooks/AuthProvider";
import styles from "./PlatformSection.module.scss";
import books from "./assets/books.png";

const PlatformSection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className={styles.platformSection}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img src={books} alt="Stack of books" className={styles.image} />
        </div>

        <div className={styles.textContainer}>
          <h2 className={styles.heading}>Для кого эта платформа?</h2>

          <div className={styles.chipContainer}>
            <ul className={styles.list}>
              <li className={styles.listItem}>Школьники старших классов</li>
              <li className={styles.listItem}>Студенты – медицинские физики</li>
              <li className={styles.listItem}>Практикующие специалисты</li>
            </ul>
          </div>
        </div>
      </div>

      {!isAuthenticated && (
      <Link to="/registration" className={styles.registerButton}>
        Зарегистрироваться
      </Link>
      )}
    </section>
  );
};

export default PlatformSection;
