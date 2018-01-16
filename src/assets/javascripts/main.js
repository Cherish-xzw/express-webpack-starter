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
      break;
    default:
      throw new Error('No page found.');
  }
});
