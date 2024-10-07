import { Card, Form, Input, Button, List, Statistic, Progress } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styles from './ProfilePage.module.scss';
import avatar from './assets/avatar.png';

const ProfilePage = () => {
  return (
    <div className={styles.profilePage}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
            <h2 className={styles.profileTitle}>Мой профиль</h2>
            <Button className={styles.editBtn} icon={<EditOutlined />}>
                Редактировать профиль
            </Button>
        </div>

        <div className={styles.profileContainer}>
            <div className={styles.teamMember}>
                <img
                src={avatar}
                className={styles.teamMemberImage}
                />

                <Button className={styles.editBtn}>
                    Студент

                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_1414_5571" maskUnits="userSpaceOnUse" x="-1" y="0" width="17" height="12">
                        <path d="M0.666504 3.8L7.67384 1L14.6812 3.8L7.67384 6.6L0.666504 3.8Z" fill="#555555" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
                        <path d="M14.6814 3.83667V6.911M3.85205 5.275V9.42234C3.85205 9.42234 5.45538 11 7.67405 11C9.89305 11 11.4964 9.42234 11.4964 9.42234V5.275" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </mask>
                        <g mask="url(#mask0_1414_5571)">
                        <path d="M0 -2H16V14H0V-2Z" fill="white"/>
                        </g>
                    </svg>
                </Button>
            </div>

            <Form layout="vertical" className={styles.form}>
                <Form.Item className={styles.formItem} label="Фамилия">
                    <Input value="Иванов" />
                </Form.Item>
                
                <Form.Item className={styles.formItem} label="Имя">
                    <Input  value="Иван" />
                </Form.Item>
                
                <Form.Item className={styles.formItem} label="Отчество">
                    <Input value="Иванович" />
                </Form.Item>

                <Form.Item className={styles.formItem} label="Дата рождения">
                    <Input value="24.07.2004" />
                </Form.Item>

                <Form.Item className={styles.formItem} label="Почта">
                    <Input value="example@email.com" />
                </Form.Item>

                <Form.Item className={styles.formItem} label="VK/Telegram">
                    <Input value="@iwanow" />
                </Form.Item>

                <Form.Item className={styles.formItem} label="Место учёбы/работы">
                    <Input value="НИЯУ МИФИ" />
                </Form.Item>

                <Form.Item className={styles.formItem} label="Сфера интересов">
                    <Input value="Биомедицина" />
                </Form.Item>
            </Form>
        </div>
      </div>

        <div className={styles.achievementsCard}>
            <Card className={styles.notesCard}>
                <h3>Мои заметки</h3>
                <List>
                    <List.Item className={styles.listItem}>Научно-популярные статьи</List.Item>
                    <List.Item className={styles.listItem}>Подкасты</List.Item>
                    <List.Item className={styles.listItem}>Видеолекции</List.Item>
                </List>
            </Card>

            <Card className={styles.questsCard}>
                <h3>Мои квесты</h3>
                <div className={styles.questsColumns}>
                <div className={styles.activeQuests}>
                    <h4>Активные</h4>
                    <List>
                        <List.Item className={styles.listItem}>Квест 1</List.Item>
                        <List.Item className={styles.listItem}>Квест 2</List.Item>
                        <List.Item className={styles.listItem}>Квест 3</List.Item>
                    </List>
                </div>
                <div className={styles.completedQuests}>
                    <h4>Архив (пройденные)</h4>
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
        <h3 className={styles.statisticsTitle}>Моя статистика</h3>
        <div className={styles.statistics}>
          <div className={styles.materials}>
            <h4>Материалы</h4>
            <List>
              <List.Item>Научно-популярные статьи: 33</List.Item>
              <List.Item>Подкасты: 24</List.Item>
              <List.Item>Видеолекции: 9</List.Item>
            </List>
          </div>
          <div className={styles.tasks}>
            <Statistic title="Задачи" value={53} suffix="/ 100" />
            <Progress type='circle' percent={50}></Progress>
          </div>
          <div className={styles.quests}>
            <Statistic title="Квесты" value={5} suffix="/ 10" />
            <Progress type='circle' percent={20}></Progress>
          </div>
          <div className={styles.points}>
            <Statistic title="Баллы" value={154} suffix="/ 345" />
            <Progress type='circle' percent={20}></Progress>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
