import {WIN, BODY} from '../_constants';
const inversion = () => {
  const container = BODY.find('[data-inversion]');
  const header = $('.js-header-main');
  const scrollPos = WIN.scrollTop();
  const topPadding = header.outerHeight();
  $(container).each(function() {
    const that = $(this);
    const color = that.data('inversion');
    const topPos = that.offset().top - topPadding;
    const bottomPos = topPos + that.outerHeight();
    ( topPos <= scrollPos && bottomPos > scrollPos )
    	? header.addClass('header_'+color+'')
	    : header.removeClass('header_'+color+'');
  });
};

WIN.on('scroll', inversion);
