import 'react-toastify/dist/ReactToastify.min.css';

import type { ToastOptions } from 'react-toastify';
import { toast } from 'react-toastify';

const useToasts = () => {
  const options: ToastOptions = {
    position: 'top-right',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  };

  const toastSuccess = (message: string) => {
    toast.success(message, options);
  };

  const toastError = (message: string) => {
    toast.error(message, options);
  };

  const toastInfo = (message: string) => {
    toast.info(message, options);
  };

  const toastWarning = (message: string) => {
    toast.warning(message, options);
  };

  return { toastSuccess, toastError, toastInfo, toastWarning };
};

export default useToasts;
