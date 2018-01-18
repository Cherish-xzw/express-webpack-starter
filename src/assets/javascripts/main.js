import '../stylesheets/application.scss';

import jQuery from 'jquery';

window.$ = jQuery;
window.jQuery = jQuery;

import home from './feature/home';

$(document).ready(() => {
  const page = $('body')
    .children()
    .first()
    .attr('data-page');
  if (!page) {
    return false;
  }
  switch (page) {
    case 'home':
      home();
      import(/* webpackChunkName: "common" */ './common')
        .then(common => common.default)
        .then(common => {
          common();
        })
        .catch(() => 'An error occurred while loading the component');
      break;
    default:
      throw new Error('No page found.');
  }
});
