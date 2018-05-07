import React from 'react';
import {Router, Route, Switch } from 'react-router-dom';


import BasicLayout from './layouts/BasicLayout';
import UserLayout from './layouts/UserLayout';

import Dashboard from './routes/Dashboard';
import Login from './routes/User/Login';
import history from './history';


// {
//   component: BasicLayout,
//   layout: 'BasicLayout',
//   path: '/',
//   exact: true,
//   children: [
//     {
//       name: 'Dashboard',
//       icon: 'dashboard',
//       path: 'dashboard',
//       children: [
//         {
//           name: '工作台',
//           path: 'workspace',
//           component: Dashboard
//         }
//       ]
//     }
//   ]
// }
function Root() {
  const passProps = {
    getRouteData() {
      return [
        {
          path: '/dashboard',
          component: Dashboard,
          exact: true
        },
        {
          path: '/user/login',
          component: Login,
          exact: true
        },
      ];
    }
  };
  return (
    <Router history={history}>
      <Switch>
        <Route path="/user" render={props =><UserLayout {...props} {...passProps} />}/>
        <Route path="/" render={props => <BasicLayout {...props} {...passProps} />}/>
      </Switch>
    </Router>
  );
}

export default Root;
