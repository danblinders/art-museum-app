import { useEffect, useState } from 'react';
import MuseumApi from '../../service/MuseumApi';
import './ArtworksList.scss';

const ArtworksList = ({artworksIds}) => {
  const [artworks, setAtrworks] = useState([]);
  const MuseumServiceApi = new MuseumApi();

  useEffect(() => {
    const artworksPoromises = artworksIds.map(async artworkId => {
      return await MuseumServiceApi.getArtwork(artworkId);
    });

    Promise.all(artworksPoromises).then(result => setAtrworks(currentArtworks => [...currentArtworks, ...result]));
  }, [artworksIds]);

  console.log(artworks);

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
    <div className="artwork-list">
      {artworkListItems}
    </div>
  );
};

export default ArtworksList;