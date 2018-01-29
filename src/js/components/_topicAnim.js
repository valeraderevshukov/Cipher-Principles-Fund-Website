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
    if (!rows) return;
    new TimelineMax()
      .staggerTo(rows, 0.6, {
        opacity: 1,
        y: 0,
        ease: Power1.easeInOut
      }, 0.15);
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
