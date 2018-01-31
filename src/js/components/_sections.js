import {WIN} from '../_constants';
import Rellax from 'rellax';

export default {
  //animation info
  show() {
    $('[data-anim-info]').length && $('[data-anim-info]').each((i, section) => {
      section = $(section);
      const items = $('[data-anim-from="bottom"]');
      items.length && new TimelineMax()
        .staggerTo(items, 0.75, {
          opacity: 1,
          y: 0,
          ease: Expo.easeOut
        }, '0.2');
    });
  },
  //parallax 

  parallaxInit() {
    $('.js-rellax').length && new Rellax('.js-rellax', {
      speed: 0.8,
      center: true
    });
  }
};
