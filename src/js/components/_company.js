import {ACTIVE, FIXED, widthLG, widthMD, WIN} from '../_constants';
import {GET_WINDOW_WIDTH} from '../_utils';

export default {

  show() {
    const title = $('.js-company-title [data-stagger="inner"]');
    const diagramm = $('.js-company-diagramm');
    const content = $('.js-company-content');
    const diagrammHeaders = $('[data-diagramm-head]');

    if (!title.length) return;
    new TimelineMax()
      .addLabel('start', 0.15)
      .staggerTo(title, 0.6, {
        opacity: 1,
        y: 0,
        ease: Power1.easeInOut
      }, 0.15)
      .to([diagramm, content], 0.6, {
        opacity: 1
      }, 'start')
      .add(() => {
        diagrammHeaders.addClass(ACTIVE);
      }, 'start', '+=0.5');
  },

  initSlider() {
    $('.js-company').each((i, container) => {
      container = $(container);
      const slider = container.find('.js-company-slider');
      const sliderInited = slider.hasClass('slick-initialized');
      const dots = container.find('.js-company-dots');
      const bullets = container.find('.js-company-bullet');
      const diagramm = container.find('.js-company-diagramm');

      if (GET_WINDOW_WIDTH(widthMD) && !sliderInited) {
        slider.on('init', () => {
          const next = 0;
          const step = 360/3;
          const angle = step*next;
          diagramm
            .find('svg')
            .css('transform', `translate3d(0,0,0) rotate(${-angle}deg)`);
          bullets
            .removeClass(ACTIVE)
            .eq(next)
            .addClass(ACTIVE);
          const slide = slider.find(`[data-id="${next+1}"]`);
          const items = slide.find('[data-anim-from="bottom"]');
          slide.length && !slide.get(0).wasAnimatied && items.length && new TimelineMax()
            .staggerTo(items, 0.75, {
              opacity: 1,
              y: 0,
              ease: Expo.easeOut
            }, '0.2');

          if (slide.length) slide.get(0).wasAnimatied = true;
        });
        slider
          .slick({
            infinite: false,
            arrows: false,
            // fade: true,
            adaptiveHeight: true,
            centerMode: true,
            centerPadding: '60px'
          })
          .on('beforeChange', (e, slick, prev, next) => {
            const step = 360/3;
            const angle = step*next;
            diagramm
              .find('svg')
              .css('transform', `translate3d(0,0,0) rotate(${-angle}deg)`);
            bullets
              .removeClass(ACTIVE)
              .eq(next)
              .addClass(ACTIVE);
          })
          .on('afterChange', (e, slick, id) => {
            const slide = slider.find(`[data-id="${id+1}"]`);
            const items = slide.find('[data-anim-from="bottom"]');
            slide.length && !slide.get(0).wasAnimatied && items.length && new TimelineMax()
              .staggerTo(items, 0.75, {
                opacity: 1,
                y: 0,
                ease: Expo.easeOut
              }, '0.2');

            if (slide.length) slide.get(0).wasAnimatied = true;
          });

        bullets.on('click', e => {
          e.preventDefault();
          slider.slick('slickGoTo', $(e.currentTarget).index());
        });
      } else if (!GET_WINDOW_WIDTH(widthMD) && sliderInited) {
        slider.slick('unslick');
      }
    });
  },

  init() {
    const setDiagramRotate = (slide, diagramm) => {
      const id = slide.data('id');
      const winTop = WIN.scrollTop();
      const slideTop = slide.offset().top;
      const slideHeight = slide.outerHeight();

      if (id === 0 && winTop > slideTop + slideHeight/2) diagramm.addClass(ACTIVE);
      if (id === 0 && winTop < slideTop + slideHeight/2) diagramm.removeClass(ACTIVE);


      if (id >= 1 && winTop > slideTop - slideHeight/2 && winTop <= slideTop + slideHeight/2 && !GET_WINDOW_WIDTH(widthMD)) {
        const step = 360/3;
        const angle = step*(id-1);
        diagramm
          .find('svg')
          .css('transform', `translate3d(0,0,0) rotate(${-angle}deg)`);

        const items = slide.find('[data-anim-from="bottom"]');
        !slide.get(0).wasAnimatied && items.length && new TimelineMax()
          .staggerTo(items, 0.75, {
            opacity: 1,
            y: 0,
            ease: Expo.easeOut
          }, '0.2');
        if (!slide.get(0).wasAnimatied) slide.get(0).wasAnimatied = true;
      }
    };

    WIN.on('scroll resize', () => {
      const winTop = WIN.scrollTop();
      const winBottom = winTop + WIN.outerHeight();

      $('.js-company').each((i, container) => {
        container = $(container);
        const slider = container.find('.js-company-slider');
        const slides = container.find('.js-company-slide');
        const diagramm = container.find('.js-company-diagramm');
        const dots = container.find('.js-company-dots');
        const bullets = container.find('.js-company-bullet');

        const containerTop = container.offset().top;
        const containerHeight = container.outerHeight();
        const containerBottom = containerTop + containerHeight;

        if (winTop >= containerTop && winBottom < containerBottom) {
          diagramm
            .css('top', 0)
            .addClass(FIXED);

          slides.each((i, slide) => setDiagramRotate($(slide), diagramm));
        } else {
          diagramm.removeClass(FIXED);
          winBottom > containerBottom && diagramm.css('top', containerHeight - diagramm.outerHeight());
        }
      });
    });

    WIN.on('resize load', () => this.initSlider());
  }

};
