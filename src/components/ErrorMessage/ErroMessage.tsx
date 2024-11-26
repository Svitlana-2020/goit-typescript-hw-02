import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const ErrorMessage: React.FC = () => {

    iziToast.error({
        title: 'Error',
        message: 'Whoops, something went wrong! Please try reloading this page!',
    })

return null;
}

export default ErrorMessage