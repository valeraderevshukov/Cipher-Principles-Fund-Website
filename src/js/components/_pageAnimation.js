import { WIN, BODY, FIXED, HTMLBODY } from './../_constants';
import sections from './_sections';
import stickySidebar from './_sticky-sidebar';
import { SCROLL_WIDTH } from './_scrollWidth';
import { SCROLL_TO, TOUCH } from './../_utils';
import EVENT from './../communication/_events';
import OBSERVER from './../communication/_observer';

const startTrigger = '.js-start-anim-trigger';
window.scrollFlug = true;
export const startAnimPage = (props) => {
  const page = $('.js-anim-page');
  const topicWrap = $('.js-topic-wrap');
  const clearTransform = 'is-clear-transform';
  const headerAnim = $('.js-header.header_anim');
  const topicWrapAnim = () => {
    if (!props.animTitle) return;
    return (
      new TimelineMax({pause: true}).to(topicWrap, 0.5, {
        y: -250,
        alpha: 0,
        ease: Power1.easeInOut
      }, 0)
    );
  };
  new TimelineMax()
    .to(page, 0.5, {
      y: 0,
      ease: Power1.easeInOut,
      clearProps:'all'
    }, 0)
    .add( topicWrapAnim, 0 )
    .eventCallback( 'onComplete', () => {
      window.scrollFlug = false;
      window.scrollUpFlug = true;
      page.addClass(clearTransform);
      BODY.removeClass(FIXED);
      BODY.css({ paddingRight: 0});
      // sections.show();
      // WIN.trigger('scroll');
      // stickySidebar.init();
      headerAnim.css({ right: 0});
      OBSERVER.ON_FIRE(EVENT.TOPIC_ANIM_COMPLATE);
    });
};

export const finishAnimPage = () => {
  const page = $('.js-anim-page');
  const topicWrap = $('.js-topic-wrap');
  const clearTransform = 'is-clear-transform';
  const headerAnim = $('.js-header.header_anim');
  const duration = (WIN.scrollTop() === 0) ? 0 : 600;
  const scrollWidth = SCROLL_WIDTH();
  HTMLBODY.animate({
    scrollTop: 0
  }, duration, () => {
    new TimelineMax()
      .to(page, 0.5, {
        transform: 'translateY(100vh)',
        ease: Power1.easeInOut
      }, 0)
      .to(topicWrap, 0.5, {
        y: 0,
        alpha: 1,
        ease: Power1.easeInOut
      }, 0)
      .eventCallback( 'onComplete', () => {
        window.scrollFlug = true;
        window.scrollUpFlug = false;
        if (scrollWidth > 0) {
          BODY.css({ paddingRight: scrollWidth });
          headerAnim.css({ right: scrollWidth });
        }
        page.removeClass(clearTransform);
        BODY.addClass(FIXED);
      });
  });
  return false;
};

BODY.on('click', startTrigger, startAnimPage);

const pageBack = '.js-page-back';
BODY.on('click', pageBack, finishAnimPage);

const shownHeader = () => {
  const container = BODY.find('[data-scroll-page="inner"]');
  const scrollPos = WIN.scrollTop();
  const headerShow = 'is-show-inner-header';
  $(container).each(function() {
    const that = $(this);
    const topPos = that.offset().top;
    const bottomPos = topPos + that.outerHeight();
    ( topPos <= scrollPos && bottomPos > scrollPos )
      ? BODY.addClass(headerShow)
      : BODY.removeClass(headerShow);
  });
};

WIN.on('scroll', shownHeader);

window.scrollUpFlug = false;
const animationToSwipeDown = () => {
  let yDown;
  let yUp;
  const topic = $('.js-topic');
  // let timeout;
  BODY.on('mousewheel', function(event) {
    const iCurScrollPos = $(window).scrollTop();
    if (event.originalEvent.wheelDelta <= 0 && window.scrollFlug) {
      window.scrollFlug = false;
      $(startTrigger).trigger('click');
    } 
    else if (iCurScrollPos === 0 && event.originalEvent.wheelDelta >= 0 && window.scrollUpFlug && $('[data-namespace="home"]').length) {
      window.scrollUpFlug = false;
      $(pageBack).trigger('click');
      // clearTimeout(timeout);
      // timeout = setTimeout(() => {
        
      // }, 100);
    }
  });
  if (!TOUCH()) return;
  let touch;
  BODY
    .on('mousedown touchstart touchmove', function(e) {
      if (e.originalEvent.touches) touch = e.originalEvent.touches[0];
      yDown = e.pageY || touch.pageY;
    })
    .on('mouseup touchend touchmove', '.js-topic', function(e) {
      if (e.originalEvent.touches) touch = e.originalEvent.touches[0];
      yUp = e.pageY || touch.pageY;
      if (yDown >= yUp && window.scrollFlug) $(startTrigger).trigger('click');
    });
};
animationToSwipeDown();
