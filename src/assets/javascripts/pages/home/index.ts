import Vue from "vue";
import Home from "./Home.vue";

document.addEventListener("DOMContentLoaded", () => {
  new Vue({
    el: "#app",
    components: {
      Home
    },
    render: h => h(Home),
  });
});
