import { useState, useEffect } from "react";
import { Input, Pagination, Spin, Flex } from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RegistrationBlock from "components/RegistrationBlock/RegistrationBlock";
import styles from "./EquipmentPage.module.scss";
// import { NoData } from 'components/NoData/NoData';
// import { useEquipments } from 'hooks/useEquipments';

const equipments = [
  { id: 1, name: "Сцинтиграфия", objectsCount: 10 },
  { id: 2, name: "Однофотонная эмиссионная томография", objectsCount: 10 },
  { id: 3, name: "Позитронная эмиссионная томография", objectsCount: 10 },
  { id: 4, name: "Компьютерная томография", objectsCount: 10 },
  { id: 5, name: "Магнитно-резонансная томография", objectsCount: 10 },
  { id: 6, name: "Дистанционная лучевая терапия", objectsCount: 10 },
];

const EquipmentPage = () => {
  const location = useLocation(); // Получение текущего местоположения
  const navigate = useNavigate(); // Для навигации

  const queryParams = new URLSearchParams(location.search); // Используем URLSearchParams
  const initialPage = parseInt(queryParams.get("page") || "1", 10);
  const initialSearch = queryParams.get("search") || "";

  const [page, setPage] = useState(initialPage);
  const pageSize = 10;
  const [search, setSearch] = useState<string>(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(initialSearch);

  // const { data, isLoading } = useEquipments(page, pageSize, debouncedSearch);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Сбрасываем страницу при новом поиске

      const newParams = new URLSearchParams();
      newParams.set("page", "1"); // Устанавливаем первую страницу
      if (search.trim()) {
        newParams.set("search", search); // Устанавливаем параметры поиска
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
      newParams.set("search", search); // Устанавливаем параметры поиска
    }

    navigate(`/equipment?${newParams.toString()}`, { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> /{" "}
        <Link to="/introduction">Введение в медицинскую физику</Link> /
      </div>

      <h1>Оборудование ядерной медицины</h1>

      <p>
        Рекомендуется проходить материалы в указанной последовательности для
        лучшего усвоения темы. Все видеолекции и подкасты должны быть прослушаны
        до выполнения практических заданий.
      </p>

      <Input
        className={styles.searchInput}
        placeholder="Введите название оборудования"
        prefix={<SearchOutlined />}
        value={search}
        onChange={handleSearchChange}
        bordered={false}
      />

      <ul className={styles.articleList}>
        {false && (
          <Flex className={styles.spinner} justify="center" align="center">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </Flex>
        )}

        {equipments?.map((equipment) => (
          <Link
            to={`/equipment/${equipment.id}`}
            key={equipment.id}
            className={styles.articleItem}
          >
            <li>
              <div className={styles.articleTitle}>
                <h3>{equipment.name}</h3>
              </div>
              <p className={styles.articleAmount}>
                Количество объектов: {equipment.objectsCount}
              </p>
            </li>

            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={styles.arrow}
                d="M31.834 15.9987C31.834 20.198 30.1658 24.2252 27.1965 27.1946C24.2272 30.1639 20.1999 31.832 16.0007 31.832C13.9214 31.832 11.8625 31.4225 9.9415 30.6268C8.02051 29.8311 6.27505 28.6648 4.80479 27.1946C3.33453 25.7243 2.16826 23.9788 1.37256 22.0579C0.576859 20.1369 0.16732 18.078 0.16732 15.9987C0.16732 11.7994 1.83547 7.77217 4.80479 4.80284C7.77412 1.83352 11.8014 0.165367 16.0007 0.165367C18.0799 0.165367 20.1388 0.574905 22.0598 1.37061C23.9808 2.16631 25.7262 3.33258 27.1965 4.80284C30.1658 7.77217 31.834 11.7994 31.834 15.9987ZM6.50065 17.582L19.1673 17.582L13.6257 23.1237L15.874 25.372L25.2473 15.9987L15.874 6.62537L13.6257 8.8737L19.1673 14.4154L6.50065 14.4154L6.50065 17.582Z"
                fill="#B0B0B0"
              />
            </svg>
          </Link>
        ))}

        {/* {!isLoading && data?.totalItems === 0 && <NoData />} */}
      </ul>

      {/* {data && data?.totalItems > pageSize && (
                <Pagination
                    align="center"
                    current={page}
                    pageSize={pageSize}
                    total={data?.totalItems || 0}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            )} */}

      <RegistrationBlock />
    </div>
  );
};

export default EquipmentPage;
