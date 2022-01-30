import { useEffect } from 'react/cjs/react.development';
import { useParams } from 'react-router-dom';
import usePersistedData from '../../../hooks/usePersistedData';
import MuseumApi from '../../../service/MuseumApi';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';

const ArtworkPage = () => {
  const {artworkId} = useParams();

  const [artwork, setArtwork] = usePersistedData(`artwork_${artworkId}`);

  const MuseumServiceApi = new MuseumApi();

  useEffect(() => {
    MuseumServiceApi.getArtwork(artworkId).then(result => setArtwork(result));
  }, []);

  return artwork ? <ArtworkView artworkInfo={artwork}/> : null;
};

const ArtworkView = ({artworkInfo}) => {
  return (
    <ErrorBoundary>
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