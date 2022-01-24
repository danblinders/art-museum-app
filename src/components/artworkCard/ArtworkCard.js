import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import './ArtworkCard.scss';

const ArtworkCard = ({artworkData}) => {
  const [isImageloaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="artwork-card" onClick={() => navigate(`/artworks/${artworkData.objectID}`)}>
      <div className="artwork-card__wrapper">
        <h3 className="artwork-card__title">{artworkData.title}</h3>
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
      </div>
    </div>
  );
};

export default ArtworkCard;