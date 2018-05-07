// import stylesheets
import "../stylesheets/application.less";

import $ from "jquery";
import About from "./feature/about";

window.$ = $;
window.jQuery = $;

$(document).ready(() => {
  const page = $("body")
    .children()
    .first()
    .attr("data-page");
  if (!page) {
    return false;
  }
  switch (page) {
    case "home":
      import ( /* webpackChunkName: "home" */ "./feature/home")
      .then(Home => Home.default)
        .then(Home => new Home())
        .catch(() => "An error occurred while loading the component");
      break;
    case "about":
      new About();
      break;
    default:
      throw new Error("No page found.");
  }
});
