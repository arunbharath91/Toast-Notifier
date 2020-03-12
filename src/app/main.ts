import '../style.scss';

import { toaster } from './toaster';

(document.querySelector('.btn') as HTMLElement).addEventListener('click', () => {
  toaster.success();
});
