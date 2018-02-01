import {WIN, DOC, BODY} from './../_constants';
import TopicAnim from './_topicAnim';

export const initDisclaimer = () => {
  const disclaimer = $('.js-disclaimer');

  const getCookie = name => {
	  var matches = document.cookie.match(new RegExp(
	    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
	  ));
	  return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  const setCookie = (name, value, options) => {
	  options = options || {};

	  var expires = options.expires;

	  if (typeof expires == 'number' && expires) {
	    var d = new Date();
	    d.setTime(d.getTime() + expires * 1000);
	    expires = options.expires = d;
	  }
	  if (expires && expires.toUTCString) {
	    options.expires = expires.toUTCString();
	  }

	  value = encodeURIComponent(value);

	  var updatedCookie = name + '=' + value;

	  for (var propName in options) {
	    updatedCookie += '; ' + propName;
	    var propValue = options[propName];
	    if (propValue !== true) {
	      updatedCookie += '=' + propValue;
	    }
	  }

	  document.cookie = updatedCookie;
  };
	
  if (getCookie('disclaimer')) {
	  disclaimer.remove();
  }
  else {
	  const windowHeight = WIN.outerHeight() - 70;
	  const disclaimerInfoHeight = $('.js-disclaimer-info').outerHeight();
	  const disclaimerTitleHeight = $('.js-disclaimer-title').outerHeight();
	  const disclaimerFooterHeight = $('.js-disclaimer-footer').outerHeight();
	  const defaultHeight = (WIN.width() <= 1200) ? 250 : 363;
	  const endWrapHeight = windowHeight - (disclaimerInfoHeight + disclaimerTitleHeight + disclaimerFooterHeight);
	  const disclaimerWrap = $('.js-disclaimer-wrap');
	  const disclaimerWrapHeight = (endWrapHeight > defaultHeight) ? defaultHeight : endWrapHeight;
	  if (!disclaimer.length) return;
	  disclaimerWrap.css('height', disclaimerWrapHeight);

	  const trigger = '.js-disclaimer-trigger';
	  BODY.on('click', trigger, function() {
	    new TimelineMax()
	      .to(disclaimer, 0.3, {
	        alpha: 0,
	        ease: Power1.easeInOut
	      })
	      .eventCallback( 'onComplete', () => {
	        setCookie('disclaimer', 'yes', {
	        	expires: 3600*8760
	        });
	        disclaimer.remove();
	        TopicAnim.play();
	      });
	  });
  }
};

DOC.ready(initDisclaimer);
