import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';

const Msg = ({ value = 'Internal Server Error!' }) => {
  // const options: ToastOptions = {
  //   position: 'top-right',
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  // };
  return (
    <div>
      { toast.success(value)}
    </div>
  );
};

export default Msg;
