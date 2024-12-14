import { useState, useEffect } from "react";
import { Input, Pagination, Skeleton } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEquipmentGroups } from "hooks/useEquipments";
import RegistrationBlock from "components/RegistrationBlock/RegistrationBlock";
import styles from "./EquipmentPage.module.scss";
import { NoData } from "components/NoData/NoData";

const equipmentNamesMap: { [key: string]: string } = {
  computed_tomography: "Компьютерная томография",
  radiation_therapy: "Дистанционная лучевая терапия",
  uzi: "УЗИ",
  mri: "МРТ",
  scintigraphy: "Сцинтиграфия",
  single_photon_emission_tomography: "Однофотонная эмиссионная томография",
  positron_emission_tomography: "Позитронная эмиссионная томография",
};

const EquipmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page") || "1", 10);
  const initialSearch = queryParams.get("search") || "";

  const [page, setPage] = useState(initialPage);
  const pageSize = 10;
  const [search, setSearch] = useState<string>(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(initialSearch);

  const { isLoading, data } = useEquipmentGroups();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);

      const newParams = new URLSearchParams();
      newParams.set("page", "1");
      if (search.trim()) {
        newParams.set("search", search);
      }

      navigate(`/equipment?${newParams.toString()}`, { replace: true });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search, navigate]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);

    const newParams = new URLSearchParams();
    newParams.set("page", pageNumber.toString());
    if (search) {
      newParams.set("search", search);
    }

    navigate(`/equipment?${newParams.toString()}`, { replace: true });
  };

  const filteredEquipments =
    Array.isArray(data)
      ? data.filter((equipment) => {
          const equipmentName = equipmentNamesMap[equipment.equipmentGroup] || "";
          return equipmentName.toLowerCase().includes(debouncedSearch.toLowerCase());
        })
      : [];

  const paginatedEquipments = filteredEquipments.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> /{" "}
        <Link to="/introduction">Введение в медицинскую физику</Link> /{" "}
        Оборудование ядерной медицины
      </div>

      <h1>Оборудование ядерной медицины</h1>

      <p>
        В это разделе вы сможете подробнее ознакомиться с оборудованием, которое
        применяется в ядерной медицине. С помощью описательных карточек узнаете
        названия деталей и их функционал. Если нужно будет еще больше информации,
        в карточках есть ссылки на соответствующие материалы из Базы знаний.
      </p>

      <p>Внимание! Некоторые модели могут прогружаться довольно долго.</p>

      <Input
        className={styles.searchInput}
        placeholder="Введите название оборудования"
        prefix={<SearchOutlined />}
        value={search}
        onChange={handleSearchChange}
        bordered={false}
      />

      {isLoading ? (
        <ul className={styles.articleList}>
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className={styles.articleItem}>
              <Skeleton active  paragraph={{ rows: 1 }} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className={styles.articleList}>
          {paginatedEquipments.length > 0 ? (
            paginatedEquipments.map((equipment, index) => (
              <Link
                to={`/equipment/${equipment.equipmentGroup}`}
                key={index}
                className={styles.articleItem}
              >
                <li>
                  <div className={styles.articleTitle}>
                    <h3>
                      {equipmentNamesMap[equipment.equipmentGroup] ||
                        "Неизвестное оборудование"}
                    </h3>
                  </div>
                  <p className={styles.articleAmount}>
                    Количество объектов: {equipment.size}
                  </p>
                </li>
              </Link>
            ))
          ) : (
            <NoData />
          )}
        </ul>
      )}

      {filteredEquipments.length > pageSize && (
        <Pagination
          align="center"
          current={page}
          pageSize={pageSize}
          total={filteredEquipments.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      )}

      <RegistrationBlock />
    </div>
  );
};

export default EquipmentPage;
