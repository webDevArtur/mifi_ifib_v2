import { useParams } from "react-router-dom";
import styles from "./EquipmentModelPage.module.scss";
import { Link } from "react-router-dom";
import RegistrationBlock from "components/RegistrationBlock/RegistrationBlock";
import { NoData } from "components/NoData/NoData";

const equipmentData = [
  { 
    id: 1, 
    name: "Компьютерная томография", 
    items: [
      { modelId: 1, title: "Рентгеновская трубка", link: "https://sketchfab.com/models/94ed632aa92b405e933578234cc2fe9c/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0" },
      { modelId: 2, title: "Помещение с компьютерным томографом", link: "https://sketchfab.com/models/c89d0b01ac6e49bd981bb8e487342777/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0" },
      { modelId: 3, title: "Компьютерный томограф", link: "https://sketchfab.com/models/fafbcaf09b9a4321a412b49767d787a5/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0" },
      { modelId: 4, title: "Портативный рентген - сканер", link: "https://sketchfab.com/models/290855e57db842648c909e44aca934b4/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0" },
    ]
  },
  { 
    id: 2, 
    name: "Лучевая терапия", 
    items: [
      { modelId: 1, title: "Линейный ускоритель Elekta", link: "https://sketchfab.com/models/549618877be345ebbf41d0ca051b9ce5/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0" },
      { modelId: 2, title: "Линейный ускоритель Varian", link: "https://sketchfab.com/models/46cb02ae349c4b3fbba5335462343135/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0" },
    ]
  },
  { 
    id: 3, 
    name: "УЗИ", 
    items: [
      { modelId: 1, title: "УЗИ - аппарат", link: "https://sketchfab.com/models/3b9adffdc0aa4ae6906494a9079e7623/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0" },
    ]
  },
  { 
    id: 4, 
    name: "МРТ", 
    items: [
      { modelId: 1, title: "Магнитно - резонансный томограф", link: "https://sketchfab.com/models/74bc0dea266c4b228fcee69da6535330/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0" },
    ]
  },
];

const EquipmentModelPage = () => {
  const { id, modelId } = useParams<{ id: string; modelId: string }>();

  if (!id || !modelId) {
    return <div>Ошибка: Не удалось получить id или modelId</div>;
  }

  const equipmentId = parseInt(id, 10);
  const modelIdNum = parseInt(modelId, 10);

  const equipment = equipmentData.find((equip) => equip.id === equipmentId);
  
  if (!equipment) {
    return <NoData />;
  }

  const model = equipment.items.find((item) => item.modelId === modelIdNum);

  if (!model) {
    return <NoData />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/introduction">Введение в медицинскую физику</Link> / <Link to="/equipment">Оборудование ядерной медицины</Link> / <Link to={`/equipment/${equipment.id}`}>{equipment.name}</Link> / {model.title}
      </div>

      <h1 className={styles.h1}>{model.title}</h1>

      <div className={styles.modelContainer}>
        <iframe
          width="100%"
          src={model.link}
          frameBorder="0"
          allow="autoplay; fullscreen; vr"
          allowFullScreen
          className={styles.iframe}
        />
      </div>

      <p className={styles.description}>
        Ознакомьтесь с выбранной моделью для более глубокого изучения её строения, принципов работы и характеристик. Это поможет вам лучше понять её особенности, а также области применения. Изучение моделей может раскрыть важные детали, которые помогут вам разобраться в их различиях и преимуществах. Если возникнут дополнительные вопросы или потребуется уточнение, не стесняйтесь вернуться к другим моделям или описаниям для получения более полной картины.
        </p>

      <RegistrationBlock />
    </div>
  );
};

export default EquipmentModelPage;
