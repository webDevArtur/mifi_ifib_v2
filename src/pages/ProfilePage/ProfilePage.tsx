import { useState, useEffect } from "react";
import { Card, Form, Input, Button, List, Statistic, Progress, Select, Spin, Collapse, Alert, DatePicker } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useEditUser } from "hooks/useEditUser";
import { useQuests } from "hooks/useQuests";
import { useVideos } from "hooks/useVideos";
import { useArticles } from "hooks/useArticles";
import { usePodcasts } from "hooks/usePodcasts";
import { useProgressStatistics } from "hooks/useProgressStatistics";
import dayjs from "dayjs";
import styles from "./ProfilePage.module.scss";
import avatar from "./assets/avatar.png";

const { Option } = Select;
const { Panel } = Collapse;

const ProfilePage = () => {
  const { data, isLoading } = useCurrentUser();
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync: editUser } = useEditUser();

  const { data: quests, isLoading: isQuestsLoading, refetch: refetchQuests } = useQuests();
  const { data: progressStats, isLoading: isStatsLoading, refetch: refetchStats } = useProgressStatistics();
  const { data: videoData, isLoading: isVideosLoading, refetch } = useVideos();
  const { data: articlesData, isLoading: isArticlesLoading, refetch: refetchArticles } = useArticles();
  const { data: podcastsData, isLoading: isPodcastsLoading, refetch: refetchPodcasts } = usePodcasts();

  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const user = data?.user;
  const [submitted, setSubmitted] = useState(false);
  const [educationalStatus, setEducationalStatus] = useState<string | null>("");

  useEffect(() => {
    refetch();
    refetchArticles();
    refetchPodcasts();
    refetchStats();
    refetchQuests();
  }, [refetch, refetchArticles, refetchPodcasts, refetchStats, refetchQuests]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        lastName: user.lastName || "",
        firstName: user.firstName || "",
        middleName: user.middleName || "",
        birthdate: user.birthDate ? dayjs(user.birthDate, "YYYY-MM-DD") : null,
        socialNetwork: user.socialNetwork || "",
        educationalStatus: user.educationalStatus || "",
        educationalFacility: user.educationalFacility || "",
        sphereOfInterest: user.sphereOfInterest || "",
      });

      setEducationalStatus(user.educationalStatus || "");
    }
  }, [user, form]);


  const handleEditClick = (values: any) => {
    setSubmitted(true);

    if (isEditing) {
      form
        .validateFields()
        .then((values) => {
          const registerData = {
            lastName: values.lastName,
            firstName: values.firstName,
            middleName: values.middleName || null,
            birthDate: values.birthdate.format("YYYY-MM-DD"),
            email: values.email,
            socialNetwork: values.socialNetwork,
            educationalStatus: values.educationalStatus,
            educationalFacility: values.
            educationalFacility || null,
            sphereOfInterest: values.sphereOfInterest,
            password: values.password,
            passwordConfirmation: values.passwordConfirmation,
          };


          editUser(registerData)
            .then(() => {
              setIsEditing(false);
              setError(null);
            })
            .catch((error) => {
              const errorData = error?.response?.data;
              if (errorData && typeof errorData === "object") {
                const errorMessages = Object.entries(errorData)
                  .map(([field, errors]) => {
                    if (Array.isArray(errors)) {
                      return `${field}: ${errors.join(", ")}`;
                    } else {
                      return `${field}: ${errors}`;
                    }
                  })
                  .join("\n");
                setError("Произошла ошибка:\n" + errorMessages);
              }
            });
        })
        .catch((errorInfo) => {
          console.error("Ошибка валидации:", errorInfo);
          setError("Ошибка валидации данных. Пожалуйста, проверьте форму.");
        });
    } else {
      setIsEditing(true);
    }
  };

  const handleEducationalStatusChange = (value: string) => {
    setEducationalStatus(value);
  };

  const activeQuests = quests?.items.filter((quest) => quest.isStarted && !quest.isCompleted) || [];
  const completedQuests = quests?.items.filter((quest) => quest.isCompleted) || [];

  const markedVideos = videoData?.items.filter((item) => item.marked) || [];
  const markedArticles = articlesData?.items.filter((item) => item.marked) || [];
  const markedPodcasts = podcastsData?.items.filter((item) => item.marked) || [];

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

        {error && (
            <Alert
              style={{ marginTop: 20, whiteSpace: "pre-wrap" }}
              message={error}
              type="error"
              showIcon
            />
          )}

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
                      <Form.Item
            label={
              <span>
                Фамилия<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="lastName"
            rules={[
              {
                validator: (_, value) => {
                  if (submitted) {
                    if (!value) {
                      return Promise.reject(
                        'Поле "Фамилия" обязательно для заполнения',
                      );
                    } else if (!/^[А-Яа-яЁёA-Za-z\s-]+$/.test(value)) {
                      return Promise.reject(
                        "Введите корректную фамилию (только буквы, пробелы и дефисы)",
                      );
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
            className={styles.formItem}
          >
            <Input disabled={!isEditing || isLoading} placeholder="Введите вашу фамилию" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Имя<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="firstName"
            rules={[
              {
                validator: (_, value) => {
                  if (submitted) {
                    if (!value) {
                      return Promise.reject(
                        'Поле "Имя" обязательно для заполнения',
                      );
                    } else if (!/^[А-Яа-яЁёA-Za-z\s-]+$/.test(value)) {
                      return Promise.reject(
                        "Введите корректное имя (только буквы, пробелы и дефисы)",
                      );
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
            className={styles.formItem}
          >
            <Input disabled={!isEditing || isLoading} placeholder="Введите ваше имя" />
          </Form.Item>

          <Form.Item
            label={<span>Отчество</span>}
            name="middleName"
            rules={[
              {
                validator: (_, value) => {
                  if (submitted) {
                    if (value && !/^[А-Яа-яЁёA-Za-z\s-]*$/.test(value)) {
                      return Promise.reject(
                        "Введите корректное отчество (только буквы, пробелы и дефисы)",
                      );
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
            className={styles.formItem}
          >
            <Input disabled={!isEditing || isLoading} placeholder="Введите ваше отчество" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Дата рождения<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="birthdate"
            className={styles.formItem}
            rules={[
              {
                validator: (_, value) => {
                  if (submitted) {
                    if (!value) {
                      return Promise.reject(
                        'Поле "Дата рождения" обязательно для заполнения',
                      );
                    }

                    const today = dayjs();
                    const sixYearsAgo = today.subtract(6, "year");

                    if (value.isAfter(today) || value.isAfter(sixYearsAgo)) {
                      return Promise.reject("Вы должны быть старше 6 лет");
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <DatePicker
              placeholder="__.__.____"
              format={{
                format: 'DD.MM.YYYY',
                type: 'mask',
              }}
              showToday={false}
              disabled={!isEditing || isLoading}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label={
              <span>
                VK/Telegram<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="socialNetwork"
            rules={[
              {
                validator: (_, value) => {
                  if (submitted) {
                    if (!value) {
                      return Promise.reject(
                        'Поле "VK/Telegram" обязательно для заполнения',
                      );
                    }
                    if (
                      !/^https?:\/\/.+\.(com|ru|net|org|info|biz|gov|edu|mil|co|io|me)/i.test(
                        value,
                      )
                    ) {
                      return Promise.reject("Некорректный формат ссылки");
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
            className={styles.formItem}
          >
            <Input disabled={!isEditing || isLoading} placeholder="Введите ссылку на VK или Telegram (например, https://t.me/username или https://vk.com/id)" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Чем вы занимаетесь?
                <span className={styles.requiredStar}>*</span>
              </span>
            }
            name="educationalStatus"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        'Поле "Чем вы занимаетесь?" обязательно для заполнения',
                      ),
              },
            ]}
            className={styles.formItem}
          >
            <Select
              disabled={!isEditing || isLoading}
              placeholder="Выберите Ваш статус"
              onChange={handleEducationalStatusChange}
            >
              <Option value="school_student">Учусь в школе</Option>

              <Option value="university_student">Учусь в вузе</Option>
            </Select>
          </Form.Item>

          {(educationalStatus === "school_student" ||
            educationalStatus === "university_student") && (
            <Form.Item
              label={
                <span>
                  Место учёбы<span className={styles.requiredStar}>*</span>
                </span>
              }
              name="educationalFacility"
              rules={[
                {
                  validator: (_, value) => {
                    if (submitted) {
                      return value
                        ? Promise.resolve()
                        : Promise.reject(
                            'Поле "Место учёбы" обязательно для заполнения',
                          );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              className={styles.formItem}
            >
              <Input disabled={!isEditing || isLoading} placeholder="Введите ваше место учебы" />
            </Form.Item>
          )}

          <Form.Item
            label={
              <span>
                Сфера интересов<span className={styles.requiredStar}>*</span>
              </span>
            }
            name="sphereOfInterest"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        'Поле "Сфера интересов" обязательно для заполнения',
                      ),
              },
            ]}
            className={styles.formItem}
          >
            <Select disabled={!isEditing || isLoading} placeholder="Выберите сферу интересов">
              <Option value="science">Наука</Option>
              <Option value="it">Программирование</Option>
            </Select>
          </Form.Item>
          </Form>
        </div>
      </div>

      <div className={styles.achievementsCard}>
      <Card className={styles.notesCard}>
        <h2 className={styles.h2}>Мои заметки</h2>
        <Collapse>
          {/* Научно-популярные статьи */}
          {markedArticles.length > 0 && (
            <Panel header="Научно-популярные статьи" key="1">
              <List className={styles.list}>
                {markedArticles.map((article) => (
                  <List.Item key={article.id} className={styles.listItem}>
                    <Link to={`/articles/${article.id}`} className={styles.link}>
                      {article.name}
                    </Link>
                  </List.Item>
                ))}
              </List>
            </Panel>
          )}

          {/* Подкасты */}
          {markedPodcasts.length > 0 && (
            <Panel header="Подкасты" key="2">
              <List className={styles.list}>
                {markedPodcasts.map((podcast) => (
                  <List.Item key={podcast.id} className={styles.listItem}>
                    <Link to={`/podcasts`} className={styles.link}>
                      {podcast.name}
                    </Link>
                  </List.Item>
                ))}
              </List>
            </Panel>
          )}

          {/* Видео */}
          {markedVideos.length > 0 && (
            <Panel header="Видео" key="3">
              <List className={styles.list}>
                {markedVideos.map((video) => (
                  <List.Item key={video.id} className={styles.listItem}>
                    <Link to={`/video-lectures/${video.id}`} className={styles.link}>
                      {video.name}
                    </Link>
                  </List.Item>
                ))}
              </List>
            </Panel>
          )}
        </Collapse>
      </Card>

        <Card className={styles.questsCard}>
          <h2 className={styles.h2}>Мои квесты</h2>
          {isLoading ? (
            <Spin />
          ) : (
            <div className={styles.questsColumns}>
      <div className={styles.activeQuests}>
        <h3>Активные</h3>
        <div className={styles.listContainer}>
          {activeQuests.length > 0 ? (
            <div className={styles.list}>
              {activeQuests.map((quest) => (
                <div key={quest.id} className={styles.listItem}>
                  {quest.name}
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noQuests}>Нет активных квестов</p>
          )}
        </div>
      </div>
      <div className={styles.completedQuests}>
        <h3>Архив (пройденные)</h3>
        <div className={styles.listContainer}>
          {completedQuests.length > 0 ? (
            <div className={styles.list}>
              {completedQuests.map((quest) => (
                <div key={quest.id} className={styles.listItem}>
                  {quest.name}
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noQuests}>Нет завершённых квестов</p>
          )}
        </div>
      </div>
            </div>
          )}
        </Card>
      </div>

      <Card className={styles.statisticsCard}>
  <h2 className={styles.statisticsTitle}>Моя статистика</h2>
  {isStatsLoading ? (
    <Spin />
  ) : progressStats ? (
    <div className={styles.statistics}>
      <div className={styles.materials}>
        <h3>Материалы</h3>
        <List>
          <List.Item>Научно-популярные статьи: {progressStats.articlesCompletedCount}</List.Item>
          <List.Item>Подкасты: {progressStats.podcastsCompletedCount}</List.Item>
          <List.Item>Видео: {progressStats.filmsCompletedCount}</List.Item>
        </List>
      </div>

      <div className={styles.graphs}>
        <div className={styles.tasks}>
          <h3 className={styles.taskTitle}>Задачи</h3>
          <Progress
            type="circle"
            percent={(progressStats.practiceTasksCompletedCount / progressStats.practiceTasksTotalCount) * 100}
            strokeColor="#4CAF50"
          />
          <Statistic
            value={progressStats.practiceTasksCompletedCount}
            suffix={`/ ${progressStats.practiceTasksTotalCount}`}
            valueStyle={{
              fontSize: "16px",
              color: "#000",
              marginTop: "10px",
            }}
          />
        </div>

        <div className={styles.quests}>
          <h3 className={styles.questTitle}>Квесты</h3>
          <Progress
            type="circle"
            percent={+((progressStats.questsCompletedCount / progressStats.questsTotalCount) * 100).toFixed(2)}
            strokeColor="#4CAF50"
          />
          <Statistic
            value={progressStats.questsCompletedCount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            suffix={`/ ${progressStats.questsTotalCount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
            valueStyle={{
              fontSize: "16px",
              color: "#000",
              marginTop: "10px",
            }}
          />
        </div>

        <div className={styles.points}>
          <h3 className={styles.pointsTitle}>Баллы</h3>
          <Progress
            type="circle"
            percent={+((progressStats.userScore / progressStats.sumMaxScore) * 100).toFixed(2)}
            strokeColor="#4CAF50"
          />
          <Statistic
            value={progressStats.userScore.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            suffix={`/ ${progressStats.sumMaxScore.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
            valueStyle={{
              fontSize: "16px",
              color: "#000",
              marginTop: "10px",
            }}
          />
        </div>
      </div>
    </div>
  ) : (
    <p>Не удалось загрузить статистику.</p>
  )}
</Card>
    </div>
  );
};

export default ProfilePage;
