import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Tabs, Avatar, Spin, Alert } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./UserRatingPage.module.scss";
import { useUserRanks } from "hooks/useUserRanks";

const { TabPane } = Tabs;

interface User {
  key: string;
  number: string | null;
  photo: string | null;
  name: string;
  status: string;
  points: number;
}

const columns: ColumnsType<User> = [
  {
    title: "№",
    dataIndex: "number",
    key: "number",
    className: styles.centeredCell,
    render: (number: string | null) => (number ? number : "..."),
  },
  {
    title: "Фото",
    dataIndex: "photo",
    key: "photo",
    render: (photo: string | null) =>
      photo ? (
        <Avatar src={photo} size={40} />
      ) : (
        <Avatar size={40} style={{ backgroundColor: "#e6e6e6" }} icon={<span>👤</span>} />
      ),
    className: styles.centeredCell,
  },
  {
    title: "ФИО пользователя",
    dataIndex: "name",
    key: "name",
    className: styles.nameCell,
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
    className: styles.centeredCell,
  },
  {
    title: "Баллы",
    dataIndex: "points",
    key: "points",
    className: styles.centeredCell,
  },
];

const roleToStatusMap: Record<string, string> = {
  school_student: "Школьник",
  university_student: "Студент",
  admin: "Администратор",
};

const UserRating: React.FC = () => {
  const [activeTab, setActiveTab] = useState("school_student");
  const { data, isLoading, isError, error } = useUserRanks(activeTab);

  const currentUser = data?.currentUser || null;

  const mapUserToTableData = (user: any, index: number): User => ({
    key: user.id,
    number: (index + 1).toString(),
    photo: user.photo || null,
    name: `${user.firstName} ${user.lastName}`,
    status: roleToStatusMap[user.role] || "Неизвестный статус",
    points: user.score,
  });

  const usersData = data?.users?.map(mapUserToTableData) || [];

  const dataSource: User[] = [
    ...usersData,
    { key: "separator", number: null, photo: null, name: "...", status: "...", points: 0 },
    ...(currentUser
      ? [
          {
            key: currentUser.id,
            number: null,
            photo: currentUser.photo || null,
            name: `${currentUser.firstName} ${currentUser.lastName}`,
            status: roleToStatusMap[currentUser.role] || "Неизвестный статус",
            points: currentUser.score,
          },
        ]
      : []),
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / Рейтинг пользователей
      </nav>

      <h1 className={styles.h1}>Рейтинг пользователей</h1>

      <Tabs
        defaultActiveKey="school_student"
        onChange={handleTabChange}
        className={styles.ratingTabs}
      >
        <TabPane tab="Школьники" key="school_student">
          {isLoading ? (
            <div className={styles.loading}>
              <Spin tip="Загрузка данных..." />
            </div>
          ) : isError ? (
            <Alert
              message="Ошибка загрузки"
              description={(error as Error)?.message || "Не удалось загрузить данные."}
              type="error"
              showIcon
            />
          ) : (
            <div className={styles.tableWrapper}>
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                rowClassName={(record) =>
                  record.key === currentUser?.id ? styles.currentUserRow : ""
                }
              />
            </div>
          )}
        </TabPane>
        <TabPane tab="Студенты" key="university_student">
          {isLoading ? (
            <div className={styles.loading}>
              <Spin tip="Загрузка данных..." />
            </div>
          ) : isError ? (
            <Alert
              message="Ошибка загрузки"
              description={(error as Error)?.message || "Не удалось загрузить данные."}
              type="error"
              showIcon
            />
          ) : (
            <div className={styles.tableWrapper}>
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                rowClassName={(record) =>
                  record.key === currentUser?.id ? styles.currentUserRow : ""
                }
              />
            </div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserRating;
