import { BODY } from '../_constants';
const tooltipClose = '.js-tooltip-close';
BODY.on('click', tooltipClose, function() {
  let tooltip = $(this).parents('.js-tooltip');
  tooltip.remove();
});
