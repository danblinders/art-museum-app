import { useNavigate } from 'react-router-dom';
import './ArtworkCard.scss';

const ArtworkCard = ({artworkData}) => {
  const navigate = useNavigate();

  return (
    <div className="artwork-card" onClick={() => navigate(`/artworks/${artworkData.objectID}`)}>
      <div className="artwork-card__wrapper">
        <h3 className="artwork-card__title">{artworkData.title}</h3>
        <div className="artwork-card__showcase">
          <img
            src={artworkData.primaryImage}
            alt={artworkData.title + ' primary image'}
            className="artwork-card__image" />
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;