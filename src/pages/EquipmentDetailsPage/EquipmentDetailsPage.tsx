import { Link } from 'react-router-dom';
import RegistraionBlock from 'components/RegistrationBlock/RegistrationBlock';
import styles from './EquipmentDetailsPage.module.scss';
import image1 from './assets/image1.png';
import image2 from './assets/image2.png';
import image3 from './assets/image3.png';

const scintigraphyData = [
  { id: 1, title: 'Сцинтиграфия миокарда', imgSrc: image1 },
  { id: 2, title: 'Сцинтиграфия костей скелета', imgSrc: image2 },
  { id: 3, title: 'Сцинтиграфия почек', imgSrc: image3 },
  { id: 4, title: 'Сцинтиграфия щитовидной железы', imgSrc: image2 },
  { id: 5, title: 'Сцинтиграфия миокарда', imgSrc: image3 },
  { id: 6, title: 'Сцинтиграфия головного мозга', imgSrc: image1 },
];

const EquipmentDetailsPage = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Главная</Link> /{' '}
        <Link to="/introduction">Введение в медицинскую физику</Link> /{' '}
        <Link to="/equipment">Оборудование ядерной медицины</Link> /{' '}
      </nav>

      <h1>Сцинтиграфия</h1>

      <div className={styles.grid}>
        {scintigraphyData.map((item) => (
          <div key={item.id} className={styles.gridItem}>
            <img src={item.imgSrc} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      <RegistraionBlock />
    </div>
  );
};

export default EquipmentDetailsPage;
