import { useRef } from 'react';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import './DataList.scss';

const DataList = ({
  offset,
  offsetStep,
  loadingState,
  loadMoreData,
  data,
  noFutureDataToLoad,
}) => {
  
  const buttonRef = useRef();
  
  return (
    <ErrorBoundary>
      <div className="data__wrapper">
        {
          data.length > 0 ?
            <div className="data__list">{data}</div>
            :
            'Nothing was found'
        }
        {
          noFutureDataToLoad ?
            null
            :
            <button
              ref={buttonRef}
              disabled={loadingState ? true : false}
              className={`data__load-btn btn ${!data ? 'btn_hidden' : ''}`}
              onClick={() => {
                loadMoreData({isLoading: true, offset: offset + offsetStep});
              }}>
              Load More
            </button>
        }
      </div>
    </ErrorBoundary>
  );;
};

export default DataList;
