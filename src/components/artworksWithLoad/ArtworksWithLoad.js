import { useReducer } from 'react';
import ArtworksList from '../artworksList/ArtworksList';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import './ArtworksWithLoad.scss';

const ArtworksWithLoad = ({changeOffset, dataIds, noFutureArtworksToLoad}) => {
  const [btnState, setBtnState] = useReducer(
    (currentState, newState) => ({...currentState, ...newState}),
    {isShown: false, isDisabled: true}
  );
  return (
    <ErrorBoundary>
      <div className="artworks" onLoad={() => setBtnState({isShown: true, isDisabled: false})}>
        <div className="artworks__list">
          <ArtworksList artworksIds={dataIds}/>
        </div>
        {
          noFutureArtworksToLoad ?
            null
            :
            <button
              style={{'visibility': btnState.isShown ? 'visible' : 'hidden'}}
              className="artworks__load-btn"
              disabled={btnState.isDisabled ? true : false}
              onClick={() => {
                setBtnState({isDisabled: true});
                changeOffset(20);
              }}>
              Load More
            </button>
        }
      </div>
    </ErrorBoundary>
  );
};

export default ArtworksWithLoad;