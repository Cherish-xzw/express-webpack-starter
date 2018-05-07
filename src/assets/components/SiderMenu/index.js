/* eslint-disable class-methods-use-this */
import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import styles from './index.less';
import logo from '../../assets/logo.svg';

const { Sider } = Layout;
const { SubMenu } = Menu;

class SiderMenu extends React.Component {
  constructor(props) {
    super(props);
    this.menus = [
      {
        name: 'menu1',
        path: '/dashboard',
        icon: 'edit'
      },
      {
        name: 'menu2',
        path: '/2',
        icon: 'edit'
      },
      {
        name: 'menu3',
        path: '/3',
        icon: 'edit'
      },
      {
        name: 'menu4',
        path: '/4',
        icon: 'edit'
      }
    ];
  }

  getNavMenuItems(menus) {
    if (!menus) {
      return [];
    }
    return menus.map(item => {
      if (!item.name) {
        return null;
      }
      return (
        <SubMenu
          key={item.key || item.path}
          title={
            item.icon ? (
              <span>
                <Icon type={item.icon} />
                <span>{item.name}</span>
              </span>
            ) : (
              item.name
            )
          }
        >
          <Menu.Item>
            <Link to="/dashboard">dashboard</Link>
          </Menu.Item>
        </SubMenu>
      );
    });
  }

  render() {
    const { collapsed  } = this.props;
    return (
      <Sider
        trigger={null}
        breakpoint="md"
        width={256}
        className={styles.sider}
        collapsible
        collapsed={collapsed}
      >
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>React Starter</h1>
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{ padding: '16px 0', width: '100%' }}
        >
          {this.getNavMenuItems(this.menus)}
        </Menu>
      </Sider>
    );
  }
}

export default SiderMenu;
