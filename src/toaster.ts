interface IOptions {
  toastData?: string;
  prependTo?: any;
  timeout?: number;
  position?: string;
  animate?: string | boolean;
  selfClose?: boolean
}

const toaster = {
  success: (options: IOptions) => {
    (typeof options === 'undefined') ? new initToast(({} as IOptions), 'success') : new initToast(options, 'success');
  },
  info: (options: IOptions) => {
    (typeof options === 'undefined') ? new initToast(({} as IOptions), 'info') : new initToast(options, 'info');
  },
  error: (options: IOptions) => {
    (typeof options === 'undefined') ? new initToast(({} as IOptions), 'error') : new initToast(options, 'error');
  },
  warning: (options?: IOptions) => {
    (typeof options === 'undefined') ? new initToast(({} as IOptions), 'warning') : new initToast(options, 'warning');
  }
}

class initToast {

  constructor(userOptions: IOptions, toastType: any) {
    this.bootToast(userOptions, toastType);
  }

  bootToast(userOptions: IOptions, toastType: any) {
    const defaultOptions = {
      toastData: userOptions.toastData || 'Hello Sunny',
      prependTo: userOptions.prependTo || document.body.childNodes[0],
      timeout: userOptions.timeout || 4000,
      position: userOptions.position || 'top right',
      animate: (userOptions.animate) ? 'toast-exit' : false,
      selfClose: userOptions.selfClose || false
    };

    let toastContainer: any = document.querySelector('.toast-container') as any;

    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
    }

    let newToaster = document.createElement('toaster') as any;
    newToaster.setAttribute('data-toast', toastType);
    newToaster.innerHTML = defaultOptions.toastData;

    if (defaultOptions.selfClose) {

      newToaster.innerHTML += '<button type="button" class="close">&#10006;</button>';
      newToaster.querySelector('.close').addEventListener('click', () => {
        //newToaster.remove();
        newToaster.parentNode.removeChild(newToaster);
      });

    }

    if (toastContainer) {

      switch (defaultOptions.position) {

        case 'top-right':
          toastContainer.style.top = '10px';
          toastContainer.style.right = '10px';
          break;

        case 'top-left':
          toastContainer.style.top = '10px';
          toastContainer.style.left = '10px';
          break;

        case 'bottom-left':
          toastContainer.style.bottom = '10px';
          toastContainer.style.left = '10px';
          break;

        case 'bottom-right':
          toastContainer.style.bottom = '10px';
          toastContainer.style.right = '10px';
          break;

        default:
          toastContainer.style.top = '10px';
          toastContainer.style.right = '10px';

      }

      document.body.insertBefore(toastContainer, defaultOptions.prependTo);

    }

    toastContainer.insertBefore(newToaster, toastContainer.childNodes[0]);

    // This timeout is used for the duration that the
    // toast will stay on the page
    setTimeout(() => {

      // Animation is set to perform
      if (defaultOptions.animate && !defaultOptions.selfClose) {
        newToaster.classList.add(defaultOptions.animate);
        newToaster.addEventListener('animationend', () => {
          this.dispatchToast(newToaster, toastContainer);
        });
      } else if (defaultOptions.selfClose) {
        return false;
      } else {
        this.dispatchToast(newToaster, toastContainer);
      }

    }, defaultOptions.timeout);
  }

  private dispatchToast(newToaster: any, toastContainer: HTMLElement): void {
    //newToaster.remove();
    newToaster.parentNode.removeChild(newToaster);
    const numToasts = (document.querySelector('.toast-container') as HTMLElement).childNodes.length;
    if (!numToasts) {
      toastContainer.remove();
    }
  }

}

(window as any).toaster = toaster;
