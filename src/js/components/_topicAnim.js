import { WIN, FIXED } from '../_constants';

export default {
  animTo(container, duration, delay) {
    if (!container) return;
    return (
      new TimelineMax()
        .to(container, duration || 0.6, {
          opacity: 1,
          y: 0,
          x: 0,
          ease: Power1.easeInOut
        }, delay || 0)
    );
    
  },
  title() {
    const rows = $('.js-topic [data-stagger="inner"]');
    const topicAnimHeight = $('.js-topic [data-anim-height]');
    let topicHeight = (WIN.width() <= 767) 
      ? topicAnimHeight.data('anim-height-mob') 
      : topicAnimHeight.data('anim-height');
    const tm = new TimelineMax({pause: true});
    const stagger = new TimelineMax({pause: true}).staggerTo(rows, 0.6, {
      opacity: 1,
      y: 0,
      ease: Power1.easeInOut
    }, 0.15).play();
    let addedHeight = false;
    if (!rows) return;
    if (topicAnimHeight.length) {
      tm
        .to(topicAnimHeight, 0.5, {
          height: topicHeight+'px',
          ease: Power1.easeInOut
        }, 0)
        .call( () => {
          topicAnimHeight.addClass(FIXED);
        }, null, null, 1 )
        .add( stagger.play(), 0.45 )
        .eventCallback( 'onComplete', () => { addedHeight = true; });
        
      WIN.on('resize', () => {
        if (addedHeight) {
          topicHeight = (WIN.width() <= 767) 
            ? topicAnimHeight.data('anim-height-mob') 
            : topicAnimHeight.data('anim-height');
          topicAnimHeight.css('height', topicHeight);
        }
      });
    }
    else {
      stagger.play();
    }
  },

  play() {
    const headerInner = $('.js-header-inner');
    const topicleft = $('.js-topic-left');
    const topicFooter = $('.js-topic-footer');
    const topicBg = $('.js-topic-bg');
    const tooltip = $('.js-topic .js-tooltip');

    let that = this;
    let reverseAnim = false;
    new TimelineMax()
      .add( this.title, 0 )
      .add( this.animTo(headerInner), 0.6 )
      .add( this.animTo(topicleft), 0.6 )
      .add( this.animTo(topicBg, 0.9), 1.1 )
      .add( this.animTo(topicFooter, 1), 2 )
      .add( this.animTo(tooltip, 0.35), 2.8 );
  }
};
