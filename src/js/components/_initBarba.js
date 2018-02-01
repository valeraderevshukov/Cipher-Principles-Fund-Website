import { TweenLite } from 'gsap';
import Barba from 'barba.js';
import { DOC, BODY, FIXED } from '../_constants';
import stickySidebar from './_sticky-sidebar';
import sections from './_sections';
import Preloader from './_preloader';
import initSplitRws from './_splitTextIntoRows';
import {initDisclaimer} from './_disclaimer';
import company from './_company';

import TopicAnim from './_topicAnim';

import EVENT from './../communication/_events';
import OBSERVER from './../communication/_observer';


DOC.ready(() => {
  const pageContact = 'contact';
  const pageHome = 'home';
  const topic = '.js-topic';
  const preloader = new Preloader({ counterDuration: 0.6 });
  const home = $('[data-namespace="home"]');

  Barba.Pjax.start();

  Barba.Dispatcher.on('transitionCompleted', (currentStatus) => {
    if (currentStatus.namespace === pageContact) window.initMap();
    stickySidebar.init();
    initSplitRws();
    initDisclaimer();
    company.init();
    if (currentStatus.namespace === pageHome) {
      preloader.init();
      BODY.addClass(FIXED);
    }
    else {
      BODY.removeClass(FIXED);
      TopicAnim.play();
    }
  } );

  OBSERVER.SUB(EVENT.TOPIC_ANIM_COMPLATE, () => {
    sections.show();
    sections.parallaxInit();
    stickySidebar.init();
  });

  if (!home.length) TopicAnim.play();
  
  company.init();
  preloader.init();
  initSplitRws();
  
});
