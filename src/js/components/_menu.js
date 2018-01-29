import { BODY, OPEN, ACTIVE } from '../_constants';
import { SCROLL_TO } from '../_utils';

;(() => {
  
  BODY.on('click', '.js-btn-open-nav', e => {
    let $btn = $('.js-btn-open-nav');
    let $nav = $('.js-menu-mob');
    let $header = $('.js-header, .js-header-main');
    e.preventDefault();
    $nav.toggleClass(OPEN);
    $btn.toggleClass(ACTIVE);
    $header.toggleClass(ACTIVE);
  });

})();
