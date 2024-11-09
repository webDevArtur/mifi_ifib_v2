import { Link, useParams } from "react-router-dom";
import styles from "./EquipmentDetailsPage.module.scss";
import RegistraionBlock from "components/RegistrationBlock/RegistrationBlock";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";
import image5 from "./assets/image5.png";
import image6 from "./assets/image6.png";
import image7 from "./assets/image7.png";
import image8 from "./assets/image8.png";

const equipmentData = [
  { 
    id: 1, 
    name: "Компьютерная томография", 
    items: [
      { modelId: 1, title: "Рентгеновская трубка", imgSrc: image1},
      { modelId: 2, title: "Помещение с компьютерным томографом", imgSrc: image2},
      { modelId: 3, title: "Компьютерный томограф", imgSrc: image3},
      { modelId: 4, title: "Портативный рентген - сканер", imgSrc: image4},
    ]
  },
  { 
    id: 2, 
    name: "Лучевая терапия", 
    items: [
      { modelId: 1, title: "Линейный ускоритель Elekta", imgSrc: image5},
      { modelId: 2, title: "Линейный ускоритель Varian", imgSrc: image6},
    ]
  },
  { 
    id: 3, 
    name: "УЗИ", 
    items: [
      { modelId: 1, title: "УЗИ - аппарат", imgSrc: image7},
    ]
  },
  { 
    id: 4, 
    name: "МРТ", 
    items: [
      { modelId: 1, title: "Магнитно - резонансный томограф", imgSrc: image8},
    ]
  },
];


const EquipmentDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Ошибка: id оборудования не найден</div>;
  }

  const equipment = equipmentData.find((item) => item.id === parseInt(id, 10));

  if (!equipment) {
    return (
      <div className={styles.container}>
        <p>Оборудование не найдено</p>
        <RegistraionBlock />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Главная</Link> /{" "}
        <Link to="/introduction">Введение в медицинскую физику</Link> /{" "}
        <Link to="/equipment">Оборудование ядерной медицины</Link> /{" "}
        {equipment.name}
      </nav>

      <h1>{equipment.name}</h1>

      <div className={styles.grid}>
        {equipment.items.map((item) => (
          <Link
            key={item.modelId}
            to={`/equipment/${equipment.id}/${item.modelId}`}
            className={styles.gridItem}
          >
            <img src={item.imgSrc} alt={item.title}  />
            <p>{item.title}</p>
          </Link>
        ))}
      </div>

      <RegistraionBlock />
    </div>
  );
};

export default EquipmentDetailsPage;