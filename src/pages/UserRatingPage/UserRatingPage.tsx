import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Tabs, Avatar, Alert, Skeleton } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./UserRatingPage.module.scss";
import { useUserRanks } from "hooks/useUserRanks";

const { TabPane } = Tabs;

interface User {
  key: string;
  number: string | null;
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
    render: (number) => number || "...",
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

  const currentUser = data?.currentUser;

  const mapUserToTableData = (user: any, index: number): User => ({
    key: user.id.toString(),
    number: (index + 1).toString(),
    name: `${user.firstName} ${user.lastName}`,
    status: roleToStatusMap[user.role] || "Неизвестный статус",
    points: user.score,
  });

  const usersData = data?.users?.map(mapUserToTableData) || [];

  const dataSource: User[] = [
    ...usersData,
    ...(currentUser && currentUser.role === activeTab
      ? [
          {
            key: currentUser.id.toString(),
            number: null,
            name: `${currentUser.firstName} ${currentUser.lastName}`,
            status: roleToStatusMap[currentUser.role] || "Неизвестный статус",
            points: currentUser.score,
          },
        ]
      : []),
  ].filter((user, index, self) => self.findIndex((u) => u.key === user.key) === index);  

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
        {["school_student", "university_student"].map((role) => (
          <TabPane tab={roleToStatusMap[role]} key={role}>
            {isLoading ? (
              <Skeleton.Button active className={styles.skeleton} />
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
                    record.key === currentUser?.id.toString() ? styles.currentUserRow : ""
                  }
                />
              </div>
            )}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default UserRating;
