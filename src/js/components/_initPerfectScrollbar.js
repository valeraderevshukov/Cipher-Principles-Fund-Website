import PerfectScrollbar from 'perfect-scrollbar';
import { DOC} from '../_constants';

DOC.ready(() => {
  const container = document.querySelector('.js-scroll-wrap');
  if (container) new PerfectScrollbar(container);
});
