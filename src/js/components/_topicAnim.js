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
    const topicHeight = topicAnimHeight.data('anim-height');
    const tm = new TimelineMax({pause: true});
    const stagger = new TimelineMax({pause: true}).staggerTo(rows, 0.6, {
      opacity: 1,
      y: 0,
      ease: Power1.easeInOut
    }, 0.15).play();
    if (!rows) return;
    if (topicAnimHeight.length) {
      tm
        .to(topicAnimHeight, 0.5, {
          height: topicHeight+'px',
          ease: Power1.easeInOut
        }, 0)
        .add( stagger.play(), 0.25 );
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
    let that = this;
    let reverseAnim = false;
    new TimelineMax()
      .add( this.title, 0 )
      .add( this.animTo(headerInner), 0.6 )
      .add( this.animTo(topicleft), 0.6 )
      .add( this.animTo(topicBg, 0.9), 1.1 )
      .add( this.animTo(topicFooter, 0.8), 2 );
  }
};
