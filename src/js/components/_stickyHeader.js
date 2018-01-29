import { WIN, FIXED } from '../_constants';

WIN.on('scroll', function() {
  const fixedHeader = $('.js-header-main');
  const offsetTop = WIN.scrollTop();
  (offsetTop > 0) 
    ? fixedHeader.addClass(FIXED)
    : fixedHeader.removeClass(FIXED);

});
