import { useNavigate } from 'react-router-dom';
import usePersistedData from '../../hooks/usePersistedData';
import { Skeleton } from '@mui/material';
import './ArtworkCard.scss';

const ArtworkCard = ({artworkData}) => {
  const [isImageloaded, setIsImageLoaded] = usePersistedData(`artwork_${artworkData.objectID}_image`, false);
  const navigate = useNavigate();

  return (
    <div className="artwork-card" onClick={() => navigate(`/artworks/${artworkData.objectID}`)}>
      <div className="artwork-card__wrapper">
        <div className="artwork-card__showcase">
          {isImageloaded ?
            null
            :
            <Skeleton animation="wave" variant="rectangular" width="100%" height="100%"/>
          }
          <img
            style={{'display': isImageloaded ? 'inline-block' : 'none'}}
            src={artworkData.primaryImage}
            alt={artworkData.title + ' primary image'}
            className="artwork-card__image"
            onLoad={() => setIsImageLoaded(true)}/>
        </div>
        <h3 className="label-cta-text artwork-card__subtitle">{artworkData.title}</h3>
      </div>
    </div>
  );
};

export default ArtworkCard;