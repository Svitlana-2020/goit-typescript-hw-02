import css from '../ImageCard/ImageCard.module.css'
import {ImageCardProps} from '../../App.types'

const ImageCard: React.FC<ImageCardProps> = ({id, full, small, alt_description, onImageClick }) => {
    return (
        <li key={id} className={css.listItem}>
              <div className={css.wrapper}>
              <img  onClick={() => onImageClick({urls: { full }, alt_description })}
          src={small}
          alt={alt_description}
          className={css.image}
        />
              </div>
            </li>
    )
}

export default ImageCard