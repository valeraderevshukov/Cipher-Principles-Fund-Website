import {BODY, ACTIVE} from '../_constants';

const duration = 300;

BODY.on('click', '.js-accordion-control', e => {
  e.preventDefault();
  const target = $(e.currentTarget);
  const container = target.closest('.js-accordion').find('.js-accordion-container');

  if (target.hasClass(ACTIVE)) {
    target.removeClass(ACTIVE);
    container.slideUp(duration);
  } else {
    target.addClass(ACTIVE);
    container.slideDown(duration);
  }
});
