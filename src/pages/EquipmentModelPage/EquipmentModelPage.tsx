import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Skeleton } from "antd";
import styles from "./EquipmentModelPage.module.scss";
import RegistrationBlock from "components/RegistrationBlock/RegistrationBlock";
import { NoData } from "components/NoData/NoData";
import parse from "html-react-parser";
import { useEquipments } from "hooks/useEquipments";

const equipmentNames = {
  computed_tomography: "Компьютерная томография",
  radiation_therapy: "Дистанционная лучевая терапия",
  uzi: "УЗИ",
  mri: "МРТ",
  scintigraphy: "Сцинтиграфия",
  single_photon_emission_tomography: "Однофотонная эмиссионная томография",
  positron_emission_tomography: "Позитронная эмиссионная томография",
};

const EquipmentModelPage = () => {
  const { id, modelId } = useParams<{ id: string; modelId: string }>();
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  const handleIframeLoad = () => setIsIframeLoading(false);

  if (!id || !modelId) {
    return <div>Ошибка: Не удалось получить id или modelId</div>;
  }

  const modelIdNum = parseInt(modelId, 10);

  const { data, isLoading, isError } = useEquipments(1, 20, undefined, id, [modelIdNum]);

  const equipmentName = equipmentNames[id as keyof typeof equipmentNames];

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> /{" "}
        <Link to="/introduction">Введение в медицинскую физику</Link> /{" "}
        <Link to="/equipment">Оборудование ядерной медицины</Link> /{" "}
        <Link to={`/equipment/${id}`}>{equipmentName}</Link> /{" "}
        {isLoading ? <Skeleton.Button active style={{ width: 100, height: 20 }} /> : data?.items[0]?.name}
      </div>

      <h1 className={styles.h1}>
        {isLoading ? <Skeleton.Button active style={{ width: 300 }} /> : data?.items[0]?.name}
      </h1>

      {isLoading ? (
        <div className={styles.modelContainer}>
          <Skeleton.Button className={styles.skeletonIframe} />
        </div>
      ) : isError ? (
        <div>Ошибка загрузки данных</div>
      ) : !data || !data.items.length ? (
        <NoData />
      ) : (
        <div className={styles.modelContainer}>
          {isIframeLoading && (
            <Skeleton.Button active className={styles.skeletonIframe} />
          )}
          <iframe
            width="100%"
            src={data.items[0].model}
            frameBorder="0"
            allow="autoplay; fullscreen; vr"
            allowFullScreen
            className={styles.iframe}
            onLoad={handleIframeLoad}
            style={{ display: isIframeLoading ? "none" : "block" }}
          />
        </div>
      )}

      <p className={styles.description}>
        {isLoading ? (
          <Skeleton.Button active className={styles.skeletonDescription} />
        ) : (
          parse(data?.items[0]?.description ?? "")
        )}
      </p>

      <RegistrationBlock />
    </div>
  );
};

export default EquipmentModelPage;
