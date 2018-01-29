import {WIN} from '../_constants';

export default {

  //START SVG ANIMATIONS
  onViewPort(item) {
    return WIN.scrollTop() + WIN.outerHeight() < item.offset().top + item.outerHeight();
  },
  trust(section) {
    if (this.onViewPort(section.find('[data-svg-wrapper]')) || section.animationPlayed) return;
    section.anumationPlayed = true;

    new TimelineMax()
      .to(section.find('[data-svg-icon="shield"]'), 0.6, {
        opacity: 1,
        y: 0
      })
      .to(section.find('[data-svg-icon="check"]'), 0.3, {
        opacity: 1,
        y: 0
      });
  },
  approach(section) {
    if (this.onViewPort(section.find('[data-svg-wrapper]')) || section.animationPlayed) return;
    section.anumationPlayed = true;

    new TimelineMax()
      .to(section.find('[data-svg-icon="target"]'), 0.6, {
        opacity: 1,
        y: 0
      })
      .to(section.find('[data-svg-container]'), 0.2, {
        opacity: 1,
        y: 0,
        x: 0
      })
      .to(section.find('[data-svg-box]'), 0.15, {
        y: '4%'
      }, '-=0.025');
  },
  playAnimations() {
    $('[data-animation-section]').each((i, section) => {
      section = $(section);
      const name = section.data('animation-section');
      typeof this[name] === 'function' && this[name](section);
    });
  },
  //END SVG ANIMATIONS

  //START TEXT ANIMATIONS
  show() {
    // $('[data-animation-section]').each((i, section) => {
    //   section = $(section);
      
    // });
    const items = $('[data-animation-section-item]');
    if (!items) return;
    new TimelineMax()
      .staggerTo(items, 0.75, {
        opacity: 1,
        y: 0,
        ease: Expo.easeOut
      }, '0.2');
  },
  //END TEXT ANIMATIONS

  init() {
    this.playAnimations();
    WIN.on('scroll', () => {this.playAnimations();} );
  }
};
