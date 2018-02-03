// import stylesheets
import "../stylesheets/application.less";

document.getElementById("app").innerHTML =
`
<i class="logo"></i>
<h2>Essential Links</h2>
<p>
    <a href="https://webpack.js.org/" target="_blank">Webpack</a>
    <a href="http://expressjs.com/" target="_blank">Express</a>
</p>
<h2>Learn More</h2>
<a href="/about">About</a>
`

/* Uncomment these lines to get Vue.js support */

// import Vue from "vue";
// import Router from "vue-router";
// import App from "./components/App.vue";
// import Home from './components/Home.vue';
// import About from './components/About.vue';

// Vue.use(Router);

// const router = new Router({
//   routes : [
//     { path: '/', component: Home},
//     { path: '/about', component: About},
//   ]
// });

// new Vue({
//   el: "#app",
//   router,
//   template: "<App/>",
//   components: {
//     App
//   }
// });

/* Uncomment these lines to get React support */

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/App';

// ReactDOM.render(<App/>, document.getElementById('app'));


/* Uncomment these lines to get jQuery support */

// import $ from "jquery";
// window.$ = $;
// window.jQuery = $;
// import About from "./feature/about";

// $(document).ready(() => {
//   const page = $("body")
//     .children()
//     .first()
//     .attr("data-page");
//   if (!page) {
//     return false;
//   }
//   switch (page) {
//     case "home":
//       import(/* webpackChunkName: "home" */ "./feature/home")
//         .then(Home => Home.default)
//         .then(Home => {
//           return new Home();
//         })
//         .catch(() => "An error occurred while loading the component");
//       break;
//     case "about":
//       new About();
//       break;
//     default:
//       throw new Error("No page found.");
//   }
// });
