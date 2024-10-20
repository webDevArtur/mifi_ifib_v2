import { Link } from "react-router-dom";
import { useAuth } from "hooks/AuthProvider";
import styles from "./RegistrationBlock.module.scss";

const Button = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.title}>Зарегистрируйтесь</div>

        <div className={styles.text}>
          чтобы получить доступ ко всем материалам!
        </div>
      </div>

      <div className={styles.buttonBox}>
        <Link to="/registration" className={styles.button}>
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};

export default Button;
