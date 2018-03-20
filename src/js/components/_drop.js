import { BODY, ACTIVE } from '../_constants';
import { TOUCH } from './../_utils';

const dropCurrent = '.js-drop-current';
const activeLang = 'is-active-lang';
BODY.on('click', dropCurrent, function() {
  const drop = $(this).parents('.js-drop');
  const dropList = drop.find('.js-drop-list');
  const header = $('.js-header, .js-header-main, .js-header-inner');
  drop.toggleClass(ACTIVE);
  if (TOUCH()) {
  	header.toggleClass(activeLang);
  }
  
});

BODY.click(e => {
  const $target = $(e.target);
  const drop = $('.js-drop');
  const header = $('.js-header, .js-header-main, .js-header-inner');
  if ($target.closest(dropCurrent).length) return;
  drop.removeClass(ACTIVE);
  header.removeClass(activeLang);
});
