import ArtworksList from '../artworksList/ArtworksList';
import './ArtworksWithLoad.scss';

const ArtworksWithLoad = ({changeOffset, dataIds}) => {
  return (
    <>
      <div className="artworks">
        <div className="artworks__list">
          <ArtworksList artworksIds={dataIds}/>
        </div>
        <button
          className="artworks__load-btn"
          onClick={() => changeOffset(currentOffset => currentOffset + 20)}>
          Load More
        </button>
      </div>
    </>
  );
};

export default ArtworksWithLoad;