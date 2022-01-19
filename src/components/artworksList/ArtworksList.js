import { useEffect, useState } from 'react';
import MuseumApi from '../../service/MuseumApi';
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

  const artworkListItems = artworks?.map(artwork => {
    return (
      <div key={artwork.objectID} className="artwork-list__item">
        <h3 className="artwork-list__item-title">{artwork.title}</h3>
        {/* <div className="artwork-list__item-showcase">
          <img
            src={artwork.primaryImage}
            alt={artwork.title + ' primary image'}
            className="artwork-list__item-image" />
        </div> */}
      </div>
    );
  });

  return (
    <div className="artworks">
      <div className="artworks__list">
        {artworkListItems}
      </div>
    </div>
  );
};

export default ArtworksList;