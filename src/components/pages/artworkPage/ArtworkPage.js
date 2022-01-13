import { useEffect, useState } from 'react/cjs/react.development';
import { useParams } from 'react-router-dom';
import MuseumApi from '../../../service/MuseumApi';

const ArtworkPage = () => {
  const [artwork, setArtwork] = useState({});

  const {artworkId} = useParams();
  const MuseumServiceApi = new MuseumApi();

  useEffect(() => {
    MuseumServiceApi.getArtwork(artworkId).then(result => setArtwork(result));
  }, []);

  return (
    <>
      <h2 className="artwork__subtitle">{artwork.title}</h2>
      <div className="artwork__showcase">
        <img
          src={artwork.primaryImage}
          alt={artwork.title + ' primary image'}
          className="artwork__showcase-image" />
      </div>
      <div className="artwork__author">
        Author: {artwork.artistDisplayName.length > 0 ? artwork.artistDisplayName : 'Unknown'}
      </div>
      <div className="artwork__date">Release year: {artwork.objectEndDate}</div>
      <div className="artwork__culture">Culture: {artwork.culture}</div>
    </>
  );
};

export default ArtworkPage;