import { TweenLite } from 'gsap';
import Barba from 'barba.js';
import { DOC, BODY, FIXED } from '../_constants';
import stickySidebar from './_sticky-sidebar';
import sections from './_sections';
import Preloader from './_preloader';
import initSplitRws from './_splitTextIntoRows';

DOC.ready(() => {
  const pageContact = 'contact';
  const topic = '.js-topic';
  const preloader = new Preloader({ counterDuration: 0.6 });
  Barba.Pjax.start();

  Barba.Dispatcher.on('transitionCompleted', (currentStatus) => {
    if (BODY.find(topic).length) BODY.addClass(FIXED);
    if (currentStatus.namespace === pageContact) window.initMap();
    stickySidebar.init();
    preloader.init();
    initSplitRws();
  } );

  stickySidebar.init();
  sections.init();
  preloader.init();
  // setTimeout(sections.show, 5000);
  initSplitRws();
  
});
