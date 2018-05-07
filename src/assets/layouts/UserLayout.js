import React from 'react';
import { Link, Route } from 'react-router-dom';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';

import GlobalFooter from '../components/GlobalFooter';

class UserLayout extends React.PureComponent {
  render() {
    const { getRouteData } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>React Starter</span>
            </Link>
          </div>
          <div className={styles.desc}>Best admin template ever.</div>
        </div>
        {getRouteData().map(item => (
          <Route
            exact={item.exact}
            key={item.path}
            path={item.path}
            component={item.component}
          />
        ))}
        <div className={styles.footer}>
          <GlobalFooter />
        </div>
      </div>
    );
  }
}

export default UserLayout;
