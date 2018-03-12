import StickySidebar from 'sticky-sidebar';
import {WIN, ACTIVE, BODY} from './../_constants';
import {SCROLL_TO} from './../_utils';
import EVENT from './../communication/_events';
import OBSERVER from './../communication/_observer';

const links = $('.js-sticky-sidebar [data-href]');
const headerLinks = $('.header:not(.header_anim) [data-nav-href]');
const headerAnimLinks = $('.header_anim [data-nav-href]');
const blockItem = $('[data-section]');

const linkPosition = (link, line) => {
  const linkPosition = link.position().top;
  const linkHeight = link.outerHeight()/2;
  const lineHeight = line.outerHeight()/2;

  line.css('transform', `translate3d(0,${linkPosition + linkHeight - lineHeight}px,0)`);
};

function onScroll(event) {
  const sidebar = $('.js-sticky-sidebar');
  if (!sidebar) return;
  let scrollPos = WIN.scrollTop();
  const line = sidebar.find('[data-line]');
  const allLinks = $('[data-href], [data-nav-href]');
  const headerInner = $('.js-header-inner');
  const topPadding = headerInner.outerHeight() + headerInner.position().top;
  BODY.find('[data-section]').each(function(i, block) {
    const that = $(this);
    const id = that.data('section');
    const currentLink = $('[data-href="'+id+'"], .header:not(.header_anim) [data-nav-href="'+id+'"]');
    const currentSidebarLink = $('[data-href="'+id+'"]');

    if (!currentSidebarLink.length) return;
    const topPos = that.offset().top - (topPadding + 5);
    const bottomPos = topPos + that.outerHeight();
    const currentPosition = currentSidebarLink.position().top;
    const currentLinkHeight = currentSidebarLink.outerHeight()/2;
    const lineHeight = line.outerHeight()/2;

    if ( topPos <= scrollPos && bottomPos > scrollPos) {
      allLinks.removeClass(ACTIVE);
      currentLink.addClass(ACTIVE);
      linkPosition(currentSidebarLink, line);
    }
  });
};

WIN.on('scroll', onScroll);

const scrollToSection = (link, attr, obsEvent) => {
  link = $(link);
  const id = link.data(attr);
  const section = $(`[data-section="${id}"]`);
  const headerInner = $('.js-header-inner');
  const topPadding = headerInner.outerHeight() + headerInner.position().top;
  if (!obsEvent) {
    const top = section.offset().top - topPadding;
    SCROLL_TO(top);
  }
  else {
    const topicAnimTrigger = $('.js-start-anim-trigger');
    topicAnimTrigger.trigger('click');
    OBSERVER.SUB(EVENT.TOPIC_ANIM_COMPLATE, () => {
      const top = section.offset().top - topPadding;
      SCROLL_TO(top);
    } );
  }
};

BODY.on('click', '.js-sticky-sidebar [data-href]', function(e) {
  e.preventDefault();
  scrollToSection(this, 'href');
});

BODY.on('click', '.header:not(.header_anim) [data-nav-href]', function(e) {
  e.preventDefault();
  scrollToSection(this, 'nav-href');
});

BODY.on('click', '.header_anim [data-nav-href]', function(e) {
  e.preventDefault();
  scrollToSection(this, 'nav-href', true);
});

const hoverOnLinks = () => {
  const sidebar = $('.js-sticky-sidebar');
  const line = sidebar.find('[data-line]');
  const links = sidebar.find('[data-href]');

  links
    .mouseenter(e => {
      linkPosition($(e.currentTarget), line);
    }).mouseleave(e => {
      const active = links.hasClass(ACTIVE) ? links.filter(`.${ACTIVE}`) : links.first();
      linkPosition(active, line);
    });
};

export default {

  toggleLine(state) {
    $('.js-sticky-sidebar')
      .find('[data-line]')
      .attr('data-state', state);
  },
  detectOnScroll() {
    WIN.stickyActivated = true;
  },
  init() {
    const sticky = $('.js-sticky-sidebar').get(0);
    if (!sticky) return;
  
    new StickySidebar('.js-sticky-sidebar', {
      topSpacing: 197,
      // bottomSpacing: 20,
      containerSelector: '.js-sticky-wrapper'
    });
    
    sticky.addEventListener('affix.top.stickySidebar', () => this.toggleLine(true));
    sticky.addEventListener('affix.static.stickySidebar', () => this.toggleLine(false));

    hoverOnLinks();
  
    this.toggleLine(WIN.scrollTop() >= $('[data-section]').first().offset().top);

    if (WIN.stickyActivated) return;
    this.detectOnScroll();
  }
};
