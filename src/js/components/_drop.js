import { BODY, ACTIVE } from '../_constants';
const dropCurrent = '.js-drop-current';

BODY.on('click', dropCurrent, function() {
  const drop = $(this).parents('.js-drop');
  const dropList = drop.find('.js-drop-list');
  drop.toggleClass(ACTIVE);
});

BODY.click(e => {
  const $target = $(e.target);
  const drop = $('.js-drop');
  if ($target.closest(dropCurrent).length) return;
  drop.removeClass(ACTIVE);
});
