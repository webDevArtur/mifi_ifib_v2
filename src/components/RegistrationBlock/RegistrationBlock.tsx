import { Link } from 'react-router-dom';
import styles from './RegistrationBlock.module.scss';

const Button = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.title}>
            Зарегистрируйтесь
        </div>

        <div className={styles.text}>
            чтобы получить доступ ко всем материалам!
        </div>
      </div>

      <Link to="/registration" className={styles.button}>Зарегистрироваться</Link>
    </div>
  );
};

export default Button;