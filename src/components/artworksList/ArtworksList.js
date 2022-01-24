import { useEffect, useState } from 'react';
import MuseumApi from '../../service/MuseumApi';
import ArtworkCard from '../artworkCard/ArtworkCard';
import fallbackThumbnail from './no-image.png';
import './ArtworksList.scss';

const ArtworksList = ({artworksIds}) => {
  const [artworks, setAtrworks] = useState(null);

  const MuseumServiceApi = new MuseumApi();
  
  useEffect(() => {
    const artworksPoromises = artworksIds.map(async artworkId => {
      return await MuseumServiceApi.getArtwork(artworkId)
        .then(artwork => {
          if (artwork.primaryImage.length === 0) {
            artwork.primaryImage = fallbackThumbnail;
          }
          return artwork;
        })
        .then(artwork => <ArtworkCard key={artwork.objectID} artworkData={artwork}/>);
    });

    Promise.all(artworksPoromises)
      .then(result => setAtrworks(currentArtworks =>
        currentArtworks ? [...currentArtworks, ...result] : result)
      );
  }, [artworksIds]);

  return (
    <div className="artworks">
      <div className="artworks__list">
        {artworks}
      </div>
    </div>
  );
};

export default ArtworksList;