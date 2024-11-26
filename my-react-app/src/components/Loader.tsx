import { Audio } from 'react-loader-spinner';
import css from './Loader.module.css'

const Loader: React.FC = () => {
    return (<Audio 
        wrapperClass={css.loader}
  height="60"
  width="80"
//   radius="7"
  color="blue"
  ariaLabel="three-dots-loading"
/>)}

export default Loader