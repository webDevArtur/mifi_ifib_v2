import {Link} from 'react-router-dom';
import styles from './ErrorPage.module.scss';

const ErrorPage = () => {
  return (
    <div className={styles.container}>
        <h1>Страница не найдена</h1>
        <p>Извините, но запрашиваемая вами страница не существует.</p>
        <p>Возможно, вы ошиблись в адресе или страница была удалена.</p>
        <Link to="/">Вернуться на главную страницу</Link>
    </div>
  );
};

export default ErrorPage;
