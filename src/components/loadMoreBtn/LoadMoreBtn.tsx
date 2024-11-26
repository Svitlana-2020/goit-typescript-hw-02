import css from './LoadMoreBtn.module.css'
import {LoadMoreBtnProps} from '../../App.types'

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({onClick}) => {

    return (
    <div>
        <button className={css.btn} type="button" onClick = {onClick}>Load More</button>
    </div>)
    
}

export default LoadMoreBtn