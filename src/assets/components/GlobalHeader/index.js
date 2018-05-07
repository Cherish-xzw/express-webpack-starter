import React from 'react';
import { Layout, Icon, Dropdown, Avatar, Menu } from 'antd';

import styles from './index.less';

const { Header } = Layout;

class GlobalHeader extends React.PureComponent {
  toggle =()=> {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
  }
  render() {
    const { collapsed, onMenuClick} = this.props;
    const currentUser = {
      name: 'travisxu',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    };
    const menu = (
      <Menu
        className={styles.menu}
        selectedKeys={[]}
        onClick={onMenuClick}
      >
        <Menu.Item disabled>
          <Icon type="user" />个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出登录
          {/* <Link to="/user/login"></Link> */}
        </Menu.Item>
      </Menu>
    );
    return (
      <Header className={styles.header}>
        <Icon className={styles.trigger} type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
        <div className={styles.right}>
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser.avatar}
              />
              <span className={styles.name}>{currentUser.name}</span>
            </span>
          </Dropdown>
        </div>
      </Header>
    );
  }
}

export default GlobalHeader;
