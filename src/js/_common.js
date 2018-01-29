import { TOUCH } from './_utils';
import { BODY } from './_constants';

import svg4everybody from 'svg4everybody';

svg4everybody();
if ( !TOUCH() ) BODY.addClass('no-touch');
