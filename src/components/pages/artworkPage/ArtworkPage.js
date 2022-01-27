import { useEffect, useState } from 'react/cjs/react.development';
import { useParams, useNavigate } from 'react-router-dom';
import MuseumApi from '../../../service/MuseumApi';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';

const ArtworkPage = () => {
  const [artwork, setArtwork] = useState(null);

  const {artworkId} = useParams();
  const MuseumServiceApi = new MuseumApi();

  useEffect(() => {
    MuseumServiceApi.getArtwork(artworkId).then(result => setArtwork(result));
  }, []);

  return artwork ? <ArtworkView artworkInfo={artwork}/> : null;
};

const ArtworkView = ({artworkInfo}) => {
  const navigate = useNavigate();
  return (
    <ErrorBoundary>
      <button className="artwork__back-btn" onClick={() => navigate(-1)}>Go Back</button>
      <h2 className="artwork__subtitle">{artworkInfo.title}</h2>
      <div className="artwork__showcase">
        <img
          src={artworkInfo.primaryImage}
          alt={artworkInfo.title + ' primary image'}
          className="artwork__showcase-image" />
      </div>
      <div className="artwork__author">
        Author: {artworkInfo.artistDisplayName.length > 0 ? artworkInfo.artistDisplayName : 'Unknown'}
      </div>
      <div className="artwork__date">Release year: {artworkInfo.objectEndDate}</div>
      <div className="artwork__culture">Culture: {artworkInfo.culture}</div>
    </ErrorBoundary>
  );
};

export default ArtworkPage;