import Input from 'antd/es/input/Input';
import { Checkbox } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import RegistrationBlock from '../../components/RegistrationBlock/RegistrationBlock';
import cover from './assets/cover.png';
import styles from './ArticlePage.module.scss';
import { Link } from 'react-router-dom';

const ArticlePage = () => {
  const articles = [
    {
      title: 'The Role of Nuclear Medicine in Modern Healthcare',
      author: 'Джон Хопкинс',
      image: cover,
      locked: true,
    },
    {
      title:
        'Nuclear Medicine in Cardiovascular Diagnostics: Techniques and Benefits',
      author: 'Эмили Чен',
      image: cover,
      locked: false,
    },
    {
      title: 'Advancements in PET Imaging: A Review of Recent Innovations',
      author: 'Сара Браун',
      image: cover,
      locked: true,
    },
    {
      title: 'The Role of Nuclear Medicine in Modern Healthcare',
      author: 'Джон Хопкинс',
      image: cover,
      locked: false,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> /{' '}
        <Link to="/introduction">Введение в медицинскую физику</Link> /
        Научно-популярные статьи
      </div>

      <h1>Научно-популярные статьи</h1>

      <p>
        Рекомендуется проходить материалы в указанной последовательности для
        лучшего усвоения темы. Все видеолекции и подкасты должны быть прослушаны
        до выполнения практических заданий.
      </p>

      <Input
        className={styles.searchInput}
        placeholder="Введите название автора или статьи"
        prefix={<SearchOutlined />}
        bordered={false}
      />

      <ul className={styles.articleList}>
        {articles.map((article, index) => (
          <li key={index}>
            <Link to="1" className={styles.articleItem}>
              <img
                src={article.image}
                alt={article.title}
                className={styles.articleImage}
              />

              <div className={styles.articleDetails}>
                <h3>{article.title}</h3>

                <p>{article.author}</p>
              </div>

              <div className={styles.lockedCheckbox}>
                <Checkbox checked={article.locked} />
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <RegistrationBlock />
    </div>
  );
};

export default ArticlePage;
