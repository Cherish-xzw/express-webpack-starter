import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';

import * as Actions from '../actions';
import SiderMenu from '../components/SiderMenu';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';

const { Content } = Layout;
class BasicLayout extends React.PureComponent {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch(Actions.toggleSidebar(collapsed));
  };

  handleMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    if (key === 'logout') {
      dispatch(Actions.logout.request());
    }
  };

  render() {
    const { getRouteData, collapsed } = this.props;
    return (
      <Layout>
        <SiderMenu collapsed={collapsed} onCollapse={this.handleMenuCollapse} />
        <Layout>
          <GlobalHeader
            collapsed={collapsed}
            onCollapse={this.handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
          />
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            <div style={{ minHeight: 'calc(100vh - 260px)' }}>
              <Switch>
                {getRouteData().map(item => (
                  <Route
                    exact={item.exact}
                    key={item.path}
                    path={item.path}
                    component={item.component}
                  />
                ))}
              </Switch>
            </div>
            <GlobalFooter />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  collapsed: state.collapsed
});

export default connect(mapStateToProps)(BasicLayout);
