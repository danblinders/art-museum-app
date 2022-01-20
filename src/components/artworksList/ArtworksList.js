import { useEffect, useState } from 'react';
import MuseumApi from '../../service/MuseumApi';
import ArtworkCard from '../artworkCard/ArtworkCard';
import './ArtworksList.scss';

const ArtworksList = ({artworksIds}) => {
  const [artworks, setAtrworks] = useState(null);

  const MuseumServiceApi = new MuseumApi();

  useEffect(() => {
    const artworksPoromises = artworksIds.map(async artworkId => {
      return await MuseumServiceApi.getArtwork(artworkId);
    });

    Promise.all(artworksPoromises)
      .then(result => setAtrworks(currentArtworks =>
        currentArtworks ? [...currentArtworks, ...result] : result)
      );
  }, [artworksIds]);

  const artworkListCards = artworks?.map(artwork => {
    return <ArtworkCard key={artwork.objectID} artworkData={artwork}/>;
  });

  return (
    <div className="artworks">
      <div className="artworks__list">
        {artworkListCards}
      </div>
    </div>
  );
};

export default ArtworksList;