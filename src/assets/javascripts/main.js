// import stylesheets
import "../stylesheets/application.less";

import Vue from "vue";
import Router from "vue-router";
import App from "./components/App.vue";
import Home from './components/Home.vue';
import About from './components/About.vue';
import Root from './components/Root.vue';
import NotFound from './components/NotFound.vue';

import {
  AlertPlugin
} from "vux";

Vue.use(Router);
Vue.use(AlertPlugin);

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
    path: __publicPath,
    component: Root,
    children: [{
        path: '/',
        component: Home
      },
      {
        path: 'about',
        component: About
      },
    ]
  }, {
    path: '*',
    component: NotFound
  }]
});

new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: {
    App
  }
});
