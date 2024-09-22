import { Button, Input, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import mifiLogo from './assets/mifiLogo.png';

import styles from './Header.module.scss';
  
const Header = () => {

  const menuItems1 = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/articles">Научно-популярные статьи</Link>
      </Menu.Item>

      <Menu.Item key="2">
        <Link to="/video-lectures">Видеолекции</Link>
      </Menu.Item>

      <Menu.Item key="3">
        <Link to="/podcasts">Подкасты</Link>
      </Menu.Item>
      
      <Menu.Item key="4">
        <Link to="/equipment">Оборудование ядерной медицины</Link>
      </Menu.Item>
    </Menu>
  );

  const menuItems2 = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/diagnostics">Диагностика</Link>
      </Menu.Item>

      <Menu.Item key="2">
        <Link to="/therapy">Терапия</Link>
      </Menu.Item>

      <Menu.Item key="3">
        <Link to="/radionuclides">Радионуклиды</Link>
      </Menu.Item>

      <Menu.Item key="4">
        <Link to="/documents">Нормативные документы</Link>
      </Menu.Item>
    </Menu>
  );

  const menuItems3 = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/simulators">VR тренажеры ИФИБ</Link>
      </Menu.Item>

      <Menu.Item key="2">
        <Link to="/gate">GATE</Link>
      </Menu.Item>

      <Menu.Item key="3">
        <Link to="/planning_systems">Системы планирования</Link>
      </Menu.Item>

      <Menu.Item key="4">
        <Link to="/biopack">БиоПак</Link>
      </Menu.Item>

      <Menu.Item key="5">
        <Link to="/image_analize">Анализ снимков</Link>
      </Menu.Item>

      <Menu.Item key="6">
        <Link to="/reanimation_monitor">Реанимационный монитор</Link>
      </Menu.Item>
    </Menu>
  );

  const menuItems4 = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/quest">Выбрать квест</Link>
      </Menu.Item>

      <Menu.Item key="2">
        <Link to="/user_rating">Рейтинг пользователей</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className={styles.header}>
      <Link to='/'>
        <div className={styles.headerLogo}>
          <img src={mifiLogo} alt="Logo 1" className={styles.logo} />
        </div>
      </Link>

      <div className={styles.headerActions}>
        <nav className={styles.headerNav}>
          <Dropdown overlay={menuItems1}>
            <Link className={styles.navLink} to="/introduction">
              Введение в медицинскую физику
            </Link>
          </Dropdown>

          <Dropdown overlay={menuItems2}>
            <Link className={styles.navLink} to="/knowledge">
              База знаний
            </Link>
          </Dropdown>

          <Dropdown overlay={menuItems3}>
            <Link className={styles.navLink} to="#practicum">
              Практикум
            </Link>
          </Dropdown>

          <Dropdown overlay={menuItems4}>
            <Link className={styles.navLink} to="#quests">
              Квесты
            </Link>
          </Dropdown>
        </nav>

        <div className={styles.headerButtons}>
          <Input
            className={styles.headerSearch}
            placeholder="Поиск"
            prefix={<SearchOutlined />}
            bordered={false}
          />


          <Link to="/login">
            <Button className={styles.loginButton} type="primary">
              Войти

              <svg className={styles.loginButtonIcon} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6667 2.5H3.33333C2.59333 2.5 2 3.09333 2 3.83333V6.5H3.33333V3.83333H12.6667V13.1667H3.33333V10.5H2V13.1667C2 13.5203 2.14048 13.8594 2.39052 14.1095C2.64057 14.3595 2.97971 14.5 3.33333 14.5H12.6667C13.0203 14.5 13.3594 14.3595 13.6095 14.1095C13.8595 13.8594 14 13.5203 14 13.1667V3.83333C14 3.47971 13.8595 3.14057 13.6095 2.89052C13.3594 2.64048 13.0203 2.5 12.6667 2.5ZM6.72 10.8867L7.66667 11.8333L11 8.5L7.66667 5.16667L6.72 6.10667L8.44667 7.83333H2V9.16667H8.44667L6.72 10.8867Z" fill="white"/>
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
