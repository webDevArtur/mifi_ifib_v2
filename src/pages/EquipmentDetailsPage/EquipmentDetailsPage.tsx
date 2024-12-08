import { useParams, Link } from "react-router-dom";
import { Skeleton } from "antd";
import { useEquipments } from "hooks/useEquipments";
import styles from "./EquipmentDetailsPage.module.scss";
import RegistraionBlock from "components/RegistrationBlock/RegistrationBlock";
import { NoData } from "components/NoData/NoData";

const equipmentNames = {
  computed_tomography: "Компьютерная томография",
  radiation_therapy: "Дистанционная лучевая терапия",
  uzi: "УЗИ",
  mri: "МРТ",
  scintigraphy: "Сцинтиграфия",
  single_photon_emission_tomография: "Однофотонная эмиссионная томография",
  positron_emission_tomography: "Позитронная эмиссионная томография",
};

const EquipmentDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Ошибка: id оборудования не найден</div>;
  }

  const { data, isLoading, isError } = useEquipments(1, 20, undefined, id);

  const equipmentName = equipmentNames[id as keyof typeof equipmentNames];

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Главная</Link> /{" "}
        <Link to="/introduction">Введение в медицинскую физику</Link> /{" "}
        <Link to="/equipment">Оборудование ядерной медицины</Link> /{" "}
        {equipmentName}
      </nav>

      <h1>{equipmentName}</h1>

      {isLoading ? (
        <div className={styles.grid}>
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div key={index} className={styles.gridItem}>
                <Skeleton.Button active className={styles.skeletonItem} />
                <Skeleton.Button active className={styles.skeletonText} />
              </div>
            ))}
        </div>
      ) : isError || !data || data.items.length === 0 ? (
        <NoData />
      ) : (
        <div className={styles.grid}>
          {data.items.map((item) => (
            <Link
              key={item.id}
              to={`/equipment/${id}/${item.id}`}
              className={styles.gridItem}
            >
              <img src={item.cover} alt={item.name} />
              <p>{item.name}</p>
            </Link>
          ))}
        </div>
      )}

      <RegistraionBlock />
    </div>
  );
};

export default EquipmentDetailsPage;
