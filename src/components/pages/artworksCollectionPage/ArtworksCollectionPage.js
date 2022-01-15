import { useEffect, useState } from 'react/cjs/react.development';
import { useLocation } from 'react-router-dom';
import MuseumApi from '../../../service/MuseumApi';

// After first render get all artworks ids
// Set it to artworksIDs state
// After rerender get objects for artworks by offset
// Render artworks elements
// After click on add button, change offset and rerender component with new values
// If arr of id's.length - offset > 20 range of newly loaded items is offset till offset + 2
// Else range of newly loaded items is offset till arr of id's.length

const ArtworksCollectionPage = () => {
  const [artworksIds, setAtrworksIds] = useState(null);
  const [offset, setOffset] = useState(0);
  const [displayedArtworks, setDisplayedArtworks] = useState([]);
  
  const searchParams = useLocation().search;
  const MuseumServiceApi = new MuseumApi();

  const getArtworksInfo = async () => {
    if (artworksIds.length - offset > 20) {
      return await Promise.all(artworksIds
        .slice(offset, offset + 20)
        .map(async artworkId => await MuseumServiceApi.getArtwork(artworkId))
      );
    } else {
      return await Promise.all(artworksIds
        .slice(offset, artworksIds.length)
        .map(async artworkId => await MuseumServiceApi.getArtwork(artworkId))
      );
    }
  };

  useEffect(() => {
    MuseumServiceApi.getArtworksWithFilters(searchParams)
      .then(result => setAtrworksIds(result));
  }, []);

  useEffect(() => {
    if (artworksIds) {
      getArtworksInfo()
        .then(result => setDisplayedArtworks(currentDisplayedArtworks => [...currentDisplayedArtworks, ...result]));
    }
  }, [offset, artworksIds]);

  const artworkElements = displayedArtworks.length > 0 ?
    displayedArtworks.map(artwork => {
      return <div key={artwork.objectID} className="artwork">{artwork.title}</div>;
    })
    : null;

  return (
    <>
      <h1>ArtworksCollectionPage</h1>
      {artworkElements}
      <button className="add" onClick={() => setOffset(currentOffset => currentOffset + 20)}>Load More</button>
    </>
  );
};

export default ArtworksCollectionPage;