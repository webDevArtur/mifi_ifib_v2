import { useState, useEffect } from "react";
import { Card, Form, Input, Button, List, Statistic, Progress, Select, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useEditUser } from "hooks/useEditUser";
import styles from "./ProfilePage.module.scss";
import avatar from "./assets/avatar.png";

const { Option } = Select;

const ProfilePage = () => {
  const { data, isLoading } = useCurrentUser();
  console.log(data);
  const { mutateAsync: editUser } = useEditUser();

  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const user = data?.user;

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        lastName: user.lastName || "",
        firstName: user.firstName || "",
        middleName: user.middleName || "",
        birthDate: user.birthDate || "",
        socialNetwork: user.socialNetwork || "",
        educationalStatus: user.educationalStatus || "",
        educationalFacility: user.educationalFacility || "",
        sphereOfInterest: user.sphereOfInterest || "",
      });
    }
  }, [user, form]);

  const handleEditClick = () => {
    if (isEditing) {
      form
        .validateFields()
        .then((values) => {
          editUser(values)
            .then(() => {
              setIsEditing(false);
            })
            .catch((error) => {
              console.error("Ошибка при редактировании:", error);
            });
        })
        .catch((errorInfo) => {
          console.error("Ошибка валидации:", errorInfo);
        });
    } else {
      setIsEditing(true);
    }
  };

  if (!user && !isLoading) {
    return <div>Данные пользователя не найдены.</div>;
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <h2 className={styles.profileTitle}>Мой профиль</h2>
          <Button
            className={styles.editBtn}
            icon={<EditOutlined />}
            onClick={handleEditClick}
          >
            {isEditing ? "Сохранить" : "Редактировать профиль"}
          </Button>
        </div>

        <div className={styles.profileContainer}>
          {/* <div className={styles.teamMember}>
            <div className={styles.avatarContainer}>
              <img
                src={avatar}
                alt="Avatar"
                className={styles.teamMemberImage}
              />
              <Button
                className={styles.avatarEditBtn}
                icon={<EditOutlined />}
              />
            </div>
          </div> */}

          <Form
            form={form}
            layout="vertical"
            className={styles.form}
          >
            <Form.Item className={styles.formItem} label="Фамилия" name="lastName">
              <Input disabled={!isEditing || isLoading} />
            </Form.Item>

            <Form.Item className={styles.formItem} label="Имя" name="firstName">
              <Input disabled={!isEditing || isLoading} />
            </Form.Item>

            <Form.Item className={styles.formItem} label="Отчество" name="middleName">
              <Input disabled={!isEditing || isLoading} />
            </Form.Item>

            <Form.Item className={styles.formItem} label="Дата рождения" name="birthDate">
              <Input disabled={!isEditing || isLoading} />
            </Form.Item>

            <Form.Item className={styles.formItem} label="VK/Telegram" name="socialNetwork">
              <Input disabled={!isEditing || isLoading} />
            </Form.Item>

            <Form.Item className={styles.formItem} label="Выберите Ваш статус" name="educationalStatus">
              <Select disabled={!isEditing || isLoading}>
                <Option value="school_student">Учусь в школе</Option>
                <Option value="university_student">Учусь в вузе</Option>
              </Select>
            </Form.Item>

            <Form.Item className={styles.formItem} label="Место учёбы" name="educationalFacility">
              <Input disabled={!isEditing || isLoading} />
            </Form.Item>

            <Form.Item className={styles.formItem} label="Сфера интересов" name="sphereOfInterest">
              <Input disabled={!isEditing || isLoading} />
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className={styles.achievementsCard}>
        <Card className={styles.notesCard}>
          <h2>Мои заметки</h2>
          <List>
            <List.Item className={styles.listItem}>
              Научно-популярные статьи
            </List.Item>
            <List.Item className={styles.listItem}>Подкасты</List.Item>
            <List.Item className={styles.listItem}>Видео</List.Item>
          </List>
        </Card>

        <Card className={styles.questsCard}>
          <h2>Мои квесты</h2>
          <div className={styles.questsColumns}>
            <div className={styles.activeQuests}>
              <h3>Активные</h3>
              <List>
                <List.Item className={styles.listItem}>Квест 1</List.Item>
                <List.Item className={styles.listItem}>Квест 2</List.Item>
                <List.Item className={styles.listItem}>Квест 3</List.Item>
              </List>
            </div>
            <div className={styles.completedQuests}>
              <h3>Архив (пройденные)</h3>
              <List>
                <List.Item className={styles.listItem}>Квест 1</List.Item>
                <List.Item className={styles.listItem}>Квест 2</List.Item>
                <List.Item className={styles.listItem}>Квест 3</List.Item>
              </List>
            </div>
          </div>
        </Card>
      </div>

      <Card className={styles.statisticsCard}>
        <h2 className={styles.statisticsTitle}>Моя статистика</h2>
        <div className={styles.statistics}>
          <div className={styles.materials}>
            <h3>Материалы</h3>
            <List>
              <List.Item>Научно-популярные статьи: 33</List.Item>
              <List.Item>Подкасты: 24</List.Item>
              <List.Item>Видео: 9</List.Item>
            </List>
          </div>

          <div className={styles.graphs}>
            <div className={styles.tasks}>
              <h3 className={styles.taskTitle}>Задачи</h3>

              <Progress type="circle" percent={50} strokeColor="#4CAF50" />

              <Statistic
                value={50}
                suffix="/ 100"
                valueStyle={{
                  fontSize: "16px",
                  color: "#000",
                  marginTop: "10px",
                }}
              />
            </div>

            <div className={styles.quests}>
              <h3 className={styles.questTitle}>Квесты</h3>

              <Progress type="circle" percent={50} strokeColor="#4CAF50" />

              <Statistic
                value={5}
                suffix="/ 10"
                valueStyle={{
                  fontSize: "16px",
                  color: "#000",
                  marginTop: "10px",
                }}
              />
            </div>

            <div className={styles.points}>
              <h3 className={styles.pointsTitle}>Баллы</h3>

              <Progress type="circle" percent={50} strokeColor="#4CAF50" />

              <Statistic
                value={154}
                suffix="/ 345"
                valueStyle={{
                  fontSize: "16px",
                  color: "#000",
                  marginTop: "10px",
                }}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
